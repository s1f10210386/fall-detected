import * as tf from "@tensorflow/tfjs-node";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { captureImage } from "./camera";
import fs from "fs";

async function estimatePose() {
  // MoveNetモデルをロード
  const detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet
  );

  try {
    // カメラから画像を取得
    const imagePath = await captureImage();

    // 画像データを読み込む
    const imageBuffer = fs.readFileSync(imagePath);
    const imageTensor = tf.node.decodeImage(imageBuffer);

    // 姿勢推定を実行
    const poses = await detector.estimatePoses(imageTensor);

    console.log("推定された姿勢:", poses);

    // メモリを解放
    imageTensor.dispose();
  } catch (error) {
    console.error("姿勢推定中にエラーが発生しました:", error);
  }
}

estimatePose().catch(console.error);
