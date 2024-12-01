import { captureImage } from "./camera";

async function testCamera() {
  try {
    const imagePath = await captureImage();
    console.log(`画像がキャプチャされました: ${imagePath}`);
  } catch (error) {
    console.error("カメラのキャプチャに失敗しました:", error);
  }
}

testCamera();
