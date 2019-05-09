var xhr = new XMLHttpRequest();
xhr.open('GET', "playerinfo.json", true);
xhr.responseType = 'text';
xhr.send();

xhr.onload - function(){
    if(xhr.status===200){
        var playerInfo = JSON.parse(xhr.responseText);
        console.log(playerInfo);
    }
}