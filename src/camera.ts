import Webcam from "node-webcam";

const webcam = Webcam.create({
  width: 640,
  height: 480,
  quality: 100,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false,
});

// カメラから画像をキャプチャする関数
export async function captureImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    webcam.capture("capture", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
