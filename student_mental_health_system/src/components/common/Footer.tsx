import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid gap-6 py-6 md:grid-cols-[1.4fr_auto_auto] md:items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Image src="/images/App_Logo.png" alt="App Logo" width={32} height={32} />
            <span>Student Mental Health Check</span>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            An educational self-check tool for students that supports reflection, early awareness,
            and practical next steps. This system is not a medical diagnosis.
          </p>
        </div>

        <nav className="grid gap-2 text-sm text-slate-600">
          <Link href="/about">About</Link>
          <Link href="/consent">Consent</Link>
          <Link href="/#support">Support Resources</Link>
          <Link href="/#support">Privacy Notice</Link>
        </nav>

        <div className="text-sm text-slate-500 md:text-right">
          <p>&copy; 2025 Student Mental Health Check</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
