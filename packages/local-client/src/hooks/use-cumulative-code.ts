import { useTypedSelector } from "./use-typed-selector";

export const useCumulatievCode = (cellId: string) => {

  const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = function(value) {
      const root = document.querySelector('#root');
      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root)
        } else {
          root.innerHTML = JSON.stringify(value);  
        }
      } else {
        root.innerHTML = value;
      }
    }
  `
  const showFuncNoop = `var show = () => {}`; // using `var` allow us to redeclare variable as many times as we wish
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderCells = order.map(id => data[id]);

    const r = [];
    for (let c of orderCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          r.push(showFunc);
        } else {
          r.push(showFuncNoop);
        }
        r.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return r;
  }).join("\r\n");

}
