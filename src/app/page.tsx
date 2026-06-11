import { SlotGrid } from "@/components/slots/SlotGrid";

export default async function Page(props: PageProps<"/">) {
  const { searchParams } = props;
  const resolvedSearchParams = await searchParams;
  const test = resolvedSearchParams.test;
  const testParam = Array.isArray(test) ? test[0] : test;

  return <SlotGrid testParam={testParam} />;
}
