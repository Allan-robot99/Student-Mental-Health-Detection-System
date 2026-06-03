import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-page py-10 flex-1 space-y-4">
        <h1 className="text-2xl font-semibold">About this project</h1>
        <p className="text-slate-700">
          This smart campus project provides an early-awareness self-check for student mental
          health risk using machine learning.
        </p>
        <p className="text-slate-700">
          The system uses PHQ-9, GAD-7, lifestyle, academic stress, and support indicators to
          predict a high-risk or low-risk result.
        </p>
        <p className="text-slate-700">
          Limitation: this tool is not a medical diagnosis and should not replace professional
          counseling or emergency support.
        </p>
      </main>
      <Footer />
    </div>
  );
}
