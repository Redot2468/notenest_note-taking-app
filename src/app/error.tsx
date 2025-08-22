"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="space-y-3">
      <h4>{error?.message}</h4>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
