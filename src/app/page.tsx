import { delay } from "es-toolkit";
import { SlotPageClient } from "./SlotPageClient";

export default async function Page(props: PageProps<"/">) {
  const { searchParams } = props;
  const resolvedSearchParams = await searchParams;
  const test = resolvedSearchParams.test;
  const testParam = Array.isArray(test) ? test[0] : test;

  await delay(1000 * 5);

  return <SlotPageClient testParam={testParam} />;
}
