// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`);

const appPointer = document.createElement('div')
appPointer.id = "appPointer"
appPointer.innerText = "👃🏾"
appPointer.setAttribute("style", `top:20%; left:20%`)
document.body.appendChild(appPointer)

const videoElement = document.createElement('video')
videoElement.id = 'appVideoStream'
videoElement.setAttribute("width", "600")
videoElement.setAttribute("height", "480")
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
        } catch (e) {
            console.error(e);
        }
    } else {
        console.error('Could not find video element in DOM')
    }
}

loadWebcam()