(function () {

    size();

    window.onresize = function () {

        size();

    }

    function size() {

        //下面两行有的手机会受到系统字体大小的影响

       //  var winW = document.documentElement.clientWidth || document.body.clientWidth;

       // document.documentElement.style.fontSize = winW / 10 + "px";



       var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

       var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

      var width = w > h ? h : w

      width = width > 720 ? 720 : width

      var fz = ~~(width * 100000 / 37.5) / 10000 //375px 为设计尺寸

      var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.replace('px', '') * 10000) / 10000

      // if (fz !== realfz) {

      //  document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz * (fz / realfz) + 'px'

      // }else{

      //  document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz + 'px'

      // }

      document.getElementsByTagName('html')[0].style.cssText = 'font-size: ' + fz * (fz / realfz) + 'px'

    }

})()