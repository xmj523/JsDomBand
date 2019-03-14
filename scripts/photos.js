function showPic(whichpic){
    if(!document.getElementById('placeholer')) return true;//检查占位元素是否存在，不存在则
    var source = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholer');
    placeholder.setAttribute('src',source);
    if(!document.getElementById('description')) return false;
    if(whichpic.getAttribute('title')){
        var text = whichpic.getAttribute('title');
    }else{
        var text = '';
    }
    var description = document.getElementById('description');
    if(description.firstChild.nodeType == 3){
        description.childNodes[0].nodeValue = text;
    }
    return false;
}

function preparePlaceholder(){
    //检测
    if(!document.createElement || !document.createTextNode
        || !document.getElementById || !document.getElementById('imageGallery')) return false;

    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholer');
    placeholder.setAttribute('src','images/placeholder.gif');
    placeholder.setAttribute('alt','my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var descText = document.createTextNode('Choose an image');
    description.appendChild(descText);
    var gallery = document.getElementById('imageGallery');
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepareGallery() {
    if(!document.getElementById || !document.getElementsByTagName || !document.getElementById('imageGallery')) return false;
    var eleImgs = document.getElementById('imageGallery').getElementsByTagName('a');
    for(var i=0;i<eleImgs.length;i++){
        eleImgs[i].onclick = function () {
            return showPic(this);
        };
    }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);