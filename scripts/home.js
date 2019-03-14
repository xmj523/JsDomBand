/*滑过切换缩略图（精灵图）--js动画实现*/
function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById || !document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    /* 当鼠标在切换元素之前快速划过时，会导致动画效果混乱
     * 因此，为了便于检查当前元素上是否已有动画，将动画绑定到该元素上，
     * 如果已有动画，就清除该动画，重新绑定新动画*/
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    /* 检测要移动的元素当前的位置，若它无left或top属性，则为其初始化 */
    if(!elem.style.left){
        elem.style.left = '0px';
    }
    if(!elem.style.top){
        elem.style.top = '0px';
    }
    var xPos = parseInt(elem.style.left);
    var yPos = parseInt(elem.style.top);
    /*if(xPos == final_x && yPos == final_y){
        return true;
    }
    if(xPos < final_x){
        var dist = Math.ceil((final_x - xPos)/10);
        xPos += dist;
    }
    if(xPos > final_x){
        var dist = Math.ceil((xPos - final_x)/10);
        xPos -= dist;
    }
    if(yPos < final_y){
        var dist = Math.ceil((final_y - yPos)/10);
        yPos += dist;
    }
    if(yPos > final_y){
        var dist = Math.ceil((yPos - final_y)/10);
        yPos -= dist;
    }*/
    if(xPos != final_x){
        var dist = Math.ceil((final_x - xPos)/10);
        xPos += dist;
    }
    if(yPos != final_y){
        var dist = Math.ceil((final_y - yPos)/10);
        yPos += dist;
    }
    elem.style.left = xPos + 'px';
    elem.style.top = yPos + 'px';
    //递归调用
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideShow() {
    if(!document.getElementById || !document.getElementsByTagName || !document.createElement || !document.getElementById('intro')) return false;
    //创建元素
    var intro = document.getElementById('intro');
    var slideShow = document.createElement('div');
    slideShow.setAttribute('id','slideshow');
    //添加圆角图片
    var frame = document.createElement('img');
    frame.setAttribute('src','images/frame.gif');
    frame.setAttribute('alt','');
    frame.setAttribute('id','frame');
    slideShow.appendChild(frame);
    var preview = document.createElement('img');
    preview.setAttribute('src','images/slideshow.gif');
    preview.setAttribute('alt','a glimpse of what awaits you');
    preview.setAttribute('id','preview');
    slideShow.appendChild(preview);
    insertAfter(slideShow,intro);
    //绑定函数
    var links = document.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        links[i].onmouseover = function(){
            var destination = this.getAttribute('href');
            if(destination.indexOf('index.html') != -1){
                moveElement('preview',0,0,5);
            }
            if(destination.indexOf('about.html') != -1){
                moveElement('preview',-150,0,5);
            }
            if(destination.indexOf('photos.html') != -1){
                moveElement('preview',-300,0,5);
            }
            if(destination.indexOf('live.html') != -1){
                moveElement('preview',-450,0,5);
            }
            if(destination.indexOf('contact.html') != -1){
                moveElement('preview',-600,0,5);
            }
        }
    }
}
addLoadEvent(prepareSlideShow);
