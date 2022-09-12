export const UpdateUlHeight = () => {
    const todoUl = document.querySelector('.todo__ul');
    const todoLists = document.querySelectorAll('.todo__li');
    const heightArray = new Array();
    todoLists.forEach((list) => {
        heightArray.push(list.clientHeight);
    });
    // liの高さをすべて足した合計の値がulの高さ
    const calcUlHeight = heightArray.reduce((accu, curr) => {
        return accu + curr;
    }, 0);
    if (todoUl) {
        todoUl.style.height = `${calcUlHeight}px`;
    }
};
