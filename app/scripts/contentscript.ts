// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'

console.log(`'Allo 'Allo! Content script`);

const appPointer = document.createElement('div')
appPointer.id = "appPointer"
appPointer.innerText = "👃🏾"
appPointer.setAttribute("style", `top:20%; left:20%`)
document.body.appendChild(appPointer)

// chrome.tabs.create({
//     index: 0,
//     pinned: true
// })
