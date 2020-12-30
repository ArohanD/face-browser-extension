// Enable chromereload by uncommenting this line:
import "chromereload/devonly";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
import calculateMode from "./utils/calculatemode";
import {
  videoElement,
  appPointer,
  calibrationText,
} from "./dom/customDomElements";
import { loadWebcam } from "./dom/loadWebcam";
import positionWork from "./dom/positions";
//import "@tensorflow/tfjs-backend-cpu";
//import * as tf from "@tensorflow/tfjs";

// STATES AND INTERFACES //
interface Position {
  x: number;
  y: number;
  z: number;
}

let sensitivity = 30;
let pointerLeft = 50;
let pointerTop = 50;
let pointerSpeed = 1;

let calibrationSet = [] as any[];
let position: Position = {
  x: 0,
  y: 0,
  z: 0,
};
let baseline: Position = {
  x: 0,
  y: 0,
  z: 0,
};

const runFaceDetector = async () => {
  const net = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  );
  setInterval(() => {
    detectFace(net);
  }, 10);
  
  setInterval(() => {
    positionWork(appPointer, document.body)
  }, 1000)
};

const detectFace = async (net: any) => {
  const face = await net.estimateFaces({
    input: videoElement,
  });
  if (face[0]) {
    const landmarkArray = face[0].annotations.noseTip[0];

    position = {
      x: landmarkArray[0],
      y: landmarkArray[1],
      z: landmarkArray[2],
    };
    if (calibrationSet.length < 100) {
      calibrationSet.push(position);
    } else if (calibrationSet.length === 100) {
      document.body.removeChild(calibrationText);
      calibrationSet.push(position);

      const xPositions: number[] = [],
        yPositions: number[] = [],
        zPositions: number[] = [];

      calibrationSet.forEach((position) => {
        xPositions.push(Math.round(position.x));
        yPositions.push(Math.round(position.y));
        zPositions.push(Math.round(position.z));
      });

      baseline = {
        x: calculateMode(xPositions),
        y: calculateMode(yPositions),
        z: calculateMode(zPositions),
      };
    } else {
      const currentPosition: Position = {
        x: landmarkArray[0],
        y: landmarkArray[1],
        z: landmarkArray[2],
      };

      const xChange = currentPosition.x - baseline.x;
      const yChange = currentPosition.y - baseline.y;

      switch (true) {
        case xChange > 0 && Math.abs(xChange) > sensitivity:
          if (pointerLeft - pointerSpeed >= 0) pointerLeft -= pointerSpeed;
          break;
        case xChange < 0 && Math.abs(xChange) > sensitivity:
          if (pointerLeft + pointerSpeed <= 100) pointerLeft += pointerSpeed;
          break;
        default:
      }

      switch (true) {
        case yChange > 0 && Math.abs(yChange) > sensitivity:
          if (pointerTop + pointerSpeed <= 100) pointerTop += pointerSpeed;
          break;
        case yChange < 0 && Math.abs(yChange) > sensitivity:
          if (pointerTop - pointerSpeed >= 0) pointerTop -= pointerSpeed;
          break;
        default:
      }

      appPointer.setAttribute(
        "style",
        `top:${pointerTop}%; left:${pointerLeft}%`
      );
    }
  }
};

loadWebcam(runFaceDetector);
