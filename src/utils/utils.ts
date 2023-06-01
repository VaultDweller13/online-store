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

export const maskMMYY = (data: string): string => {
  const x = data.replace(/\D/, '');
  let val = x;
  if (x?.length) {
    val = x[2]
      ? x[3]
        ? `${x[0]}${x[1]}/${x[2]}${x[3]}`
        : `${x[0]}${x[1]}/${x[1]}`
      : data;
  }
  return val;
};

export const maskCard = (data: string): string => {
  let str = data.replace(/\D/, '');

  if (str.length > 4 * 4) str = str.slice(0, 17);
  const res = str.split(/(\d{4})/g).map((elem) => elem.trim());
  return res.filter((elem) => elem.trim() != '').join(' ');
};
