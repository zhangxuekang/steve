const doList = ['腹', '腿', '胸', '臂'];

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const day = now.getDate();
const hour = now.getHours();
const ampm = hour < 12 ? 'am' : 'pm';

const theFirstDay_time = +new Date(year, 0);
const today_time = new Date(year, month, day);
const days = (today_time - theFirstDay_time) / 1000 / 60 / 60 / 24;

const now_do = doList[days % doList.length]

const $content = document.querySelector('.content');
$content.innerHTML = now_do;

const $time = document.querySelector('.time');
$time.innerHTML = now.toLocaleString();
setInterval(() => {
  const now = new Date();
  $time.innerHTML = now.toLocaleString();
}, 1000);

function resetFontSize() {
  let d = document.createElement('div');
  d.style.cssText =
    'width:1rem;height:0;overflow: hidden;position:absolute;z-index:-1;visibility: hidden;';
  document.body.appendChild(d);
  let dw = d.offsetWidth; // 1rem的实际展示px值
  document.body.removeChild(d);
  let html = document.querySelector('html');
  if (!!html) {
    let fz = html.style.fontSize.slice(0, -2) * 1 || 0; //正常计算出来的rem基准值 , 可自行修改为rem计算好的值
    let realRem = fz;
    if (dw != fz) {
      //不相等 则被缩放了
      realRem = Math.pow(fz, 2) / dw;
    }
    html.style.fontSize = realRem + 'px';
  }
}

function autoRem() {
  let docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      let clientHeight = docEl.clientHeight;
      let clientWidth = docEl.clientWidth;
      if (!clientHeight) return;
      let wh = clientWidth / clientHeight;
      if (wh > 16 / 9) {
        docEl.style.fontSize = 100 * (clientHeight / 720) + 'px';
      } else {
        docEl.style.fontSize = 100 * ((clientWidth * 9) / (720 * 16)) + 'px';
      }
      resetFontSize();
    };

  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
}
autoRem();
