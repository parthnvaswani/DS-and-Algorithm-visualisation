class Boundary{
    constructor(p1,p2){
        this.p1=p1;
        this.p2=p2;
    }

    show(){
        line(this.p1.x,this.p1.y,this.p2.x,this.p2.y)
        stroke(255)
    }
}