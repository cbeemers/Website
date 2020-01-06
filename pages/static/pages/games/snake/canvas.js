

var canvas = document.querySelector('canvas');
const WIDTH = canvas.width = innerWidth - innerWidth%20;
const HEIGHT = canvas.height = innerHeight - innerHeight%20 - 40;
var ctx = canvas.getContext('2d');
var scl = 20;
const rows = HEIGHT / scl;
const cols = WIDTH / scl;


window.addEventListener('keydown', move = (event) => {
    switch(event.keyCode){
        case 16:
            game.start();
            break;
        case 37:
            game.snake.moveLeft(game);
            break;
        case 38:
            game.snake.moveUp(game);
            break;
        case 39:
            game.snake.moveRight(game);    
            break;
        case 40:
            game.snake.moveDown(game);
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

class Food {
    constructor(){
        
        this.width = 20;
        this.height = 20;
        this.position = {
            
            x: Math.floor(Math.random() * Math.floor(cols))*scl,
            y: Math.floor(Math.random() * Math.floor(rows))*scl
        
        }
        
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
    update() {

        this.position.x = Math.floor(Math.random() * Math.floor(cols))*scl;
        this.position.y = Math.floor(Math.random() * Math.floor(rows))*scl;    

    }
}

class Snake {
    constructor(){
        this.position = {
            x: 200,
            y: 200
        };
        this.size = 20;
        this.speed = {
            dx: 0,
            dy: 0
        };
        this.width = 20;
        this.height = 20;
        this.add = false;
        this.tail = [];
        this.total = 0;
    }
    
    draw() {
        ctx.beginPath();
        
        for (let i = 0; i < this.tail.length; i++) {
            ctx.rect(this.tail[i].x, this.tail[i].y, this.size, this.size);
            ctx.fillStyle = 'yellow';
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.fill();
        }

        ctx.closePath();
        
    }

    update() {

        for (let i = 0; i < this.tail.length -1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total] = {x:this.position.x, y: this.position.y};

        this.position.y += this.speed.dy*scl;
        this.position.x += this.speed.dx*scl;
        
    }
    
    moveLeft(game) {
        this.speed.dx = -1;
        this.speed.dy = 0;
        // this.update();
    }

    moveRight(game) {
        this.speed.dx = 1;
        this.speed.dy = 0;
        // this.update();
    }

    moveUp(game) {
        this.speed.dy = -1;
        this.speed.dx = 0;
        // this.update();
    }

    moveDown(game) {
        this.speed.dy = 1;
        this.speed.dx = 0;
        // this.update();
    }

    collision(object) {
        let topObject = object.position.y;
        let leftObject = object.position.x;
        let rightObject = object.position.x + object.width;
        let bottomObject = object.position.y + object.height;

        if ((this.position.y) >= (topObject)
            && this.position.x >= (leftObject)
            && (this.position.x + this.width) <= (rightObject)
            && (this.position.y+this.height) <= (bottomObject)) {
                return true;
        }return false;
    }
}

class Game {
    constructor() {
        this.snake = new Snake();
        this.paused = false;
        this.started = false;
        this.gameOver = false;
        this.food = new Food();
        this.score = this.snake.total;
    }
    
    pauseGame() {
        if (this.started){
            this.paused = !this.paused;
        }
    }

    draw() {
        if (this.started){
            if (!this.gameOver){
                this.food.draw();
                this.snake.draw();
            }
            
            // Could move this into a css sheet and use document.getElementById('')

            if (this.paused) {
                ctx.font = "30px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("Paused", WIDTH/2, HEIGHT/2);
            }
            ctx.font = "30px Arial";
            ctx.fillStyle = 'blue';
            ctx.fillText("Score: "+this.score, 0+60, HEIGHT);

        }
        else if (this.gameOver) {
            ctx.rect(0,0,innerWidth, innerHeight);
            ctx.fillStyle = 'black';
            ctx.fill();


            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.fillText("GAME OVER", WIDTH/2, HEIGHT/2);
            ctx.fillText("Q to start over",WIDTH/2, HEIGHT/2 + 30);
        }
        else{
            ctx.rect(0,0,innerWidth, innerHeight);
            ctx.fillStyle = 'black';
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "red";
            ctx.fillText("Press Shift to Play!", WIDTH/2, HEIGHT/2);
            ctx.fillText("P to Pause",WIDTH/2, HEIGHT/2 + 30);
        }


    }

    update() {
        if (this.snake.collision(this.food)) {
            this.snake.total++;
            this.score++;
            this.food.update();
            this.snake.add = true;
        }
        if (this.snake.tail){
            for (let i =0; i < this.snake.tail.length-1; i++) {
                if (this.snake.tail[i].x == this.snake.position.x && 
                    this.snake.tail[i].y == this.snake.position.y){
                        this.gameOver = true;
                        this.started = false;
                    }
            }
        }
        if ((this.snake.position.x < 0 || (this.snake.position.x + this.snake.width) > WIDTH) ||
            this.snake.position.y < 0 || (this.snake.position.y + this.snake.height) > HEIGHT) {
            this.gameOver = true;
            this.started = false;
            
        }
        this.snake.update();
    }

    start() {
        if (this.gameOver) {
            this.restart();
        }else {
            this.started = true;
        }
    }

    restart() {
        this.score = 0;
        this.gameOver = false;
        this.started = false;
        this.paused = false;
        this.snake = new Snake();
    }
}

function play() {
    window.setInterval( () => {
        ctx.clearRect(0,0, WIDTH, HEIGHT)
    
        if (game.started) {
            if (!game.paused && !game.gameOver) {
                game.update();
            }
        }

        game.draw();
    }, 100);

}

let game = new Game();

play();


