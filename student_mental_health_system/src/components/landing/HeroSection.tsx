import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="container-page py-8 md:py-10">
      <div className="landing-surface rounded-[28px] border border-slate-200 px-6 py-8 md:px-8 md:py-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Student Mental Health Self-Checking System
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-700">
                A smart campus self-check tool that helps students understand their current mental
                health risk level using machine learning.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-base text-slate-700">
              For self-awareness and early reflection only. This tool is not a medical diagnosis.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/consent" className="block">
                <Button className="w-full px-6 py-3 text-lg">Start Self-Check</Button>
              </Link>
              <Link href="/about" className="block">
                <Button variant="outline" className="w-full px-6 py-3 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="text-base text-slate-600">
              Takes about 3-5 minutes. No account required.
            </div>
          </div>

          <Card className="overflow-hidden border-cyan-100 bg-white/70 p-0">
            <Image
              src="/images/App_Hero.png"
              alt="Students using the mental health self-check"
              width={1100}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
