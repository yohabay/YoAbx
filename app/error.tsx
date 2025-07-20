"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h2 style={{ color: "#ff5722", fontSize: 28, marginBottom: 16 }}>
        Something went wrong!
      </h2>
      <p style={{ color: "#333", marginBottom: 24 }}>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          background: "#ff5722",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "12px 24px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
