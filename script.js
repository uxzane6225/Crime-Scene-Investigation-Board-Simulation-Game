const dialogue = document.getElementById('dialogue');
const board = document.getElementById('board');
const choices = document.getElementById('choices');
const check = document.getElementById('check');
let score = 0;
let current = null;


let startBtn = document.getElementById('startBtn').addEventListener('click', e => {
    //e.target.remove();
    e.target.style.display = "none";
    mainGame();
});


function mainGame() {
    rounds(
        "This is where the dialogue will be. The dialogue consists of a scenario riddled with hints",
        "This is the first choice",
        "This is the second choice",
        "This is the third choice",
        "This is a hint, telling you what to find.",
        round2
    )
}

function round2(){
    rounds(
        "This is where the dialogue will be. The dialogue consists of a scenario riddled with hints",
        "This is the first choice",
        "This is the second choice",
        "This is the third choice",
        "This is a hint, telling you what to find.",
        round3,
        3
    )
}

function round3(){
    rounds(
        "This is where the dialogue will be. The dialogue consists of a scenario riddled with hints",
        "This is the first choice",
        "This is the second choice",
        "This is the third choice",
        "This is a hint, telling you what to find.",
        null,
        2
    )
}


function rounds(paragraph, first, second, third, hints, nextRound, correctIndex = 1) {
    let selected = null;

    let p = document.createElement('p');
    p.classList.add('paragraph');
    p.innerHTML = paragraph;
    dialogue.appendChild(p);

    let hint = document.createElement('p');
    hint.classList.add('hints');
    hint.innerHTML = hints;
    hintLog.appendChild(hint);

    let choice1 = document.createElement('p');
    choice1.classList.add('evidence');
    choice1.classList.add(correctIndex === 1 ? 'correct' : 'wrong');
    choice1.draggable = true;
    choice1.innerHTML = first;
    choices.appendChild(choice1);

    let choice2 = document.createElement('p');
    choice2.classList.add('evidence');
    choice2.classList.add(correctIndex === 2 ? 'correct' : 'wrong');
    choice2.draggable = true;
    choice2.innerHTML = second;
    choices.appendChild(choice2);

    let choice3 = document.createElement('p');
    choice3.classList.add('evidence');
    choice3.classList.add(correctIndex === 3 ? 'correct' : 'wrong');
    choice3.draggable = true;
    choice3.innerHTML = third;
    choices.appendChild(choice3);

    let evidences = document.getElementsByClassName("evidence");

    for (const evidence of evidences) {
        evidence.addEventListener("dragstart", function (e) {
            selected = e.target;
        });
    }

    current = { p, hint, choice1, choice2, choice3, nextRound}

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

    check.addEventListener('click', e => {
        
        
        let correctEvidence = [];
        let incorrectEvidence = [];

        board.childNodes.forEach(children => {
            if (children.classList == null) {
                console.log('none');
            }
            else {
                if (children.classList.contains('correct')) {
                    console.log('correct');
                    correctEvidence.push(children);
                }
                else {
                    console.log('incorrect');
                    incorrectEvidence.push(children);
                }
            }
        });

        console.log(correctEvidence.length);
        console.log(incorrectEvidence.length);

        if (correctEvidence.length > 0) {
            current.p.remove();
            current.hint.remove();
            current.choice1.remove();
            current.choice2.remove();
            current.choice3.remove();
            board.innerHTML = '';

            let continueBtn = document.createElement('button');
            continueBtn.id = 'continueBtnBtn';
            continueBtn.classList.add('btnClass');
            continueBtn.innerHTML = "Continue";
            dialogue.appendChild(continueBtn);

            continueBtn.addEventListener('click', () => {
                continueBtn.remove();
                if (current.nextRound){
                    current.nextRound();
                } else {
                    dialogue.innerHTML = '';
                    let done = document.createElement('p');
                    done.classList.add('paragraph');
                    done.innerHTML = `Investigation complete! Final score: ${score}`;
                    dialogue.appendChild(done);
                }
            });



            if (incorrectEvidence.length > 1) {
                alert('+1');
                score += 1;
                return true;
            }
            else if (incorrectEvidence.length > 0) {
                alert('+3');
                score += 3;
                return true;
            }
            else {
                alert('+5');
                score += 5;
                return true;
            }
        }
        else {
            return false;
        }
        
    });
}