/* scripts */

class team {
    constructor(teamName) {
        this.teamName = teamName,
        this.score = [],
        this.currentScore = 0
    }
}

let rightTeam = new team('right');
let leftTeam = new team('left');


const box = document.getElementById("box");
const leftSum = document.getElementById("sum-left");
const rightSum = document.getElementById("sum-right");
const historyLeft = document.getElementById("left-team");
const historyRight = document.getElementById("right-team");

function loadPreviousGame() {
    rightTeam = JSON.parse(localStorage.getItem('right-team'));
    leftTeam = JSON.parse(localStorage.getItem('left-team'));
    rightTeam.score.map(points => addHistory('right', points));
    leftTeam.score.map(points => addHistory('left', points));
    updateValues();
}

function isGameSaved() {
    const savedRightTeam = localStorage.getItem('right-team');
    const savedLeftTeam = localStorage.getItem('left-team');

    if (savedLeftTeam == '' || savedLeftTeam == null || savedRightTeam == '' || savedRightTeam == null) {
        return;
    }
    loadPreviousGame();
}

isGameSaved();

function addHistory(team, points) {
    let node = document.createElement('span');
    node.textContent = points;
    if (team == leftTeam.teamName) {
        if (historyLeft.hasChildNodes()) {
            historyLeft.insertBefore(node, historyLeft.firstChild);
        } else {
            historyLeft.appendChild(node);
        }
    } else {
        if (historyRight.hasChildNodes()) {
            historyRight.insertBefore(node, historyRight.firstChild);
        } else {
            historyRight.appendChild(node);
        }
    }
}

function addPoints(team) {
    let points = parseInt(box.value);
    box.value = '';
    if (Number.isNaN(points) || team == null || team.length == 0) {
        return;
    }

    addHistory(team, points);
    
    if (team === rightTeam.teamName) {
        rightTeam.score.push(points);
        rightTeam.currentScore += points;
    } else {
        leftTeam.score.push(points);
        leftTeam.currentScore += points;
    }
    saveToLocalStorage();
    updateValues();
}

function updateValues() {
    leftSum.textContent = leftTeam.currentScore;
    rightSum.textContent = rightTeam.currentScore;
}

function saveToLocalStorage() {
    localStorage.setItem('left-team', JSON.stringify(leftTeam));
    localStorage.setItem('right-team', JSON.stringify(rightTeam));
}

function resetGame() {
    localStorage.clear();
    rightTeam = new team('right');
    leftTeam = new team('left');
    historyRight.innerHTML = '';
    historyLeft.innerHTML = '';
    updateValues();
}