import SectionHeader from "@/components/common/sectionheader";
import SummaryItemsFallback from "@/components/dashboard/summaryfallbackskeleton";
import SummaryItemsServer from "@/components/dashboard/summaryitemsload";
import { LibraryBig } from "lucide-react";
import { Suspense } from "react";

const Dashboard = () => {
  return (
    <div className="px-10 sm:px-15 py-20 ">
      <SectionHeader
        showViewAll={false}
        icon={LibraryBig}
        title="View All Summaries"
        description="View, manage all your summaries here"
      />

      <Suspense fallback={<SummaryItemsFallback/>}>
        <SummaryItemsServer />
      </Suspense>
    </div>
  );
};

export default Dashboard;
