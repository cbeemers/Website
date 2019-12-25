let ball;

export default function Ball(x, y){
    //this.con = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.dx = 5;
    this.dy = 5;

    this.draw = function() {
        con.beginPath();
        con.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
        con.fillStyle = 'blue';
        con.fill();
        con.strokeStyle = 'blue';
        con.stroke();
        
    }
    this.update = (paddle) => {
        // this.dx = 5;
        // this.dy = 5;
        if (this.x + this.radius >= innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }if (this.y + this.radius >= innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }

        let ballBottom = ball.y + ball.radius;
        let topPaddle = paddle.y;
        let leftPaddle = paddle.x;
        let rightPaddle = paddle.x + paddle.width;

        if (ballBottom >= topPaddle 
            && this.x >= leftPaddle
            && this.x + this.radius <= rightPaddle){
            this.dy = -this.dy;
            this.y = paddle.y - this.radius;
        }


        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}