"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { useState } from "react";

export default function ConsentActions() {
  const [accepted, setAccepted] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleContinue() {
    if (!accepted) {
      setError("Please tick the consent box before continuing.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name or nickname before continuing.");
      return;
    }

    setError("");
    window.sessionStorage.setItem(STORAGE_KEYS.userName, name.trim());
    window.location.href = "/survey";
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-2 block font-medium">
          What name or nickname should we use for your result?
        </span>
        <input
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (event.target.value.trim()) {
              setError("");
            }
          }}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="Your nickname"
        />
      </label>

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
