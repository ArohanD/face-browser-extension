const interactiveElementTags: string[] = ["a"];
const interactiveAttributes: string[] = []; //To-Do: scan for on-click handlers

const getPointerCoordsFromRect = (rect: DOMRect) => {
  const xCoord = (rect.right - rect.x) * 0.5 + rect.x;
  const yCoord = (rect.bottom - rect.y) * 0.5 + rect.y;

  return { x: xCoord, y: yCoord };
};

const isWithinElement = (pointer: HTMLElement, container: HTMLElement) => {
  const pointerRect = pointer.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const pointerCoords = getPointerCoordsFromRect(pointerRect);

  // console.log("Pointer:", pointerCoords);
  // console.log("iElement:", containerRect);

  const isWithinX =
    pointerCoords.x > containerRect.left &&
    pointerCoords.x < containerRect.right;
  const isWithinY =
    pointerCoords.y > containerRect.top &&
    pointerCoords.y < containerRect.bottom;

  return isWithinX && isWithinY;
};

const interactiveElements: NodeListOf<HTMLElement> = document.body.querySelectorAll(
  interactiveElementTags.join(" ")
);

const mapDom = (body: HTMLElement) => {
  interactiveElements.forEach((el) => {
    el.classList.add("interactive_element");
  });

  let firstRect = interactiveElements[6].getBoundingClientRect();
  interactiveElements[6].classList.remove("interactive_element");
  interactiveElements[6].classList.add("interactive_blue");
  console.log("firstbound", firstRect);

  return interactiveElements;
};
mapDom(document.body);

let savedElement = "";

const positionWork = (pointer: HTMLElement, body: HTMLElement) => {
  interactiveElements.forEach((element) => {
    console.log(savedElement);
    if (isWithinElement(pointer, element)) {
      if (savedElement.toString() === element.toString()) {
        element.click();
      } else {
        savedElement = element.toString();
      }
    }
  });
};

export default positionWork;
