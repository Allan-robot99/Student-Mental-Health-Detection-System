import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm border border-slate-200">{children}</div>
  );
}
