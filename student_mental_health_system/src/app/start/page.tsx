"use client";

import Button from "@/components/common/Button";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { STORAGE_KEYS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function StartPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    window.sessionStorage.setItem(STORAGE_KEYS.userName, name.trim());
    router.push("/survey");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-page py-10 flex-1">
        <h1 className="text-2xl font-semibold mb-4">Start self-check</h1>
        <form onSubmit={onSubmit} className="max-w-lg space-y-4">
          <label className="block">
            <span className="block mb-2">What name or nickname should we use for your result?</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2"
              placeholder="Your nickname"
            />
          </label>
          <Button type="submit">Start Survey</Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
