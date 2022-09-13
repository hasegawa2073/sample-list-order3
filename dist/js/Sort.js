export const Sort = () => {
    const todoUl = document.querySelector('.todo__ul');
    const todoLists = document.querySelectorAll('.todo__li');
    let startTouchX;
    let startMouseX;
    let startTouchY;
    let startMouseY;
    let currentTouchX;
    let currentMouseX;
    let currentTouchY;
    let currentMouseY;
    let moveTouchX;
    let moveMouseX;
    let moveTouchY;
    let moveMouseY;
    let startTargetLeft;
    let startTargetTop;
    let targetLeft;
    let targetTop;
    const listsArray = Array.from(todoLists);
    // リストのleftを0に戻す処理
    const resetListLeft = () => {
        listsArray.forEach((list) => {
            list.style.left = '0px';
        });
    };
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
            listHeightArray.reduce((accu, curr) => {
                list.style.top = `${accu}px`;
                return accu + curr;
            }, 0);
        });
    };
    // 並び順とDOMの順番を揃える処理
    const topOrderAppendDOM = (topOrderListArray) => {
        topOrderListArray.forEach((list) => {
            todoUl?.append(list);
        });
    };
    todoLists.forEach((list) => {
        list.addEventListener('touchstart', function (e) {
            startTouchX = e.pageX;
            startTouchY = e.pageY;
            startTargetLeft = parseInt(list.style.left);
            startTargetTop = parseInt(list.style.top);
        });
        list.addEventListener('touchmove', function (e) {
            currentTouchX = e.pageX;
            currentTouchY = e.pageY;
            moveTouchX = currentTouchX - startTouchX;
            moveTouchY = currentTouchY - startTouchY;
            targetLeft = startTargetLeft + moveTouchX;
            targetTop = startTargetTop + moveTouchY;
            setListTop(topOrderListArray(listsArray));
            if (list.classList.contains('grabbing')) {
                list.style.left = `${targetLeft}px`;
                list.style.top = `${targetTop}px`;
            }
        });
        list.addEventListener('touchend', function (e) {
            resetListLeft();
            setListTop(topOrderListArray(listsArray));
            setTimeout(function () {
                topOrderAppendDOM(topOrderListArray(listsArray));
            }, 1000);
        });
        list.addEventListener('mousedown', function (e) {
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            startTargetLeft = parseInt(list.style.left);
            startTargetTop = parseInt(list.style.top);
        });
        list.addEventListener('mousemove', function (e) {
            currentMouseX = e.clientX;
            currentMouseY = e.clientY;
            moveMouseX = currentMouseX - startMouseX;
            moveMouseY = currentMouseY - startMouseY;
            targetLeft = startTargetLeft + moveMouseX;
            targetTop = startTargetTop + moveMouseY;
            setListTop(topOrderListArray(listsArray));
            if (list.classList.contains('grabbing')) {
                list.style.left = `${targetLeft}px`;
                list.style.top = `${targetTop}px`;
            }
        });
        list.addEventListener('mouseup', function (e) {
            resetListLeft();
            setListTop(topOrderListArray(listsArray));
            setTimeout(function () {
                resetListLeft();
                topOrderAppendDOM(topOrderListArray(listsArray));
            }, 1000);
        });
    });
};
