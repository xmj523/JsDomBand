function showSection(id){
    var divs = document.getElementsByClassName('section');
    for(var i=0;i<divs.length;i++){
        if(divs[i].getAttribute('id') != id){
            divs[i].style.display = 'none';
        }else{
            divs[i].style.display = 'block';
        }
    }
}

function prepareInternalNav() {
    if(!document.getElementById || !document.getElementsByClassName || !document.getElementsByTagName || !document.getElementById('internalnav')) return false;

    var links = document.getElementById('internalnav').getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        var sectionId = links[i].getAttribute('href').split('#')[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = 'none';
        links[i].destination = sectionId;
        links[i].onclick = function (ev) {
            showSection(this.destination);
            return false;
        }
    }
}

addLoadEvent(prepareInternalNav);