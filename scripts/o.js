//原:
function showPic(whichpic){
    var source = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholer');
    placeholder.setAttribute('src',source);
    var description = document.getElementById('description');
    var text = whichpic.getAttribute('title');
    description.childNodes[0].nodeValue = text;
}
//改进1后:
/*根据点击的元素展示图片
* 如果占位元素不存在，则返回true，作为结果，返回到onclick事件中，
* 此时，触发a标签的默认函数，即在浏览器打开
* 而对于描述，则可有可无，故，返回false,阻止a的默认事件*/
function showPicModified(whichpic){
    var source = whichpic.getAttribute('href');
    if(!document.getElementById('placeholer')) return true;//检查占位元素是否存在，不存在则
    var placeholder = document.getElementById('placeholer');
    placeholder.setAttribute('src',source);
    if(!document.getElementById('description')) return false;
    var description = document.getElementById('description');
    var text = whichpic.getAttribute('title');
    description.childNodes[0].nodeValue = text;
    return false;
}

/* 改进1后的js */
function prepareGallery() {
    if(!document.getElementById || !document.getElementsByTagName || !document.getElementById('imageGallery')) return false;
    var eleImgs = document.getElementById('imageGallery').getElementsByTagName('a');
    for(var i=0;i<eleImgs.length;i++){
        eleImgs[i].onclick = function () {
            return showPicModified(this);
            //return false;//交给showPic处理，并返回值
        };
        //在几乎所有浏览器中，用tab键移动某个链接然后按下回车键的动作也会触发onclick事件
    }
}

//改进2后（动态的创建placeholder和description）：
function preparePlaceholder(){
    //检测
    if(!document.createElement || !document.createTextNode
        || !document.getElementById || !document.getElementById('imageGallery')) return false;

    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholer');
    placeholder.setAttribute('src','images/placeholder.png');
    placeholder.setAttribute('alt','my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var descText = document.createTextNode('Choose an image');
    description.appendChild(descText);
    /*document.body.appendChild(placeholder);
    document.body.appendChild(description);*/
    var gallery = document.getElementById('imageGallery');
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}

window.onload = function (ev) {
    prepareGallery();
    preparePlaceholder();//改进2：加载时创建占位元素

    displayAbbreviations();//生产缩略词表
};
//window.onload = prepareGallery;//绑定单个事件时
//每个事件处理函数只能绑定一条指令，也可以像上面一样，或者进行封装如下：
/*
* 把现有的window.onload事件处理函数的值存入变量oldonload;
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
/*参考insetBefore(),但DOM本身没有insertAfter方法，根据已有属性可编写实现*/
function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

/* dom2 */
function displayAbbreviations() {
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //获取所有的abbr
    var abbrEles = document.getElementsByTagName('abbr');
    if(abbrEles.length < 1) return false;
    var defs = new Array();
    for(var i=0;i<abbrEles.length;i++){
        var current_abbr = abbrEles[i];
        var attrTitle = current_abbr.getAttribute('title');
        var key = current_abbr.lastChild.nodeValue;//获取abbr的文本内容
        defs[key] = attrTitle;
    }
    var dlist = document.createElement('dl');
    for(key in defs){
        var dtTitle = document.createElement('dt');
        var dtTitleText = document.createTextNode(key);
        dtTitle.appendChild(dtTitleText);
        var ddEsc = document.createElement('dd');
        var ddEscText = document.createTextNode(defs[key]);
        ddEsc.appendChild(ddEscText);
        dlist.appendChild(dtTitle);
        dlist.appendChild(ddEsc);
    }
    document.body.appendChild(dlist);
}