export const GrabList = () => {
  const todoLists = document.querySelectorAll<HTMLLIElement>('.todo__li');
  let startTimeMouseDown: number;
  let startTimeTouchStart: number;
  let endTimeMouseUp: number;
  let endTimeTouchEnd: number;
  let totalTimeMouseDown: number;
  let totalTimeTouch: number;
  let diffTimeGrabDelay: number;
  const grabDelay: number = 200;
  todoLists.forEach((list) => {
    const cancelGrab = () => {
      if (diffTimeGrabDelay > 0) {
        setTimeout(function () {
          list.classList.remove('grabbing');
        }, diffTimeGrabDelay + 100);
      }
    };
    list.addEventListener('touchstart', function (e: any) {
      startTimeTouchStart = parseInt(e.timeStamp);
      setTimeout(function () {
        list.classList.add('grabbing');
      }, grabDelay);
    });
    list.addEventListener('touchmove', function (e: any) {
      e.preventDefault();
    });
    list.addEventListener('touchend', function (e: any) {
      endTimeTouchEnd = parseInt(e.timeStamp);
      totalTimeTouch = endTimeTouchEnd - startTimeTouchStart;
      list.classList.remove('grabbing');
      diffTimeGrabDelay = grabDelay - totalTimeTouch;
      cancelGrab();
    });
    list.addEventListener('touchcancel', function (e: any) {
      list.classList.remove('grabbing');
    });
    list.addEventListener('mousedown', function (e: any) {
      startTimeMouseDown = parseInt(e.timeStamp);
      setTimeout(function () {
        list.classList.add('grabbing');
      }, grabDelay);
    });
    list.addEventListener('mouseup', function (e: any) {
      endTimeMouseUp = parseInt(e.timeStamp);
      totalTimeMouseDown = endTimeMouseUp - startTimeMouseDown;
      list.classList.remove('grabbing');
      diffTimeGrabDelay = grabDelay - totalTimeMouseDown;
      cancelGrab();
    });
    list.addEventListener('mouseleave', function (e: any) {
      list.classList.remove('grabbing');
    });
  });
};
