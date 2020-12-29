// CONST
const playBtn = document.getElementById('play-btn');
const menuBackground = document.getElementById('background-play');
const gameBackground = document.getElementById('background-pink');


playBtn.addEventListener('click', () => {

    if(!menuBackground.classList.contains('hide')){
        changeClassList(menuBackground, 'hide', 'show');
        changeClassList(gameBackground, 'show', 'hide');
    }else{
        changeClassList(menuBackground, 'show', 'hide');
        changeClassList(gameBackground, 'hide', 'show');
    }
    restartAnimation(gameBackground, 1200);
    restartAnimation(menuBackground, 1200);
});

function restartAnimation(element, animationTime) {
    element.style.animation = "";
    setTimeout(() => {
        element.style.animation = "none";
    }, animationTime);
}

function changeClassList(element, addClass, removeClass){
    element.classList.remove(removeClass);
    element.classList.add(addClass);
}
