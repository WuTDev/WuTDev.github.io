// Movement Utility
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
// Movement Utility

// General Info
var gravity = 4;
var speed = 7;
var Jump = 20;


// Define what object is

var jumpSpeed = Jump;
var floorHeight = document.getElementById('floor').offsetHeight;
const playerHeight = document.getElementById('player-obj').offsetHeight;
const playerWidth = document.getElementById('player-obj').offsetWidth;
const stats = false;

// Commands
function resetPos() {
    document.getElementById("player-obj").style.top = '50%';
    document.getElementById("player-obj").style.left = '50%';
}
function ghost() {
    if(sessionStorage.getItem('playerRole') == 'admin'){
        document.getElementById('player-img').style.opacity = '1';
        sessionStorage.setItem('playerRole', '');
    }else{
        sessionStorage.setItem('playerRole', 'admin');
        document.getElementById('player-img').style.opacity = '0.3';
    }
}
// Commands

// Movement
window.addEventListener("keydown", (event) => {
    if (moveUp != true || sessionStorage.getItem('playerRole') == 'admin') {
        if (event.keyCode == 38) {
            if ($(window).height() - floorHeight <= parseInt($("#player-obj").offset().top) + playerHeight || sessionStorage.getItem('playerRole') == 'admin') {
                document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/jump.png')";
                moveUp = true;
                if (sessionStorage.getItem('playerRole') != 'admin') {
                    document.getElementById('jump-sound').play();
                }
                jumpSpeed = Jump;
            }
        }
    }
    if(event.key == 'ArrowLeft'){
        $("#player-img").addClass('look-left');
        var timestamp = new Date().getTime();
        if(moveUp == false && moveRight == false){
            document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/walk.gif')";
        }
        moveLeft = true;
    }
    if(event.key == 'ArrowRight'){
        $("#player-img").removeClass('look-left');
        var timestamp = new Date().getTime();
        if(moveUp == false && moveLeft == false){
            document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/walk.gif')";
        }
        moveRight = true;
    }
    if(event.key == 'ArrowDown'){
        moveDown = true;
    }
});
window.addEventListener("keyup", (event) => {
    if(event.key == 'Enter'){
        var command = document.getElementById('commands').value;
        if(command){
            if(command.toLowerCase().includes('/nick ')){
                var cmnd = command;
                var newNm = cmnd.toString().replace("/nick ","");
                document.getElementById('player-name').innerHTML = newNm;
            }
            if(command.toLowerCase().includes('/nickcolor ')){
                var tmp = command.replace('/nickcolor ', '');
                document.getElementById('player-name').style.color = tmp;
            }
            if(command.toLowerCase().includes('/speed ')){
                var tmp = command.replace('/speed ', '');
                speed = parseInt(tmp);
            }
            if(command.toLowerCase().includes('/gravity ')){
                var tmp = command.replace('/gravity ', '');
                gravity = parseInt(tmp);
            }
            if(command.includes('/opacity ')){
                var tmp = command.replace('/opacity ');
                $('#player-img').css('opacity', tmp);
            }
            switch(command.toLowerCase()){
                case '/ghost':
                    ghost();
                break;
                case '/resetpos':
                    resetPos();
                break;
                case '/showinp':
                    $("#commands").css('opacity','1');
                break;
                case '/hideinp':
                    $("#commands").css('opacity','0');
                break;
                case '/mush':
                    document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/mush.png')";
                    break;
                case '/hidenick':
                    $('#player-name').toggleClass('d-none');
                break;
                case '/hidden':
                    if($("#player-img").hasClass('d-none')){
                        $("#player-img").removeClass('d-none');
                        $('#player-name').removeClass('d-none');
                    }else{
                    $("#player-img").addClass('d-none');
                    $('#player-name').addClass('d-none');
                    }
                    break;
            }
            if(!command.includes('/')){
                $("#chat").css('display','block');
                var msgid = Math.random();
                var chat = document.getElementById("chat");
                $('<li id='+msgid+'>' + command + '</li>').hide().appendTo('ul.chat').slideDown('fast');
                if(chat.children.length > 2){
                    chat.firstChild.textContent = '';
                }
                var lng = chat.innerHTML.toString().length;
                if(lng < 50){
                    chat.style.marginTop = '-35px';
                }else if (lng < 80){
                    chat.style.marginTop = '-45px';
                }else if(lng < 120){
                    chat.style.marginTop = '-75px';
                }else if(lng < 180){
                    chat.style.marginTop = '-90px';
                }else if(lng < 230){
                    chat.style.marginTop = '-125px';
                }else{
                    chat.style.marginTop = '-170px';
                }
                setTimeout(() => {
                    document.getElementById(msgid).remove();
                    if(lng < 30){
                        chat.style.marginTop = '-30px';
                    }else if (lng < 80){
                        chat.style.marginTop = '-60px';
                    }else if(lng < 120){
                        chat.style.marginTop = '-95px';
                    }else if(lng < 180){
                        chat.style.marginTop = '-110px';
                    }else if(lng < 230){
                        chat.style.marginTop = '-130px';
                    }else{
                        chat.style.marginTop = '-180px';
                    }
                }, command.toString().length * 500);
            }
            document.getElementById('commands').value = '';
            document.getElementById('commands').blur();
        }
    }
    if(event.keyCode == 191){
        document.getElementById('commands').focus();
        document.getElementById('commands').value = '/';
    }
    if(event.key == 'ArrowLeft'){
        moveLeft = false;
        document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/stand.png')";
    }
    if(event.key == 'ArrowUp'){
        moveUp = false;
        if(moveLeft == false && moveRight == false){
            document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/stand.png')";
        }else{
            document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/walk.gif')";
        }
    }
    if(event.key == 'ArrowRight'){
        moveRight = false;
        document.getElementById('player-img').style.backgroundImage = "url('./assets/images/player/stand.png')";
    }
    if(event.key == 'ArrowDown'){
        moveDown = false;
    }
});
window.addEventListener('keypress', (event) =>{
    if(event.key == 'Enter'){
        document.getElementById("commands").focus();
    }
})
// Movement

