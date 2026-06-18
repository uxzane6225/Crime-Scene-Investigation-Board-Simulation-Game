const dialogue = document.getElementById('dialogue');
const board = document.getElementById('board');
const choices = document.getElementById('choices');

let startBtn = document.getElementById('startBtn').addEventListener('click', e => {
    e.target.remove();
    
    mainGame();
});


function mainGame() {
    rounds();
}


function rounds() {
    let selected = null;

    let p = document.createElement('p');
    p.classList.add('paragraph');
    p.innerHTML = "TESTING";
    dialogue.appendChild(p);

    let hint = document.createElement('p');
    hint.classList.add('hints');
    hint.innerHTML = "HINT TESTING";
    hintLog.appendChild(hint);

    let choice1 = document.createElement('p');
    choice1.classList.add('evidence');
    choice1.classList.add('correct');
    choice1.draggable = true;
    choice1.innerHTML = "CHOICE 1";
    choices.appendChild(choice1);

    let choice2 = document.createElement('p');
    choice2.classList.add('evidence');
    choice2.draggable = true;
    choice2.innerHTML = "CHOICE 2";
    choices.appendChild(choice2);

    let choice3 = document.createElement('p');
    choice3.classList.add('evidence');
    choice3.draggable = true;
    choice3.innerHTML = "CHOICE 3";
    choices.appendChild(choice3);

    let evidences = document.getElementsByClassName("evidence");

    for (const evidence of evidences) {
        evidence.addEventListener("dragstart", function (e) {
            selected = e.target;
        });
    }

    choices.addEventListener('dragover', e => {
        e.preventDefault();
    });

    choices.addEventListener('drop', e => {
        if (selected) {
            choices.appendChild(selected);
            selected = null;
        }
    });

    board.addEventListener('dragover', e => {
        e.preventDefault();
    });

    board.addEventListener('drop', e => {
        if (selected) {
            board.appendChild(selected);
            selected = null;
        }
    });
}