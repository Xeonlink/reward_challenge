import { SlotPageClient } from "./SlotPageClient";

export default async function Page(props: PageProps<"/">) {
  const { searchParams } = props;
  const resolvedSearchParams = await searchParams;
  const test = resolvedSearchParams.test;
  const testParam = Array.isArray(test) ? test[0] : test;

  return <SlotPageClient testParam={testParam} />;
}
