class Particle{
    constructor(){
        this.pos=createVector(width/2, height/2)
        this.rays=[]
        for (let i = 0; i < 360; i++) {
            this.rays.push(new Ray(this.pos,radians(i)))        
        }
    }

    look(walls){
        for (let i = 0; i < this.rays.length; i++) {
            let ray=this.rays[i]
            let closest=null
            let record=Infinity
            for (const wall of walls) {
                let pt=ray.cast(wall)
                if(pt){
                    let d=p5.Vector.dist(this.pos,pt)
                    if(d<record){
                        record=d
                        closest=pt
                    }
                }
            }
            if(closest){
                stroke(255,100)
                line(this.pos.x,this.pos.y,closest.x,closest.y)
            }
        }
    }

    move(){
        this.pos.set(mouseX,mouseY)
    }

    show(){
        fill(255)
        ellipse(this.pos.x, this.pos.y, 4)
        for (const ray of this.rays) {
            ray.show()
        }
    }
}