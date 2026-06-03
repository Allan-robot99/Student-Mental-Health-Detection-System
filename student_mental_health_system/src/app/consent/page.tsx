import ConsentActions from "@/components/consent/ConsentActions";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default function ConsentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-page py-10 flex-1">
        <h1 className="text-2xl font-semibold mb-4">Before you begin</h1>
        <ul className="list-disc list-inside text-slate-700 space-y-1 mb-4">
          <li>This self-check is for awareness only.</li>
          <li>It does not provide a medical diagnosis.</li>
          <li>You do not need to create an account.</li>
          <li>Please avoid entering sensitive personal information.</li>
          <li>If you feel unsafe, contact a counselor or emergency support immediately.</li>
        </ul>

        <ConsentActions />
      </main>
      <Footer />
    </div>
  );
}
