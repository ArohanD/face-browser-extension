// SET UP VIDEO //
export const loadWebcam = async (callback: () => any) => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
  
        videoElement.srcObject = stream;
        await videoElement.play();
  
        console.log("Video has loaded");
        callback();
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error("Could not find video element in DOM");
    }
  };