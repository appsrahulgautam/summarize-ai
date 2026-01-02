export default function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>✅ Payment Successful</h1>
      <p>Thank you for your payment.</p>

      {searchParams.session_id && (
        <p>
          <strong>Session ID:</strong> {searchParams.session_id}
        </p>
      )}

      <p>You can safely close this page.</p>
    </div>
  );
}
