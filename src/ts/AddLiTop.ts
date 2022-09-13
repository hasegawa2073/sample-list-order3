export const AddLiTop = () => {
  const todoLists = document.querySelectorAll<HTMLLIElement>('.todo__li');
  const heightArray: Array<number> = new Array();
  todoLists.forEach((list) => {
    heightArray.push(list.clientHeight);
  });
  const listTopArray: Array<number> = new Array();
  heightArray.reduce((accu, curr) => {
    listTopArray.push(accu);
    return accu + curr;
  }, 0);
  todoLists.forEach((list, i) => {
    list.style.top = `${listTopArray[i]}px`;
  });
};
