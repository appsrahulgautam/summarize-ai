import {
  ArrowLeft,
  Calendar,
  ChartBarIcon,
  Download,
  ExternalLink,
  File,
  Package,
  SparkleIcon,
} from "lucide-react";
import Link from "next/link";
import { getPdfSummaryByIdAndUser } from "@/lib/db_cruds";
import EmptyState from "@/components/common/emptystate";
import ReactMarkdown from "react-markdown";
import { getUserDetails } from "@/lib/user_related_db_cruds";

// Define the params type
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const SummaryDetails = async ({ params }: PageProps) => {
  const resolvedparams = await params;
  const id = resolvedparams.id;

  const { success, userId } = await getUserDetails();
  if (!success) {
    throw new Error("You need to login first");
  }

  const { successPdf, pdfsummary } = await getPdfSummaryByIdAndUser(
    id,
    userId as string
  );

  return (
    <>
      {/* //TODO IF WE FACED ERROR IN FETHCING SUMMARY  */}
      {successPdf == false && (
        <div className="flex flex-col my-10 sm:my-20 mx-6 sm:mx-20 text-[13px] sm:text-sm">
          <Link href={"/dashboard"}>
            {" "}
            <p className="flex flex-row gap-2 text-sm sm:text-lg hover:text-rose-600">
              <ArrowLeft className="hover:text-rose-600" /> Go to Dashboard{" "}
            </p>
          </Link>
          <EmptyState
            message="There is no summary with this id in your account."
            icon={Package}
          />
        </div>
      )}
      {/* //TODO IF THIS SUMMARY DOESNT BELONG TO THIS USER */}
      {successPdf == true && pdfsummary == null && (
        <div className="flex flex-col my-10 sm:my-20 mx-6 sm:mx-20 text-[13px] sm:text-sm">
          <Link href={"/dashboard"}>
            {" "}
            <p className="flex flex-row gap-2 text-sm sm:text-lg hover:text-rose-600">
              <ArrowLeft className="hover:text-rose-600" /> Go to Dashboard{" "}
            </p>
          </Link>
          <EmptyState
            message="This summary is not associated with your account."
            icon={Package}
          />
        </div>
      )}
      {/* //TODO IF THIS SUMMARY  BELONGS TO THIS USER */}
      {successPdf == true && pdfsummary != null && (
        <div className="flex flex-col my-10 sm:my-20 mx-10 sm:mx-20 text-[13px] sm:text-sm">
          <Link href={"/dashboard"}>
            {" "}
            <p className="flex flex-row gap-2 text-lg hover:text-rose-600">
              <ArrowLeft className="hover:text-rose-600" /> Go to Dashboard{" "}
            </p>
          </Link>
          <div className="flex flex-row mt-10">
            <p className="flex flex-row justify-center items-center gap-2">
              <SparkleIcon className="text-rose-500" /> AI Summary{" "}
            </p>
            <p className="flex flex-row  mx-4  justify-center items-center gap-2">
              <Calendar className="text-rose-500" /> AI Summary{" "}
            </p>
            <p className="flex flex-row  mx-4  justify-center items-center gap-2">
              <ChartBarIcon className="text-rose-500" /> 2 min read{" "}
            </p>
          </div>
          <h1 className="flex flex-wrap break-after-auto  mt-4 text-2xl sm:text-3xl ">
            <span className="font-black bg-linear-to-r from-rose-950 via-rose-400 to-slate-950 bg-clip-text text-transparent">
              {pdfsummary.title}
            </span>{" "}
          </h1>
          <p className="flex flex-row  mx-4  justify-center items-center gap-2">
            <File className="text-rose-500" /> {pdfsummary.file_name}{" "}
          </p>
          <div className="flex flex-row justify-center gap-10 mt-4">
            {" "}
            <Link
              href={pdfsummary.original_file_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="flex flex-row  mx-4  justify-center items-center gap-2 text-rose-700">
                <ExternalLink className="text-rose-500" /> View Original{" "}
              </p>
            </Link>
            <a
              download
              href={pdfsummary.original_file_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="flex flex-row  mx-4  justify-center items-center gap-2 text-rose-700">
                <Download className="text-rose-500" /> Download Summary{" "}
              </p>
            </a>
          </div>
          <p
            className="flex flex-row mx-4 leading-relaxed tracking-wide my-10
          text-sm sm:text-lg"
          >
            <div className="flex justify-center p-4 md:p-10 bg-gray-100 w-full">
              <div className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-xl shadow-lg">
                <ReactMarkdown
                  components={{
                    // Style the TITLE (h1) specifically
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-xl font-bold text-gray-800 mb-10 mt-0 leading-tight border-b pb-4"
                        {...props}
                      />
                    ),
                    // Style the SUBHEADERS (h2/h3)
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-lg font-semibold text-gray-700 mt-8 mb-4"
                        {...props}
                      />
                    ),
                    // Style the PARAGRAPHS (p)
                    p: ({ node, ...props }) => (
                      <p
                        className="text-base text-gray-600 mb-6 leading-relaxed"
                        {...props}
                      />
                    ),
                    // Style the LISTS
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc ml-5 mb-6 space-y-2 text-gray-600"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="pl-1" {...props} />
                    ),
                  }}
                >
                  {pdfsummary.summary_text}
                </ReactMarkdown>
              </div>
            </div>
          </p>
        </div>
      )}
    </>
  );
};

export default SummaryDetails;
