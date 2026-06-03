import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  children?: ReactNode;
};

export default function Button({ variant = "primary", className = "", children, ...props }: Props) {
  const styles =
    variant === "primary"
      ? "bg-[var(--primary)] text-white hover:opacity-90"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  return (
    <button
      className={`rounded-md px-4 py-2 font-medium transition ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
