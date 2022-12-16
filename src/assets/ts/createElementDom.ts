export const createElemDOM = (
  typeElem: string,
  classes: string,
  inner = ''
) => {
  const node: HTMLElement = document.createElement(typeElem);
  if (classes) {
    node.className = classes;
  }

  if (inner) node.innerHTML = inner;
  return node;
};
