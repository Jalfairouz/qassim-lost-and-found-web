import LoadingSkeleton from "@/components/LoadingSkeleton";
import PageContainer from "@/components/PageContainer";
export default function Loading() {
  return (
    <PageContainer className="py-12">
      <LoadingSkeleton />
    </PageContainer>
  );
}
