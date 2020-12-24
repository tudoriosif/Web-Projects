const API_URL = "https://api.quotable.io/random";
const quoteDisplayEl = document.getElementById("quote-display");
const quoteInputEl = document.getElementById("quote-input");
const timerEl = document.getElementById("timer");

document.addEventListener('keyup', ev => {
  if(ev.key === 'Enter'){
    renderNewQuote();
  }
});

quoteInputEl.addEventListener("input", () => {
    const arrQuote = quoteDisplayEl.querySelectorAll('span');
    const arrValue = quoteInputEl.value.split('');
    let correct = true;
    arrQuote.forEach((charSpan, index) => { 
        const ch = arrValue[index];
        if(ch == null){
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct = false;
        }
        else if(ch === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        }
        else{
            charSpan.classList.remove('correct'); 
            charSpan.classList.add('incorrect');   
            correct = false;        
        }
    });
    if(correct){
        renderNewQuote();
    }
});

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getQuote() {
  return fetch(API_URL)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => data.content)
    .catch((error) => console.log(error));
}

async function renderNewQuote() {
  const quote = await getQuote();
  quoteDisplayEl.innerHTML = "";
  quote.split("").forEach((ch) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = ch;
    quoteDisplayEl.appendChild(charSpan);
  });
  quoteInputEl.value = null;
  startTimer();
}
let startTime;
function startTimer(){
    timerEl.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();
