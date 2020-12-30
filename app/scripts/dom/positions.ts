const interactiveElementTags: string[] = ["a"];
const interactiveAttributes: string[] = []; //To-Do: scan for on-click handlers

const mapDom = (body: HTMLElement) => {
  const interactiveElements: NodeListOf<HTMLElement> = body.querySelectorAll(
    interactiveElementTags.join(" ")
  );

  interactiveElements.forEach((el) => {
    el.classList.add("interactive_element");
  });

  return interactiveElements;
};

const positionWork = (pointer: HTMLElement, body: HTMLElement) => {
  var rect = pointer.getBoundingClientRect();
  console.log("bounding:", rect);
  console.log("Postions:", pointer.offsetLeft, pointer.offsetTop);
  console.log(mapDom(body));
};

export default positionWork;
