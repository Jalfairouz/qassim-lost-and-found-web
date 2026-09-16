import BrowseReports, { ReportSearchParams } from "@/components/BrowseReports";
export default function Page({
  searchParams,
}: {
  searchParams: ReportSearchParams;
}) {
  return <BrowseReports type="Found" searchParams={searchParams} />;
}
