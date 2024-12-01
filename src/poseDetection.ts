import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { captureImage } from "./camera";
import { decodeImage } from "@tensorflow/tfjs-backend-cpu";

async function estimatePose() {
  // MoveNetモデルをロード
  const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet
  );

  try {
    console.log("画像をキャプチャ中...");
    const imageBuffer = await captureImage();

    // 画像をTensor形式に変換
    const imageTensor = decodeImage(imageBuffer, 3);

    // 推定実行
    const poses = await detector.estimatePoses(imageTensor);
    console.log("姿勢推定結果:", poses);

    // メモリ解放
    imageTensor.dispose();
  } catch (error) {
    console.error("姿勢推定中にエラーが発生:", error);
  }
}

estimatePose().catch(console.error);
