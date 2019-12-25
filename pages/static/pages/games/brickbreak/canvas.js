// import Paddle from './paddle';
// import Ball from './ball';
// import Brick from './brick';


var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');


const LEVEL1 = [
    [0,0,0,1,0,1,0,1,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1]
];


function Ball(x, y) {
    this.position = {
        x: x,
        y: y        
    };

    this.radius = 15;

    this.dx = 5;
    this.dy = 5;
    
    this._edges = function() {
        this.edges = {
            top: this.position.y - this.radius,
            left: this.position.x,
            right: this.position.x + this.radius,
            bottom: this.position.y + this.radius
        }
    }
    this._edges();

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = 'red';
        ctx.stroke();       
    }

    this.reset = function() {
        this.dx = 5;
        this.dy = 5;
        this.position.x = 250;
        this.position.y = 350;
    }

    this.collision = function(object) {
        let topObject = object.position.y;
        let leftObject = object.position.x;
        let rightObject = object.position.x + object.width;
        let bottomObject = object.position.y + object.height;

        if (this.edges.bottom >= topObject
            && this.edges.left >= leftObject
            && this.edges.right <= rightObject
            && this.edges.top <= bottomObject) {
                return true;
        }return false;
    }

    this.update = (game, paddle, bricks) => {
        if (this.position.x + this.radius >= innerWidth || this.position.x - this.radius < 0){
            this.dx = -this.dx;
        }if (this.position.y - this.radius < 0){
            this.dy = -this.dy;
        }if (this.position.y + this.radius >= innerHeight) {
            game.lives -= 1;
            this.reset();
            paddle.reset();
        }

        if (this.collision(paddle)) {
            this.dy = -this.dy;
            this.position.y = paddle.position.y - this.radius;
        }

        for (let i = 0; i < bricks.length; i++) {
            if (bricks[i]) {
                if (this.collision(bricks[i]) && !bricks[i].deleted){
                    let b_collision = bricks[i].edges.bottom - this.position.y;
                    let t_collision = this.edges.bottom - bricks[i].position.y;
                    let l_collision = this.edges.right - bricks[i].position.x;
                    let r_collision = bricks[i].edges.right - this.position.x;
                    if ((l_collision <= r_collision && l_collision <= t_collision && l_collision <= b_collision) ||
                        (r_collision <= l_collision && r_collision <= t_collision && r_collision <= b_collision ))
                    {
                        this.dx = -this.dx;
                    }else{this.dy = -this.dy;}
                    
                    bricks[i].delete();
                    game.count -= 1;
                }
            }
        }

        this.position.x += this.dx;
        this.position.y += this.dy;
        this._edges()
    }
}


function Paddle() {
    this.width = 200;
    this.height = 20;
    this.position = {
        x: innerWidth/2 - this.width/2,
        y: innerHeight - this.height -20
    };

    this.dx = 0;
    this.lastSpeed = this.dx;

    this.draw = function(){
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = 'blue';
        ctx.fill();
    }
    
    this.moveLeft = function(game){
        if (!game.is_paused()&&game.started){
            this.dx = -7;
            this.lastSpeed = this.dx;
            this.update();
        }

    }
    
    this.moveRight = function(game){
        if (!game.is_paused()&&game.started){
            this.dx = 7;
            this.lastSpeed = this.dx;
            this.update();
        }

    }
    
    this.stop = function(){
        if (this.dx != 0) {this.dx = 0}
        else {this.dx = this.lastSpeed}
        this.update()
    }

    this.reset = function(){
        this.position.x = innerWidth/2 - this.width/2;
        this.position.y = innerHeight - this.height - 20;
        this.dx = 0;
    }

    this.update = function(){
        if (this.position.x <= 0 || this.position.x + this.width >= innerWidth){
            this.dx = -this.dx;
        }
        this.position.x += this.dx;
    }
    
}

function Brick(x, y) {
    this.position = {
        x: x,
        y: y
    };
    this.image = new Image();
    this.image.src = "images/brick.png"
    this.width = innerWidth / 10;
    this.height = 52;
    this.deleted = false;

    this.delete = function() {
        this.deleted = true;
    }
    
    this.edges = {
        top: this.position.y,
        left: this.position.x,
        right: this.position.x + this.width,
        bottom: this.position.y + this.height
    };

    this.draw = function() {
        if (!this.deleted) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }
}

