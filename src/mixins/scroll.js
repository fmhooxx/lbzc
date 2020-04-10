export default {
    activated() {
        let top = this.scrollTop;
        window.scrollTo(0, top ? top : 0);
        window.addEventListener('scroll', this._scrollEvent);
        if(this.flag){
            this.isBaseLoadPage = false;
        }
        this.flag = true;
    },
    deactivated() {
        window.removeEventListener('scroll', this._scrollEvent);
        this.isBaseLoadPage = true;
    },
    methods: {
        _scrollEvent() {
            this.scrollTop = window.scrollY;
        }
    }
};
