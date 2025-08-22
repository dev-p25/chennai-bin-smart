import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Droplets, FileText, RotateCcw } from "lucide-react";
import wetWasteIcon from "@/assets/wet-waste-icon.jpg";
import dryWasteIcon from "@/assets/dry-waste-icon.jpg";
import recyclableWasteIcon from "@/assets/recyclable-waste-icon.jpg";

const wasteCategories = [
  {
    id: "wet",
    title: "Wet Waste",
    description: "Organic & biodegradable waste",
    color: "waste-wet",
    icon: wetWasteIcon,
    iconComponent: Droplets,
    examples: ["Food scraps", "Vegetable peels", "Fruit waste", "Tea bags", "Eggshells"],
    binColor: "Green Bin",
    tips: "Compostable materials that decompose naturally"
  },
  {
    id: "dry",
    title: "Dry Waste",
    description: "Non-biodegradable recyclables", 
    color: "waste-dry",
    icon: dryWasteIcon,
    iconComponent: FileText,
    examples: ["Paper", "Cardboard", "Plastic bottles", "Metal cans", "Glass"],
    binColor: "Blue Bin",
    tips: "Clean and dry materials for recycling"
  },
  {
    id: "recyclable",
    title: "Recyclable",
    description: "Special recycling items",
    color: "waste-recyclable", 
    icon: recyclableWasteIcon,
    iconComponent: RotateCcw,
    examples: ["Electronics", "Batteries", "Medical waste", "Hazardous items"],
    binColor: "Red Bin",
    tips: "Requires special handling and processing"
  }
];

const WasteCategories = () => {
  return (
    <section className="py-20 px-4 bg-gradient-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Chennai Municipal Guidelines
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Know Your <span className="text-primary">Waste Categories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn the three main waste categories as per Chennai Corporation guidelines 
            and make a positive impact on our environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {wasteCategories.map((category) => {
            const IconComponent = category.iconComponent;
            return (
              <Card key={category.id} className="group hover:shadow-medium transition-all duration-300 overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-${category.color}/10 border border-${category.color}/20`}>
                      <IconComponent className={`w-8 h-8 text-${category.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.binColor}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className={`p-4 bg-${category.color}/5 rounded-lg border border-${category.color}/10`}>
                    <p className="text-sm text-muted-foreground">
                      💡 {category.tips}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="group">
            Start Camera Detection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WasteCategories;