window.addEventListener('keydown', move = (event) => {
    switch(event.keyCode){
        case 16:
            game.start();
            break;
        case 32:
            game.paddle.stop();
            break;
        case 37:
            game.paddle.moveLeft(game);
            break;
        case 39:
            game.paddle.moveRight(game);    
            break;
        case 80:
            game.pauseGame();
            break;
        case 81:
            game.restart();
            break;
    }
    event.preventDefault();
});


class Game {
    constructor(level) {
        this.ball = new Ball(250, 350);
        this.paddle = new Paddle();
        this.bricks = [];
        this.lives = 3;
        this.level = 1;

        for (let i = 0; i < LEVEL1.length; i++){
            let row = LEVEL1[i];
            for (let j = 0; j < row.length; j++){
                if (row[j] == 1){
                    this.bricks.push(new Brick(((j*innerWidth/10) < innerWidth ? innerWidth/10: innerWidth-x)* j,
                     75+52*i));
                }
            }
        }

        this.count = this.bricks.length;
 
        this.paused = false;
        this.started = false;
        this.gameOver = false;
    }

    start() {
        this.started = true;
    }

    restart() {
        if (this.paused) {
            this.paused = false;
        }
        this.gameOver = false;
        this.lives = 3;
        this.started = false;
        this.ball.reset();
        this.paddle.reset();
        
        for (let i = 0; i < this.bricks.length; i++) {
            if (this.bricks[i].deleted){
                this.bricks[i].deleted = false;
            }
        }
        this.count = this.bricks.length;
        this.draw();
    }

    draw() {
        if (this.lives == 0 || this.count == 0){
            this.gameOver = true;
        }
        if (this.started) {
            ctx.rect(0,0,innerWidth,innerHeight);
            ctx.fillStyle = "black";
            ctx.fill();
            
            if (!this.gameOver){
                ctx.font = '30px Arial';
                ctx.fillStyle = 'red';
                ctx.fillText("Lives: "+this.lives, 75, 30);
                this.ball.draw();
                this.paddle.draw();
                for (let i = 0; i < this.bricks.length; i++) {
                    if (!this.bricks[i].deleted){
                        this.bricks[i].draw();
                    }
                }
            }else {
                if (this.lives == 0){
                    let img = new Image();
                    img.src = 'images/gameOver.png'
                    ctx.drawImage(img, 0, 0, img.width,img.height, 0, 0, innerWidth, innerHeight);
                }else if (this.count == 0){
                    let img = new Image();
                    img.src = 'images/victory.png'
                    ctx.drawImage(img, 0, 0, img.width,img.height, 0, 0, innerWidth, innerHeight);
                }
                
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                if (this.lives == 0){
                    ctx.fillStyle = "red";
                    ctx.fillText("GAME OVER", innerWidth/2, innerHeight/2);
                    ctx.fillText("Q to start over",innerWidth/2, innerHeight/2 + 30);
                }else if (this.count == 0){
                    ctx.fillStyle = "white";
                    ctx.fillText("You Win!!", innerWidth/2, 60);
                    ctx.fillText("Q to play again",innerWidth/2, 90);
                }

            }
            
            if (this.paused) {
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Paused", innerWidth/2, innerHeight/2);
            }
        }else {
            let img = new Image();
            img.src = 'images/screen.png'
            ctx.drawImage(img, 0, 0, img.width,img.height, 0, 0, innerWidth, innerHeight);

            ctx.font = "30px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Press Shift to Play!", innerWidth/2, innerHeight/2);
            ctx.fillText("P to pause",innerWidth/2, innerHeight/2 + 30);
        }

    }

    update() {  
        this.ball.update(this, this.paddle, this.bricks);
        this.paddle.update();
        for (let i = 0; i < this.bricks.length; i++) {
            this.bricks[i].draw();
        }
    }

    pauseGame() {
        this.started ? (this.paused ? this.paused=false: this.paused=true): this.paused=false;
    }

    is_paused() {
        return this.paused;
    }

    started_game() {
        return this.started;
    }
}

function play() {
    requestAnimationFrame(play);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    if (game.started_game()) {
        if (!game.is_paused() && !game.gameOver) {
            game.update();
        }
    }
    game.draw();
}

let game = new Game(LEVEL1);
play();



