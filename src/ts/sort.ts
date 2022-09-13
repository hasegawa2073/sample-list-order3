export const Sort = () => {
  const todoUl = document.querySelector<HTMLLIElement>('.todo__ul');
  const todoLists = document.querySelectorAll<HTMLLIElement>('.todo__li');
  let startMouseY: number;
  let currentMouseY: number;
  let moveMouseY: number;
  let startTargetTop: number;
  let targetTop: number;
  const listsArray: Array<HTMLLIElement> = Array.from(todoLists);
  // topの値順にリストの配列を返す関数
  const topOrderListArray = (listsArray: Array<HTMLLIElement>) => {
    const listTopMap: Map<HTMLLIElement, number> = new Map();
    let topOrderListMap: Map<HTMLLIElement, number>;
    let topOrderListArray: Array<HTMLLIElement> = new Array();
    listsArray.forEach((list) => {
      listTopMap.set(list, parseInt(list.style.top));
    });
    topOrderListMap = new Map(
      [...listTopMap].sort((a, b) => {
        return a[1] - b[1];
      })
    );
    topOrderListMap.forEach((top, list) => {
      topOrderListArray.push(list);
    });
    return topOrderListArray;
  };
  // 自分より上に位置する(topの値が小さい)リストの高さの合計をtopにそれぞれ当てる処理
  const setListTop = (topOrderListArray: Array<HTMLLIElement>) => {
    const listHeightArray: Array<number> = new Array();
    topOrderListArray.forEach((list) => {
      listHeightArray.push(list.clientHeight);
      listHeightArray.reduce((accu, curr) => {
        list.style.top = `${accu}px`;
        return accu + curr;
      }, 0);
    });
  };
  // 並び順とDOMの順番を揃える処理
  const topOrderAppendDOM = (topOrderListArray: Array<HTMLLIElement>) => {
    topOrderListArray.forEach((list) => {
      todoUl?.append(list);
    });
  };

  todoLists.forEach((list) => {
    list.addEventListener('mousedown', function (e: any) {
      startMouseY = e.clientY;
      startTargetTop = parseInt(list.style.top);
    });
    list.addEventListener('mousemove', function (e: any) {
      currentMouseY = e.clientY;
      moveMouseY = currentMouseY - startMouseY;
      targetTop = startTargetTop + moveMouseY;

      setListTop(topOrderListArray(listsArray));

      if (list.classList.contains('grabbing')) {
        list.style.top = `${targetTop}px`;
      }
    });
    list.addEventListener('mouseup', function (e: any) {
      setListTop(topOrderListArray(listsArray));
      setTimeout(function () {
        topOrderAppendDOM(topOrderListArray(listsArray));
      }, 1000);
    });
  });
};
