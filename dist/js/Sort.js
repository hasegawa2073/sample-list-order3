export const Sort = () => {
    const todoLists = document.querySelectorAll('.todo__li');
    let startMouseY;
    let currentMouseY;
    let moveMouseY;
    let startTargetTop;
    let targetTop;
    const listsArray = Array.from(todoLists);
    // topの値順にリストの配列を返す関数
    const topOrderListArray = (listsArray) => {
        const listTopMap = new Map();
        let topOrderListMap;
        let topOrderListArray = new Array();
        listsArray.forEach((list) => {
            listTopMap.set(list, parseInt(list.style.top));
        });
        topOrderListMap = new Map([...listTopMap].sort((a, b) => {
            return a[1] - b[1];
        }));
        topOrderListMap.forEach((top, list) => {
            topOrderListArray.push(list);
        });
        return topOrderListArray;
    };
    // 自分より上に位置する(topの値が小さい)リストの高さの合計をtopにそれぞれ当てる処理
    const setListTop = (topOrderListArray) => {
        const listHeightArray = new Array();
        topOrderListArray.forEach((list) => {
            listHeightArray.push(list.clientHeight);
            console.log(listHeightArray);
            listHeightArray.reduce((accu, curr) => {
                list.style.top = `${accu}px`;
                return accu + curr;
            }, 0);
        });
    };
    todoLists.forEach((list) => {
        list.addEventListener('mousedown', function (e) {
            startMouseY = e.clientY;
            startTargetTop = parseInt(list.style.top);
        });
        list.addEventListener('mousemove', function (e) {
            currentMouseY = e.clientY;
            moveMouseY = currentMouseY - startMouseY;
            targetTop = startTargetTop + moveMouseY;
            setListTop(topOrderListArray(listsArray));
            if (list.classList.contains('grabbing')) {
                list.style.top = `${targetTop}px`;
            }
        });
    });
};
