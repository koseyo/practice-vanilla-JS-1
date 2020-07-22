const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;



// create ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
};



// create paddle
const paddle = {
    x: canvas.width / 2 -40,
    y: canvas.height -20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
};



// create bricks
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
};

const bricks = [];
for(let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo }
    };
};



// draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
};



// draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
};



// draw score
function drawScore() {
    ctx.font = '16px Ariel';
    ctx.fillText(`スコア: ${score}`, canvas.width - 100, 30);
};



// draw bricks
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
};


// move paddle
function movePaddle() {
    paddle.x += paddle.dx;

    // wall detection
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}


// move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // wall collision
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // paddle collision
    if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }

    // brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w && ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h) {
                    ball.dy *= -1;
                    brick.visible = false;

                    increaseScore();
                }
            }
        });
    });


    // lose
    if(ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}


// increase score
function increaseScore() {
    score++;

    if(score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
    };
}


// show all bricks
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => brick.visible = true);
    })
}


// draw
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
};


// update canvas and animation
function update() {
    movePaddle();
    moveBall();

    // draw
    draw();

    requestAnimationFrame(update);
}

update();


// key down
function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

// key up
function keyUp(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
}


// keyboard event
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


// event listener
rulesBtn.addEventListener('click', () => rules.classList.toggle('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));