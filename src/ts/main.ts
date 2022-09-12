import { AddLiTop } from './AddLiTop.js';
const UpdateUlHeight = import('./UpdateUlHeight.js');

document.addEventListener('DOMContentLoaded', function () {
  // 読み込み時にulのheightを計算してスタイルを当てる
  UpdateUlHeight.then((moduleObject) => {
    moduleObject.UpdateUlHeight();
  });
  // 読み込み時にliそれぞれのtopを計算してスタイルを当てる
  AddLiTop();
  window.addEventListener('resize', function () {
    // リサイズしたときulのheightを更新
    UpdateUlHeight.then((moduleObject) => {
      moduleObject.UpdateUlHeight();
    });
    // リサイズしたときliのtopを更新
    AddLiTop();
  });
});
