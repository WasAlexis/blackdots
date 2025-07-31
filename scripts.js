/* scripts */

class team {
    constructor(teamName) {
        this.teamName = teamName,
        this.score = [0],
        this.currentScore = 0
    }
}

const rightTeam = new team('right');
const leftTeam = new team('left');


const box = document.getElementById("box");
const leftSum = document.getElementById("sum-left");
const rightSum = document.getElementById("sum-right");

function addPoints(team) {
    let points = parseInt(box.value);
    if (Number.isNaN(points) || team == null || team.length == 0) {
        return;
    }

    if (team === rightTeam.teamName) {
        rightTeam.score.push(points);
        rightTeam.currentScore += points;
    } else {
        leftTeam.score.push(points);
        leftTeam.currentScore += points;
    }
    updateValues();
}

function updateValues() {
    leftSum.textContent = leftTeam.currentScore;
    rightSum.textContent = rightTeam.currentScore;
}