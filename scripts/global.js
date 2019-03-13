/* 公用方法 */

/* 把现有的window.onload事件处理函数的值存入变量oldonload;
* 如果在这个处理函数上还没有绑定任何函数，就直接把新函数添加给它；
* 如果在这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾*/
function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
//addLoadEvent(prepareGallery);

/* 在目标元素后插入元素 */
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

/* 为元素ele添加class值value */
function addClass(ele,value) {
    if(!ele.className){
        ele.className = value;
    }else{
        var newClass = ele.className + ' ' + value;
        ele.className = newClass;
    }
}

/* 各页面需要用到的函数 */
/* 根据url路径判断页面当前所在的导航 */
function highLightPage() {
    if(!document.getElementById || !document.getElementsByTagName || !document.getElementById('navigation')) return false;
    var nav = document.getElementById('navigation');
    var links = nav.getElementsByTagName('a');
    var currentUrl = window.location.href;
    for(var i=0;i<links.length;i++){
        var linkUrl = links[i].getAttribute('href');
        if(currentUrl.indexOf(linkUrl) != -1){
            addClass(links[i],'here');
            break;
        }
    }
}
addLoadEvent(highLightPage);