import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

const demoResults = [
  {
    item: "Banana Peel",
    category: "Wet Waste", 
    confidence: 94,
    color: "waste-wet",
    binInstruction: "Green Bin",
    tip: "Perfect for composting! This organic waste will decompose naturally."
  },
  {
    item: "Plastic Bottle",
    category: "Dry Waste",
    confidence: 89,
    color: "waste-dry", 
    binInstruction: "Blue Bin",
    tip: "Rinse clean before disposal. This can be recycled into new products."
  },
  {
    item: "Battery",
    category: "Recyclable",
    confidence: 96,
    color: "waste-recyclable",
    binInstruction: "Red Bin", 
    tip: "Hazardous waste requiring special handling. Never dispose in regular bins."
  }
];

const CameraDemo = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [currentResult, setCurrentResult] = useState<typeof demoResults[0] | null>(null);
  const [demoIndex, setDemoIndex] = useState(0);

  const handleScan = () => {
    setIsScanning(true);
    setCurrentResult(null);
    
    setTimeout(() => {
      setCurrentResult(demoResults[demoIndex]);
      setIsScanning(false);
      setDemoIndex((prev) => (prev + 1) % demoResults.length);
    }, 2000);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            AI Demo
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Try Our <span className="text-primary">AI Detection</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI waste classification. Our Teachable Machine model 
            identifies waste types instantly with high accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Camera Interface */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Camera Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-square bg-gradient-card rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center relative overflow-hidden">
                {isScanning ? (
                  <div className="flex flex-col items-center space-y-4">
                    <RefreshCw className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-muted-foreground">Analyzing waste...</p>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Point camera at waste item</p>
                  </div>
                )}
              </div>

              <Button 
                variant="camera" 
                size="lg" 
                className="w-full" 
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Start Detection
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Detection Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {currentResult.item}
                      </h3>
                      <p className="text-muted-foreground">Detected item</p>
                    </div>
                    <Badge className={`bg-${currentResult.color}/10 text-${currentResult.color} border-${currentResult.color}/20`}>
                      {currentResult.confidence}% confident
                    </Badge>
                  </div>

                  <div className={`p-6 bg-${currentResult.color}/5 border border-${currentResult.color}/20 rounded-xl space-y-4`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${currentResult.color}/10 rounded-lg`}>
                        <AlertCircle className={`w-6 h-6 text-${currentResult.color}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{currentResult.category}</h4>
                        <p className="text-sm text-muted-foreground">Dispose in {currentResult.binInstruction}</p>
                      </div>
                    </div>
                    
                    <div className={`p-4 bg-${currentResult.color}/10 rounded-lg`}>
                      <p className="text-sm text-muted-foreground">
                        💡 {currentResult.tip}
                      </p>
                    </div>
                  </div>

                  <Button variant="waste" className="w-full">
                    Save to History
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Start a scan to see AI detection results
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground mb-4">
            This is a demo using pre-trained examples. The actual app uses live camera feed.
          </p>
          <Button variant="outline" onClick={handleScan}>
            Try Another Example
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CameraDemo;