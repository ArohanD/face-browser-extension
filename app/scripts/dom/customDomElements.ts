// HTML //
export const appPointer = document.createElement("div");
appPointer.id = "appPointer";
appPointer.innerText = "👃🏾";
appPointer.setAttribute("style", `top:50%; left:50%`);
document.body.appendChild(appPointer);

export const videoElement = document.createElement("video");
videoElement.id = "appVideoStream";
document.body.appendChild(videoElement);

export const calibrationText = document.createElement("h1");
calibrationText.id = "calibrationText";
calibrationText.innerText = "CALIBRATING...PLEASE STAY STILL";
document.body.appendChild(calibrationText);