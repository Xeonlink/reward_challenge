import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal(props: PropsWithChildren) {
  const { children } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(children, document.getElementById("portal-exit")!);
}
