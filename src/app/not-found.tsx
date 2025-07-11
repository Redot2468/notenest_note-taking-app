import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center gap-3 justify-center">
      <h5>404</h5>
      <div className="border-4 h-[50px] text-neutral-500" />
      <p>Page not found.</p>
    </div>
  );
}
