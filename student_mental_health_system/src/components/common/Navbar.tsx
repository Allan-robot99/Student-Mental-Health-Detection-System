import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container-page h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/images/App_Logo.png" alt="App Logo" width={32} height={32} />
          <span>Student Mental Health Check</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <Link href="/about">About</Link>
          <Link href="/consent">Consent</Link>
          <Link href="/#support">Support</Link>
        </nav>
      </div>
    </header>
  );
}
