import React, { useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Camera, Download } from "lucide-react";

const PolaroidCamera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video && ctx && video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frameCanvas = document.createElement("canvas");
      frameCanvas.width = canvas.width + 40;
      frameCanvas.height = canvas.height + 100;
      const frameCtx = frameCanvas.getContext("2d");
      
      frameCtx.fillStyle = "white";
      frameCtx.fillRect(0, 0, frameCanvas.width, frameCanvas.height);
      frameCtx.drawImage(canvas, 20, 20, canvas.width, canvas.height);
      
      setPhoto(frameCanvas.toDataURL("/Polaroid.png"));
    }
  };

  const downloadPhoto = () => {
    if (photo) {
      const link = document.createElement("a");
      link.href = photo;
      link.download = "Polaroid.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <video ref={videoRef} autoPlay playsInline className="w-64 h-64 bg-black rounded-lg"></video>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="flex gap-2">
        <Button onClick={startCamera} className="bg-blue-500">Start Camera</Button>
        <Button onClick={capturePhoto} className="bg-green-500 flex items-center">
          <Camera className="mr-2" size={16} /> Capture
        </Button>
      </div>
      {photo && (
        <Card className="p-2 bg-white shadow-lg border rounded-lg">
          <CardContent>
            <img src={photo} alt="Polaroid" className="w-full h-auto" />
            <Button onClick={downloadPhoto} className="mt-2 bg-red-500 flex items-center">
              <Download className="mr-2" size={16} /> Download
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PolaroidCamera;

