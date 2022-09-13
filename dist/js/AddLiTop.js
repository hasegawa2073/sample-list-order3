export const AddLiTop = () => {
    const todoLists = document.querySelectorAll('.todo__li');
    const heightArray = new Array();
    todoLists.forEach((list) => {
        heightArray.push(list.clientHeight);
    });
    const listTopArray = new Array();
    heightArray.reduce((accu, curr) => {
        listTopArray.push(accu);
        return accu + curr;
    }, 0);
    todoLists.forEach((list, i) => {
        list.style.left = '0px';
        list.style.top = `${listTopArray[i]}px`;
    });
};
