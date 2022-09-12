export const GrabList = () => {
    const todoLists = document.querySelectorAll('.todo__li');
    let startTimeMouseDown;
    let startTimeTouchStart;
    let endTimeMouseUp;
    let endTimeTouchEnd;
    let totalTimeMouseDown;
    let totalTimeTouch;
    let diffTimeGrabDelay;
    const grabDelay = 200;
    todoLists.forEach((list) => {
        list.addEventListener('touchstart', function (e) {
            startTimeTouchStart = parseInt(e.timeStamp);
            setTimeout(function () {
                list.classList.add('grabbing');
            }, grabDelay);
        });
        list.addEventListener('touchmove', function (e) {
            e.preventDefault();
        });
        list.addEventListener('touchend', function (e) {
            endTimeTouchEnd = parseInt(e.timeStamp);
            totalTimeTouch = endTimeTouchEnd - startTimeTouchStart;
            list.classList.remove('grabbing');
            diffTimeGrabDelay = grabDelay - totalTimeTouch;
            if (diffTimeGrabDelay > 0) {
                setTimeout(function () {
                    list.classList.remove('grabbing');
                }, diffTimeGrabDelay + 100);
            }
            list.addEventListener('touchcancel', function (e) {
                list.classList.remove('grabbing');
            });
        });
        list.addEventListener('mousedown', function (e) {
            startTimeMouseDown = parseInt(e.timeStamp);
            setTimeout(function () {
                list.classList.add('grabbing');
            }, grabDelay);
        });
        list.addEventListener('mouseup', function (e) {
            endTimeMouseUp = parseInt(e.timeStamp);
            totalTimeMouseDown = endTimeMouseUp - startTimeMouseDown;
            list.classList.remove('grabbing');
            diffTimeGrabDelay = grabDelay - totalTimeMouseDown;
            if (diffTimeGrabDelay > 0) {
                setTimeout(function () {
                    list.classList.remove('grabbing');
                }, diffTimeGrabDelay + 100);
            }
        });
        list.addEventListener('mouseleave', function (e) {
            list.classList.remove('grabbing');
        });
    });
};
