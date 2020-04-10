import Vue from 'vue';

import stopMove from './stopMove';

let directives = {
    focus: function(Vue) {
        Vue.directive('focus', {
            inserted: function(el) {
                el.onfocus = function() {
                    el.scrollIntoViewIfNeeded(true);
                    el.scrollIntoView(true);
                };
                el.focus();
            }
        });
    },
    stopMove: function(Vue) {
        Vue.directive('stopMove', {
            inserted: function(el) {
                stopMove(el);
            },
            unbind: function(el) {
                el.removeEventListener('touchstart', this, false);
                el.removeEventListener('touchmove', this, false);
                el.removeEventListener('touchend', this, false);
            }
        });
    }
};

// register global utility filters.
Object.keys(directives).forEach(key => {
    Vue.use(directives[key]);
});
