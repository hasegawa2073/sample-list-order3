export const UpdateUlHeight = () => {
  const todoUl = document.querySelector<HTMLUListElement>('.todo__ul');
  const todoLists = document.querySelectorAll<HTMLLIElement>('.todo__li');
  const heightArray: Array<number> = new Array();
  todoLists.forEach((list) => {
    heightArray.push(list.clientHeight);
  });
  // liの高さをすべて足した合計の値がulの高さ
  const calcUlHeight: number = heightArray.reduce((accu, curr) => {
    return accu + curr;
  }, 0);
  if (todoUl) {
    todoUl.style.height = `${calcUlHeight}px`;
  }
};
