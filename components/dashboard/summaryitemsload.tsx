import { getPdfSummariesByUserId, getUserDetails } from "@/lib/db_cruds";
import Summaritemslist from "./summaritemslist";

const SummaryItemsServer = async () => {
  const { success, userId } = await getUserDetails();
  if (!success) {
    throw new Error("You need to login first");
  }
  const { success1, error, data } = await getPdfSummariesByUserId(
    userId as string
  );

  if (success1 == false) {
    throw new Error("Unable to fetch summaries data from user table");
  }

  return <Summaritemslist arraydata={data} />;
};

export default SummaryItemsServer;
