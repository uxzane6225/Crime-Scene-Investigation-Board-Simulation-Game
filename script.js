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
        "The victim, Mr. Anthony Delgado, was found dead inside his private study at Delgado Mansion late last night. The room was in disarray, with a broken vase lying near the body and furniture scattered across the floor. Investigators believe a struggle occurred shortly before the murder. Three suspects are being questioned: Michael Reyes, the victim's business partner; Sarah Cruz, the victim's personal assistant; and Daniel Santos, a neighbor who had frequent disputes with the victim. Your first task is to examine the crime scene and identify the most important piece of evidence.",
        "Fingerprints on a broken vase",
        "Family photograph",
        "TV remote control",
        "The killer accidentally left behind physical evidence during the struggle.",
        round2
    )
}

function round2(){
    rounds(
        "The forensic team confirms that the fingerprints found on the broken vase belong to one of the suspects. Investigators now focus on determining the motive behind the murder. A search of the victim's office reveals several personal and business documents. Among these documents may be the key to understanding who wanted the victim dead and why.",
        "Unpaid electric bill",
        "Grocery shopping list",
        "Business contract showing a financial dispute",
        "Look for evidence that reveals a strong reason to commit the crime.",
        round3,
        3
    )
}

function round3(){
    rounds(
        "After uncovering a possible motive, investigators gather additional evidence to place the suspect at the scene of the crime. Security cameras from nearby properties are reviewed. The footage covers the hours leading up to the murder and may reveal who visited the mansion shortly before the victim was killed.",
        "Weather report",
        "Security footage showing Michael Reyes entering the mansion",
        "Delivery receipt",
        "The final clue must prove the suspect was present near the crime scene.",
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