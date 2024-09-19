const startBtn = document.getElementById('start-btn');
const startPage = document.getElementById('start-page');
const dayCounter = document.getElementById('day-counter');
const salawat = document.getElementById('salawat');
const tasbihContainer = document.getElementById('tasbih-container');
const congrats = document.getElementById('congrats');
const startEnd = document.getElementById('start_end')

startBtn.addEventListener('click', function() {
    startPage.style.display = 'none';
    dayCounter.style.display = 'flex';
    salawat.style.display = 'block';
    tasbihContainer.style.display = 'flex';
});

startEnd.addEventListener('click', ()=>{
    congrats.style.display = 'none'
    startEnd.style.display = 'none'
})

let currentTasbih = parseInt(localStorage.getItem("tasbihCount")) || 0;
let currentDay = parseInt(localStorage.getItem("currentDay")) || 1;

document.getElementById('tasbih-count').textContent = `${currentTasbih}/10`;
updateDayCounter();

function saveTasbihCount() {
    localStorage.setItem("tasbihCount", currentTasbih);
}

function saveCurrentDay() {
    localStorage.setItem("currentDay", currentDay);
}

function countTasbih() {
    if (currentTasbih < 10) {
        currentTasbih++;
        document.getElementById('tasbih-count').textContent = `${currentTasbih}/10`;
        saveTasbihCount();

        if (currentTasbih === 10) {
            document.querySelector('.tasbih-btn').disabled = true;
            document.getElementById('congrats').style.display = 'block';
            alert('Жарайсың! Салауат 10/10 аяқталды!');
        }
    } else {
        alert('Тасбих саналды, келесі күнге дейін тасбих саналмайды.');
    }
}

function updateDayCounter() {
    for (let i = 1; i <= 7; i++) {
        const dayElement = document.getElementById(`day${i}`);
        if (i < currentDay) {
            dayElement.classList.add('completed');
        } else if (i === currentDay) {
            dayElement.classList.add('active');
        } else {
            dayElement.classList.remove('active');
            dayElement.classList.remove('completed');
        }
    }
}

function resetTasbih() {
    currentTasbih = 0;
    document.getElementById('tasbih-count').textContent = `${currentTasbih}/10`;
    saveTasbihCount();

    if (currentDay < 7) {
        currentDay++;
        updateDayCounter();
        saveCurrentDay();
        document.querySelector('.tasbih-btn').disabled = false;
        document.getElementById('congrats').style.display = 'none';
        alert('Келесі күнге өттіңіз. Тасбих санын қайта бастауға болады.');
    } else {
        alert('Жарайсың! 7 күнге тасбих толығымен аяқталды!');
    }
}

setInterval(function() {
    let now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetTasbih();
    }
}, 60000);