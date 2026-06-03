import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import SurveyForm from "@/components/survey/SurveyForm";

export default function SurveyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-page py-10 flex-1">
        <h1 className="text-2xl font-semibold mb-4">Mental Health Self-Check Survey</h1>
        <SurveyForm />
      </main>
      <Footer />
    </div>
  );
}
