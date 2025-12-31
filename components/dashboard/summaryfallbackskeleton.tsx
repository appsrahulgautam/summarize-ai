const SummaryItemsFallback = () => {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="m-4 p-4 sm:py-8 sm:p-4 border border-rose-200 
            rounded-2xl bg-rose-50 animate-pulse"
          >
            {/* Header */}
            <div className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-rose-200" />
              <div className="flex flex-col gap-2 w-full">
                <div className="h-5 w-3/4 bg-rose-200 rounded" />
                <div className="h-4 w-1/2 bg-rose-200 rounded" />
              </div>
            </div>

            {/* Summary text */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full bg-rose-200 rounded" />
              <div className="h-4 w-full bg-rose-200 rounded" />
              <div className="h-4 w-5/6 bg-rose-200 rounded" />
              <div className="h-4 w-4/6 bg-rose-200 rounded" />
            </div>

            {/* Footer */}
            <div className="flex flex-row justify-between items-center mt-6">
              <div className="h-6 w-20 bg-rose-200 rounded-full" />
              <div className="h-10 w-10 bg-rose-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryItemsFallback;
