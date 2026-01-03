export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const searchParamss = await searchParams;

  return (
    <div className="mt-20" style={{ padding: "40px", textAlign: "center" }}>
      <h6>✅ Payment Successful</h6>
      <p>Thank you for your payment.</p>

      {searchParamss.session_id && (
        <p>
          <strong>Session ID:</strong> {searchParamss.session_id}
        </p>
      )}

      <p>You can safely close this page.</p>
    </div>
  );
}
