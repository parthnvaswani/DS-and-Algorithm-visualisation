let graph=[],scl=20,colselist=[],openlist=[],path=[],start,end,finished=false,speed,objects,resizegrid


function setup(){
    objects=document.querySelector('#obj')
    createCanvas(200,200)
    for(let i=0;i<width/scl;i++){
        graph[i]=[]
        for(let j=0;j<height/scl;j++){
            graph[i][j]=new Cell(i*scl,j*scl,i,j)
        }
    }
    createDiv('Change speed')
    speed=createSlider(1, 60, 30, 1)
    speed.changed(()=>{
        frameRate(speed.value())
    })
    createDiv('Change grid')
    resizegrid=createSlider(3, 20, 10, 1)
    resizegrid.changed(reset)
    start=graph[0][0]
    end=graph[graph.length-1][graph[0].length-1]
    start.wall=false
    end.wall=false
    openlist.push(start)
}

function reset(){
        let val=resizegrid.value()
        resizeCanvas(val*scl,val*scl)
        graph=[]
        for(let i=0;i<width/scl;i++){
            graph[i]=[]
            for(let j=0;j<height/scl;j++){
                graph[i][j]=new Cell(i*scl,j*scl,i,j)
            }
        }
        colselist=[]
        openlist=[]
        path=[]
        finished=false
        start=graph[0][0]
        end=graph[graph.length-1][graph[0].length-1]
        start.wall=false
        end.wall=false
        openlist.push(start)
}

function draw(){
    background(255)
    for (let index = 0; index < colselist.length; index++) {
        colselist[index].setColor('red')
    }
    for (let index = 0; index < openlist.length; index++) {
        openlist[index].setColor('blue')
    }
    for (let index = 0; index < path.length; index++) {
        path[index].setColor('green')
    }
    start.setColor('yellow')
    end.setColor('cyan')
    for(let i=0;i<graph.length;i++){
        for(let j=0;j<graph[i].length;j++){
            graph[i][j].show()
        }
    }
    if(!finished&&openlist.length>0){
        Astar()
    }else{
        if(finished)path.push(end)
    }
}

function Astar(st,en){
        //find the cell with least f from openlist
        let q=openlist[0],index
        for(let i=openlist.length-1;i>0;i--){
            if(q.f>openlist[i].f){
                q=openlist[i]
                index=i
            }
        }

        if(q==end){
            finished=true
            return
        }

        //remove the cell from the openlist
        openlist.splice(index,1)

        //generate cell's neighbors
        let neighbors=getNeighbors(q)
        for(let i=0;i<neighbors.length;i++){
            let neighbor=neighbors[i]
            //if neighbor is not in closelist
            if (!colselist.includes(neighbor)&&!neighbor.wall) {
                let tempG = q.g + neighbor.heuristic(q)
        
                // Is this a better path than before?
                let newPath=false
                if (openlist.includes(neighbor)) {
                    if(tempG < neighbor.g){
                        neighbor.g = tempG
                        newPath=true
                    }
                } else {
                    neighbor.g = tempG
                    openlist.push(neighbor)
                    newPath=true
                }
                
                //if new path found
                if(newPath){
                    neighbor.h = neighbor.heuristic(end)
                    neighbor.f = neighbor.g + neighbor.h
                    neighbor.previous = q
                }
                
                
            }
        }
        //add it to closed list
        colselist.push(q)

    path=[]    
    var temp = q
    path.push(temp)
    while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
    }
}

function getNeighbors(q){
    let result=[]
    let i=q.i,j=q.j
    if(i>0){
        result.push(graph[i-1][j])
    }
    if(j>0){
        result.push(graph[i][j-1])
    }
    if(i<graph.length-1){
        result.push(graph[i+1][j])
    }
    if(j<graph[0].length-1){
        result.push(graph[i][j+1])
    }
    if(j<graph[0].length-1&&i<graph.length-1){
        result.push(graph[i+1][j+1])
    }
    if(j>0&&i>0){
        result.push(graph[i-1][j-1])
    }
    if(j<graph[0].length-1&&i>0){
        result.push(graph[i-1][j+1])
    }
    if(i<graph.length-1&&j>0){
        result.push(graph[i+1][j-1])
    }
    return result
}

function mousePressed() {
    if(mouseX>0&&mouseX<width&&mouseY>0&&mouseY<height){
        for(let i=0;i<width/scl;i++){
            for(let j=0;j<height/scl;j++){
                graph[i][j].f=0
                graph[i][j].g=0
                graph[i][j].h=0
                graph[i][j].color='white'
                graph[i][j].previous=undefined
            }
        }
        colselist=[]
        openlist=[]
        path=[]
        finished=false
        let i = floor(mouseX / scl)
        let j = floor(mouseY / scl)

        if(objects.value=="remove wall")graph[i][j].wall = false
        if(objects.value=="add wall")graph[i][j].wall = true
        if(objects.value=="move start")start=graph[i][j]
        if(objects.value=="move end")end=graph[i][j]
        start.wall=false
        end.wall=false
        openlist.push(start)
    }
}