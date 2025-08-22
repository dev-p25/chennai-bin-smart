import { Button } from "@/components/ui/button";
import { Camera, Leaf, Smartphone } from "lucide-react";
import heroPhone from "@/assets/hero-phone.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Leaf className="w-4 h-4" />
              Smart Waste Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Bin-It
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Right</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Chennai's smart AI-powered waste segregation app. Simply point your camera at waste and let AI guide you to the right bin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="lg" className="group">
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Try Camera Demo
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/50">
              <Smartphone className="w-5 h-5" />
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Fast</div>
              <div className="text-sm text-muted-foreground">Detection</div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src={heroPhone} 
              alt="Bin-It Right App Interface" 
              className="relative w-80 h-auto rounded-3xl shadow-strong transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;