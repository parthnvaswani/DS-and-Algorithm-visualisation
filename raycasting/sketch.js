let boundaries=[],particle;

function setup(){
    createCanvas(500,500)
    for (let i = 0; i < 4; i++) {
        let p1=createVector(random(width),random(height))
        let p2=createVector(random(width),random(height))
        let boundary=new Boundary(p1,p2);
        boundaries.push(boundary)    
    }
    boundaries.push(new Boundary(createVector(0,0),createVector(width,0)))
    boundaries.push(new Boundary(createVector(0,0),createVector(0,height)))
    boundaries.push(new Boundary(createVector(width,0),createVector(width,height)))
    boundaries.push(new Boundary(createVector(0,height),createVector(width,height)))
    particle=new Particle()
}

function draw(){
    background(0)
    for (const boundary of boundaries) {
        boundary.show()
    }
    particle.move()
    particle.show()
    particle.look(boundaries)
}