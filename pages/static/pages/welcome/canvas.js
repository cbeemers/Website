// import dat from "../../node_modules/dat.gui";

// const gui = new dat.GUI();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 700;
canvas.width = innerWidth;

let mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousedown', (event) => {
    // mouse.x = event.pageX;
    // mouse.y = event.pageY;
    let circ = new Circle(event.pageX, event.pageY, randomize(5,50));
    circles.push(circ);
    //circ.draw();
}, false);

window.addEventListener('mousemove', (event) => {
    // console.log(mouse.x, mouse.y);
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

class Circle {
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.or = radius;
        this.opacity = 1;
        
        this.colors = (opacity) => {
            return ["rgba(72, 110, 215," + opacity + ")",
                    "rgba(100,0,200," + opacity + ")",
                    // "rgba(40, 251, 33," + opacity + ")",
                    "rgba(204,59,96," + opacity + ")"]
        };
        // rgba(59,97,208
        this.index = randomize(0,this.colors(0).length);
        this.color = this.colors(this.opacity)[this.index];
        
        this.dx = randomize(-2, 4);
        this.dy = randomize(-2, 4);
        if (this.dx == 0){
            this.dx += 1
        }else if (this.dy == 0){this.dy += 1}
    }

    draw() {
        this.grow();
        this.move();

        this.color = this.colors(this.opacity)[this.index];

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        // ctx.stroke();
    }

    grow() {
        if (this.x + this.radius >= mouse.x && this.x-this.radius <= mouse.x
            && this.y +this.radius >= mouse.y && this.y -this.radius <=mouse.y) {
            if (this.radius <= 100) {
                this.radius++;
                if (this.opacity > 0) {
                    this.opacity -= .02;
                }
            }
        }

        else if (this.radius > this.or) {
            this.radius--;
            if (this.opacity < 1) {
                this.opacity += .02;
            }
        }
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
}



let circles = [];
for (let i = 0; i < 60; i++) {
    let radius = randomize(5, 50);
    let circle = new Circle(randomize(0+radius,canvas.width-radius*2), 
                            randomize(0+radius, canvas.height-radius*2), radius);
    circles.push(circle);
}

function animate() {

    
    // requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // window.setInterval( () => {
    //     // ctx.clearRect(0,0, innerWidth, canvas.height);
    circles.forEach(circle => {
        circle.draw();
    })

 
    // }, 20);
}

function randomize(min, max) {
    return Math.floor(Math.random()*max+min);   
}

animate();
setInterval(animate, 1000/30);
