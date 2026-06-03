"use client";

import { useState } from "react";

export default function ConsentActions() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  function handleContinue() {
    if (!accepted) {
      setError("Please tick the consent box before continuing.");
      return;
    }

    setError("");
    window.location.href = "/start";
  }

  return (
    <div className="space-y-4">
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => {
            const nextAccepted = event.target.checked;
            setAccepted(nextAccepted);
            if (nextAccepted) {
              setError("");
            }
          }}
        />
        <span>I understand that this tool is for self-awareness and not a medical diagnosis.</span>
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="button"
        onClick={handleContinue}
        className="rounded-md bg-[var(--primary)] px-4 py-2 font-medium text-white transition hover:opacity-90"
      >
        Continue
      </button>
    </div>
  );
}
