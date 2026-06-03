import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container-page py-10 grid gap-8 md:grid-cols-2 items-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">Student Mental Health Self-Checking System</h1>
        <p className="text-slate-700 mb-6">
          A smart campus self-check tool that helps students understand their current mental
          health risk level using machine learning.
        </p>
        <div className="flex gap-3">
          <Link href="/consent">
            <Button>Start Self-Check</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline">Learn More</Button>
          </Link>
        </div>
      </div>
      <Image
        src="/images/App_Hero.png"
        alt="Students using self-check app"
        width={700}
        height={450}
        className="rounded-lg w-full h-auto"
      />
    </section>
  );
}
