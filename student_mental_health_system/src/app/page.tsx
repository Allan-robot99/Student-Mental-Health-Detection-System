import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import FeatureSection from "@/components/landing/FeatureSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import PrivacySafetyNotice from "@/components/landing/PrivacySafetyNotice";
import SupportMessage from "@/components/landing/SupportMessage";
import SurveyIncludes from "@/components/landing/SurveyIncludes";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-2">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <SurveyIncludes />
        <SupportMessage />
        <PrivacySafetyNotice />
      </main>
      <Footer />
    </div>
  );
}
