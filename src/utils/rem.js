(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            if (docEl.clientWidth > 750) {
                docEl.style.fontSize = '100px';
                doc.getElementById('app').style.width = '750px';
            } else {
                var width = docEl.clientWidth / 7.5;
                docEl.style.fontSize = width + 'px';
                let realfz =  window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.replace('px', '');
                document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + width * (width / realfz) + 'px'
                doc.getElementById('app').style.width = 'auto';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// (function(baseFontSize, doc, win) {
//     let docEl = doc.documentElement;
//     let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
//     let recalc = function() {
//         let _baseFontSize = baseFontSize || 100;
//         let ua = navigator.userAgent;
//         let matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
//         let isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
//         let dpr = window.devicePixelRatio || 1;
//         if (!isIos && !(matches && matches[1] > 534)) {
//             // 如果非iOS, 非Android4.3以上, dpr设为1;
//             dpr = 1;
//         }
//         let scale = 1 / dpr;
//         let metaEl = document.querySelector('meta[name="viewport"]');
//         if (!metaEl) {
//             metaEl = document.createElement('meta');
//             metaEl.setAttribute('name', 'viewport');
//             window.document.head.appendChild(metaEl);
//         }
//         metaEl.setAttribute(
//             'content',
//             'width=device-width,user-scalable=no,initial-scale=' +
//                 scale +
//                 ',maximum-scale=' +
//                 scale +
//                 ',minimum-scale=' +
//                 scale
//         );
//         if (docEl.clientWidth > 750 && dpr == 1) {
//             docEl.style.fontSize = '100px';
//             doc.getElementById('app').style.width = '750px';
//         } else {
//             let width = docEl.clientWidth;
//             docEl.style.fontSize = width / (750 / _baseFontSize) + 'px';
//             doc.getElementById('app').style.width = 'auto';
//         }
//     };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(100, document, window);
