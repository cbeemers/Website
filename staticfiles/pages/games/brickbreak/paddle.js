let paddle;

export default function Paddle(con){
    this.width = 200;
    this.height = 20;
    this.x = con.innerWidth/2 - this.width/2;
    this.y = con.innerHeight - this.height;
    this.dx = -4;
    this.draw = function(con){
        con.rect(this.x, this.y, this.width, this.height);
        con.fillStyle = 'blue';
        con.fill();
    }
    this.update = function(con){
        if (this.width + this.x > innerWidth || this.x < 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.draw(con);
    }
}
