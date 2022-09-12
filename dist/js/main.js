const UpdateUlHeight = import('./UpdateUlHeight.js');

document.addEventListener('DOMContentLoaded', function () {
  // 読み込み時にulのheightを計算してスタイルを当てる
  UpdateUlHeight.then((moduleObject) => {
    moduleObject.UpdateUlHeight();
  });
  window.addEventListener('resize', function () {
    // 画面をリサイズしたときにもulのheightを更新
    UpdateUlHeight.then((moduleObject) => {
      moduleObject.UpdateUlHeight();
    });
  });
});
