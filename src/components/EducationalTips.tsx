import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Recycle, TreePine, Award } from "lucide-react";

const tips = [
  {
    icon: Leaf,
    title: "Composting Benefits",
    content: "Wet waste can be composted at home to create nutrient-rich soil. Chennai processes 3,000+ tons of wet waste daily through composting.",
    impact: "Reduces landfill burden by 40%"
  },
  {
    icon: Recycle, 
    title: "Recycling Impact",
    content: "Proper dry waste segregation helps Chennai's recycling facilities process 1,500+ tons daily, creating jobs and reducing environmental impact.",
    impact: "Saves 2.5 tons CO2 per ton recycled"
  },
  {
    icon: TreePine,
    title: "Environmental Benefits", 
    content: "Every household practicing waste segregation contributes to cleaner air, reduced pollution, and better quality of life in Chennai.",
    impact: "Cleaner Chennai for future generations"
  },
  {
    icon: Award,
    title: "Chennai's Goal",
    content: "Chennai aims to achieve 100% waste segregation by 2025. Your participation helps reach this important environmental milestone.",
    impact: "Be part of the solution"
  }
];

const EducationalTips = () => {
  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Environmental Education
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why <span className="text-primary">Segregation Matters</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the impact of proper waste segregation helps build a 
            sustainable future for Chennai and our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tips.map((tip, index) => {
            const IconComponent = tip.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Impact
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tip.content}
                  </p>
                  <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary">
                      ✨ {tip.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center bg-gradient-primary p-8 rounded-2xl shadow-medium">
          <h3 className="text-2xl font-bold text-primary-foreground mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            Join thousands of Chennai residents who are already using Bin-It Right 
            to contribute to a cleaner, greener city.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground">10K+</div>
              <div className="text-sm text-primary-foreground/80">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground">50K+</div>
              <div className="text-sm text-primary-foreground/80">Items Classified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-foreground">95%</div>
              <div className="text-sm text-primary-foreground/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalTips;