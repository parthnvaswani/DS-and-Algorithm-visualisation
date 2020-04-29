class Cell{
    constructor(x,y,i,j){
        this.i=i
        this.j=j
        this.x=x
        this.y=y
        this.f=0
        this.g=0
        this.h=0
        this.color='white'
        this.wall=false
    }
    setColor(color){
        this.color=color
    }
    show(){
        if(this.wall){
            fill(0)
        }else{
            fill(this.color)
        }
        rect(this.x,this.y,scl,scl)
    }

    heuristic(e){
        return dist(this.x,this.y,e.x,e.y)
    }
}