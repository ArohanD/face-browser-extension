// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-backend-webgl";
//import "@tensorflow/tfjs-backend-cpu";
//import * as tf from "@tensorflow/tfjs";
import * as calculateMode from "./utils/calculatemode.js";

console.log(`'Allo 'Allo! Content script`);

const appPointer = document.createElement('div')
appPointer.id = "appPointer"
appPointer.innerText = "👃🏾"
appPointer.setAttribute("style", `top:20%; left:20%`)
document.body.appendChild(appPointer)

const videoElement = document.createElement('video')
videoElement.id = 'appVideoStream'
document.body.appendChild(videoElement)

const loadWebcam = async() => {
    const videoElement = document.querySelector('video')
    if(videoElement){
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
        
            videoElement.srcObject = stream;
            await videoElement.play();
        
            console.log("Video has loaded");
            runFaceDetector()
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error('Could not find video element in DOM')
    }
}

    let sensitivity = 30;
	let pointerLeft = 50;
	let pointerTop = 50;
	let pointerSpeed = 1.5;

	let pointerCalibrated;
	let calibrationSet = [] as any[];
	let position = {
		x: 0,
		y: 0,
		z: 0,
	};
	let baseline = {
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
};

const detectFace = async (net: any) => {
    const face = await net.estimateFaces({
        input: videoElement,
    });
    if(face[0]){
        const landmarkArray = face[0].annotations.noseTip[0];
        //console.log(landmarkArray);
        //console.log(face[0].annotations.noseTip.toString())
        position = {
            x: landmarkArray[0],
            y: landmarkArray[1],
            z: landmarkArray[2],
        };
        if (calibrationSet.length < 100)
            calibrationSet = [...calibrationSet, position];
    }
};

loadWebcam()