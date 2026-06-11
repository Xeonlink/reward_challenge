"use client";

import { Slot } from "radix-ui";
import type {
  ComponentProps,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
} from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "./ui/Button";

type ModalEntry = {
  key: string;
  element: React.ReactElement;
};

let modals: ModalEntry[] = [];
const listeners = new Set<() => void>();

const modalStore = {
  getSnapshot: () => modals,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  publish: (mutateFn: (modals: ModalEntry[]) => ModalEntry[]) => {
    modals = mutateFn(modals);
    listeners.forEach((listener) => listener());
  },
};

// ------------------------------------------------------------

const ModalContext = createContext<{
  key: string;
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function ModalContextProvider(props: PropsWithChildren<{ modalKey: string }>) {
  const { children, modalKey } = props;
  const [open, setOpen] = useState(true);

  return (
    <ModalContext.Provider value={{ key: modalKey, open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const modalCtx = useContext(ModalContext);

  const close = useCallback((key: string) => {
    modalStore.publish((modals) => modals.filter((modal) => modal.key !== key));
  }, []);

  const createKey = useCallback(() => crypto.randomUUID(), []);

  const openWithKey = useCallback(
    (key: string, element: React.ReactElement) => {
      modalStore.publish((modals) => [...modals, { key, element }]);
      return () => close(key);
    },
    [close],
  );

  const open = useCallback(
    (element: React.ReactElement) => {
      const key = createKey();
      return openWithKey(key, element);
    },
    [createKey, openWithKey],
  );

  const closeSelf = useCallback(() => {
    if (!modalCtx) {
      throw new Error("Context key is not exist");
    }
    close(modalCtx.key);
  }, [modalCtx, close]);

  const startClose = useCallback(() => {
    if (!modalCtx) {
      throw new Error("Context key is not exist");
    }
    modalCtx.setOpen(false);
  }, [modalCtx]);

  return useMemo(
    () => ({
      isOpen: !!modalCtx?.open,
      open,
      createKey,
      openWithKey,
      close,
      closeSelf,
      startClose,
      length: () => modalStore.getSnapshot().length,
    }),
    [modalCtx, open, createKey, openWithKey, close, closeSelf, startClose],
  );
}

export function ModalContainer() {
  const modals = useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getSnapshot,
    modalStore.getSnapshot,
  );

  return (
    <>
      {modals.map(({ key, element }) => (
        <ModalContextProvider key={key} modalKey={key}>
          {element}
        </ModalContextProvider>
      ))}
    </>
  );
}

type ModalTriggerProps = ComponentProps<typeof Button> & {
  asChild?: boolean;
  render: ReactElement;
};

export function ModalTrigger(props: ModalTriggerProps) {
  const { children, render, asChild = false, onClick, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : Button;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    modal.open(render);
  };

  return (
    <Comp onClick={handleClick} {...rest}>
      {children}
    </Comp>
  );
}

type ModalCloserProps = ComponentProps<typeof Button> & {
  asChild?: boolean;
};

export function ModalCloser(props: ModalCloserProps) {
  const { asChild, ...rest } = props;
  const modal = useModal();
  const Comp = asChild ? Slot.Root : "button";

  return <Comp onClick={modal.closeSelf} {...rest} />;
}
