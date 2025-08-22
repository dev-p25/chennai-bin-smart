import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, X, RotateCcw, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaptureResult {
  item: string;
  category: string;
  confidence: number;
  color: string;
  binInstruction: string;
  tip: string;
}

const mockClassifyImage = async (imageBlob: Blob): Promise<CaptureResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock results for demo - in real app, this would call your AI model
  const mockResults = [
    {
      item: "Food Waste",
      category: "Wet Waste", 
      confidence: 92,
      color: "waste-wet",
      binInstruction: "Green Bin",
      tip: "Perfect for composting! This organic waste will decompose naturally."
    },
    {
      item: "Plastic Container",
      category: "Dry Waste",
      confidence: 87,
      color: "waste-dry", 
      binInstruction: "Blue Bin",
      tip: "Rinse clean before disposal. This can be recycled into new products."
    },
    {
      item: "Electronic Item",
      category: "Recyclable",
      confidence: 94,
      color: "waste-recyclable",
      binInstruction: "Red Bin", 
      tip: "Requires special handling. Take to designated e-waste collection center."
    }
  ];
  
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

const CameraCapture = () => {
  const { toast } = useToast();
  const [isCamera, setIsCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<CaptureResult | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to use this feature.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCamera(false);
    setCapturedImage(null);
    setResult(null);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  }, [stopCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const analyzeImage = useCallback(async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Convert data URL to blob for processing
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      
      const classification = await mockClassifyImage(blob);
      setResult(classification);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${classification.item}`,
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [capturedImage, toast]);

  const resetCapture = useCallback(() => {
    setCapturedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  }, []);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Live AI Detection
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Classify Your <span className="text-primary">Waste Now</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Use your camera or upload an image to get instant AI-powered waste classification.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera/Upload Interface */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Capture or Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isCamera && !capturedImage && (
                <div className="space-y-4">
                  <div className="aspect-square bg-gradient-card rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Camera className="w-16 h-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">
                        Take a photo or upload an image
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="camera" 
                      size="lg" 
                      onClick={startCamera}
                      className="w-full"
                    >
                      <Camera className="w-5 h-5" />
                      Open Camera
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              )}

              {isCamera && (
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4"
                      onClick={stopCamera}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="camera" 
                      size="lg"
                      onClick={capturePhoto}
                      className="w-full"
                    >
                      <Camera className="w-5 h-5" />
                      Capture Photo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={stopCamera}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {capturedImage && (
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img 
                      src={capturedImage} 
                      alt="Captured waste item"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
                      onClick={resetCapture}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="hero" 
                      size="lg"
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="w-full"
                    >
                      {isAnalyzing ? (
                        <>
                          <RotateCcw className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Analyze Waste
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={resetCapture}
                      className="w-full"
                    >
                      Retake
                    </Button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <canvas ref={canvasRef} className="hidden" />
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Classification Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result ? (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {result.item}
                      </h3>
                      <p className="text-muted-foreground">Detected waste type</p>
                    </div>
                    <Badge className={`bg-${result.color}/10 text-${result.color} border-${result.color}/20`}>
                      {result.confidence}% confident
                    </Badge>
                  </div>

                  <div className={`p-6 bg-${result.color}/5 border border-${result.color}/20 rounded-xl space-y-4`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-${result.color}/10 rounded-lg`}>
                        <CheckCircle className={`w-6 h-6 text-${result.color}`} />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-lg">{result.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          Dispose in <strong>{result.binInstruction}</strong>
                        </p>
                      </div>
                    </div>
                    
                    <div className={`p-4 bg-${result.color}/10 rounded-lg`}>
                      <p className="text-sm text-muted-foreground">
                        💡 {result.tip}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="waste" className="w-full">
                      Save Result
                    </Button>
                    <Button variant="outline" onClick={resetCapture} className="w-full">
                      Try Another
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                    {isAnalyzing ? (
                      <RotateCcw className="w-8 h-8 text-muted-foreground animate-spin" />
                    ) : (
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    {isAnalyzing 
                      ? "AI is analyzing your image..." 
                      : capturedImage 
                        ? "Click 'Analyze Waste' to get results"
                        : "Capture or upload an image to start"
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            This demo uses simulated AI responses. In production, this would connect to your trained Teachable Machine model.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CameraCapture;