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

export function getMinValue(data: ProductData[], prop: 'price' | 'stock') {
  return Math.min(...data.map((item) => item[prop]));
}

export function getMaxValue(data: ProductData[], prop: 'price' | 'stock') {
  return Math.max(...data.map((item) => item[prop]));
}
