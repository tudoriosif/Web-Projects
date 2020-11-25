const body = document.getElementById("body");
var index = 0;


body.addEventListener("mouseover", () =>{
    setTimeout(() => {
        console.log(index);
        changeBackground(index);
        index = index+1;
    }, 4000);
});

function changeBackground(index){
    index = index%4 + 1;
    body.style.backgroundImage = `url(assets/bkg${index}.jpg)`;
}