// In case of portrait
function validatePhone() {
    if ($(window).width() < $(window).height()) {
        $("#validate-phone").removeClass("d-none");
        return false;
    } else {
        $("#validate-phone").addClass("d-none");
        return true;
    }
}
// In case of portrait

// Movement Modifier
$(document).ready(function () {
    if (sessionStorage.getItem('playerRole') == 'admin') {
        document.getElementById('player-img').style.opacity = '0.3';
    }
    validatePhone();
    setInterval(timer, 10);
});
// Movement Modifier

// Repeated each 10 ms
function timer() {
    var checked = validatePhone();
    var currPlayer = document.getElementById("player-obj");
    if(stats == true){
        document.getElementById('playerHeight').innerHTML = playerHeight;
        document.getElementById('playerWidth').innerHTML = playerWidth;
        document.getElementById('windowHeight').innerHTML = $(window).height();
        document.getElementById('windowWidth').innerHTML = $(window).width();
        document.getElementById('floorHeight').innerHTML = floorHeight;
        document.getElementById('speed').innerHTML = speed;
        document.getElementById('playerTop').innerHTML = $("#player-obj").offset().top;
        document.getElementById('playerLeft').innerHTML = $("#player-obj").offset().left;
    }
    if (checked === false) {
        return null;
    }

    if (($(window).height() - floorHeight > $("#player-obj").offset().top + playerHeight ||  $("#player-obj").offset().top + playerHeight < ($('.object').height() + $('.object').offset().bottom) - $(window).height())  
    && sessionStorage.getItem('playerRole') != 'admin') {
        for(var i = 2; i < gravity; i++){
            currPlayer.style.top = ($("#player-obj").offset().top + i) + 'px';
        }
    }
    if (moveRight) {
        if ($(window).width() > $("#player-obj").offset().left + playerWidth || sessionStorage.getItem('playerRole') == 'admin') {
            currPlayer.style.left = ($("#player-obj").offset().left+ speed) + 'px';
        }
    }
    if (moveLeft) {
        if ($("#player-obj").offset().left > 0 || sessionStorage.getItem('playerRole') == 'admin') {
            currPlayer.style.left = ($("#player-obj").offset().left - speed) + 'px';
        }
    }
    if (moveUp) {
        if ($("#player-obj").offset().top > 0 || sessionStorage.getItem('playerRole') == 'admin') {
            currPlayer.style.top = ($("#player-obj").offset().top - jumpSpeed) + 'px';
            if (jumpSpeed > 0) {
                    jumpSpeed -= 1;
            }
        }
    }
    if (moveDown) {
        if (
        ($(window).height() - floorHeight > $("#player-obj").offset().top + playerHeight || 
        $("#player-obj").offset().top + playerHeight < ($('.object').height() + $('.object').offset().bottom) - $(window).height())
         || sessionStorage.getItem('playerRole') == 'admin') {
            currPlayer.style.top = ($("#player-obj").offset().top + speed) + 'px';
        }
    }
}
// Repeated each 10 ms