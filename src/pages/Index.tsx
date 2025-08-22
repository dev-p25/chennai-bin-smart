import HeroSection from "@/components/HeroSection";
import WasteCategories from "@/components/WasteCategories";
import CameraDemo from "@/components/CameraDemo";
import EducationalTips from "@/components/EducationalTips";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WasteCategories />
      <CameraDemo />
      <EducationalTips />
    </div>
  );
};

export default Index;
