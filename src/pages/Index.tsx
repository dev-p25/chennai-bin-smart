import HeroSection from "@/components/HeroSection";
import WasteCategories from "@/components/WasteCategories";
import CameraCapture from "@/components/CameraCapture";
import EducationalTips from "@/components/EducationalTips";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WasteCategories />
      <CameraCapture />
      <EducationalTips />
    </div>
  );
};

export default Index;
