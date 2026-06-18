const dialogue = document.getElementById('dialogue');
const board = document.getElementById('board');
const choices = document.getElementById('choices');
const check = document.getElementById('check');
let score = 0;
let startBtn = document.getElementById('startBtn').addEventListener('click', e => {
    e.target.remove();
    
    mainGame();
});


function mainGame() {
    rounds("This is where the dialogue will be. The dialogue consists of a scenario riddled with hints", "This is the first choice", "This is the second choice", "This is the third choice", "This is a hint, telling you what to find.");
}


function rounds(paragraph, first, second, third, hints) {
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
    choice1.classList.add('correct');
    choice1.draggable = true;
    choice1.innerHTML = first;
    choices.appendChild(choice1);

    let choice2 = document.createElement('p');
    choice2.classList.add('evidence');
    choice2.classList.add('wrong');
    choice2.draggable = true;
    choice2.innerHTML = second;
    choices.appendChild(choice2);

    let choice3 = document.createElement('p');
    choice3.classList.add('evidence');
    choice3.classList.add('wrong');
    choice3.draggable = true;
    choice3.innerHTML = third;
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

    check.addEventListener('click', e => {
        
        
        let correctEvidence = [];
        let incorrectEvidence = [];

        board.childNodes.forEach(children => {
            //childList.push(children);

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

            // for (let i = 0; i < correctEvidence.length; i++) {
            //     console.log(correctEvidence[i]);
            // }

            // for (let i = 0; i < incorrectEvidence.length; i++) {
            //     console.log(incorrectEvidence[i]);
            // }
        });
        console.log(correctEvidence.length);
        console.log(incorrectEvidence.length);

        if (correctEvidence.length > 0) {
            if (incorrectEvidence.length > 1) {
                console.log('+1');
            }
            else if (incorrectEvidence.length > 0) {
                console.log('+3');
            }
            else {
                console.log('+5');
            }
        }
        else {
            console.log('try again');
        }

        // for (let i = 0; i < childList.length; i++ ) {
        //     console.log(childList);
        // }

        
        //const p = board.closest('p');
        //if (!p) return;

        // board.childNodes.forEach(children => {
        //     console.log(children.classList.contains('correct'));
        // });

        //const classes = document.getElementsByClassName('correct');
         



        
        // let childNodes = [];
        
        // let boardChild = board.childNodes;

        // boardChild.forEach(children => {
        //     console.log(children);
        //     console.log(children.classList);

            
        //     let childClasses = children.classList;
        //     console.log(childClasses);

        //     if (childClasses.contains('correct')) {
        //         console.log('correct');
        //     }
        //     else {
        //         console.log('incorrect');
        //     }
        //     // childClasses.forEach(classes => {
        //     //     console.log(classes);
        //     // });
        //     // if (children.classList.contains('correct')) {
        //     //     console.log('correct');
        //     // }
        //     // else {
        //     //     console.log('incorrect');
        //     // }
        // });
    });
}

console.log('other unrelated change');