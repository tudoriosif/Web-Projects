// CONST
const playBtn = document.getElementById('play-btn');
const menuBackground = document.getElementById('background-play');
const gameBackground = document.getElementById('background-pink');
const heroText = document.getElementById('hero-text');
const btnContainer = document.getElementById('button-container');

playBtn.addEventListener('click', () => {

    if(!menuBackground.classList.contains('hide')){
        changeClassList(menuBackground, 'hide', 'show');
        changeClassList(gameBackground, 'show', 'hide');
        changeClassList(heroText,'hide','');
        changeClassList(btnContainer,'hide','');
    }else{
        changeClassList(menuBackground, 'show', 'hide');
        changeClassList(gameBackground, 'hide', 'show');
        changeClassList(heroText, '', 'hide');
        changeClassList(btnContainer, '', 'hide');
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
    if(element.classList.contains(removeClass) && removeClass !=='')
        element.classList.remove(removeClass);
    if(!element.classList.contains(addClass) && addClass !== '')
        element.classList.add(addClass);
}
