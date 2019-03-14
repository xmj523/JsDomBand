/* 当点击带有for属性的label时，自动聚焦到id值为该属性值的input标签上
 * 默认情况下，浏览器会自动关联该操作，此函数只预防部分不支持的浏览器 */
function focusLabels() {
    if(!document.getElementsByTagName || !document.getElementById) return false;
    var labels = document.getElementsByTagName('label');
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute('for')) continue;
        labels[i].onclick = function (ev) {
            var id = this.getAttribute('for');
            if(!document.getElementById(id)) return false;
            var elem = document.getElementById(id);
            elem.focus();
        }
    }
}

addLoadEvent(focusLabels);

/* 对于页面中的输入框，在聚焦时清除原始值，失去焦点且输入为空时，恢复原始值
 * 利用HTML-DOM中的Form对象实现(文档里的每个form元素都是一个Form类型的对象)
 * 同一表单里的所有表单字段构成了与这个表单相对应的那个Form对象的element属性，
 * 这个属性其实是一个包含着所有表单与元素的数组：form .elements */
function resetFields(whichForm) {
    for(var i=0;i<whichForm.elements.length;i++){
        var elem = whichForm.elements[i];
        if(elem.type == 'submit') continue;
        elem.onfocus = function(){
            if(this.value == this.defaultValue){
                this.value = '';
            }
        };
        elem.onblur = function () {
            if(this.value == ""){
                this.value = this.defaultValue;
            }
        };
    }
}
/* 遍历所有表单，调用resetFields函数 */
function prepareForms(){
    for(var i=0;i<document.forms.length;i++){
        var thisform = document.forms[i];
        resetFields(thisform);
    }
}
addLoadEvent(prepareForms);

/* 验证必填 */
function isFilled(field) {
    if(field.value.length < 1 || (field.value == field.defaultValue)){
        return false;
    }else{
        return true;
    }
}
/* 验证邮箱 */
function isEmail(field) {
    if(field.value.indexOf('@') == -1 || (field.value.indexOf('.') == -1)){
        return false;
    }else{
        return true;
    }
}

/* 提交时检查数据的合法性(1.糟糕的表单检查不如不检查；2.不管有没有进行客户端的检查，服务器端都要做验证) */
function validateForm(whichForm) {
    for(var i=0;i<whichForm.elements.length;i++){
        var elem = whichForm.elements[i];
        if(elem.className.indexOf('required') != -1){
            if(!isFilled(elem)){
                alert('Please fill in the ' + elem.name + " field.");
                return false;
            }
        }
        if(elem.className.indexOf('email') != -1){
            if(!isEmail(elem)){
                alert('The ' + elem.name + "field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}