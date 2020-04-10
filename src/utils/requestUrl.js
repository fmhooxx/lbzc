export default function() {
    // let urlPath = window.document.location.href;
    // let docPath = window.document.location.pathname;
    // let index = urlPath.indexOf(docPath);
    // let url = urlPath.substring(0, index);
    let url = window.location.origin;
    if (url.indexOf('dev') >= 0) {
        return 'http://admin.xkzdai.com';
    } else {
        return 'http://admin.jinrirong.com';
    }
}
