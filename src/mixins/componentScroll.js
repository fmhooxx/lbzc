export default {
    activated() {
        this.isBaseLoadPage = false;
        window.scrollTo(0, this.scrollTop ? this.scrollTop : 0);
        window.addEventListener('scroll',function(){
           console.log(this.window.screenY)
        })
    },
    deactivated() {
        this.isBaseLoadPage = true;
        this.scrollTop = window.scrollY;
    }
};
