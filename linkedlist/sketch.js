let right,left,xpos=0,ll,addatindex,rev,butt,gx,rem,butt2

function setup(){
    createCanvas(400, 400)
    left=createButton('left')
    right=createButton('right')
    createDiv('Add at index')
    addatindex=createInput().attribute('placeholder','eg:3 23')
    butt=createButton('add')
    rev=createButton('reverse linked list').attribute('style','display:block;margin-top:2em;margin-bottom:2em;')
    createDiv('Remove from index')
    rem=createInput().attribute('placeholder','eg:3')
    butt2=createButton('remove')
    rev.mousePressed(()=>{
        ll.reverse()
    })
    butt.mousePressed(()=>{
        let val=addatindex.value()
        if(val){
            val=val.split(' ')
            ll.addAtIndex(val[0],val[1])
        }
        else{
            alert('please enter something to add')
        }
    })  
    butt2.mousePressed(()=>{
        let val=rem.value()
        if(val){
            ll.removeFromIndex(val)
        }
        else{
            alert('please enter an index to remove')
        }
    })   
    left.mousePressed(()=>{
        if(xpos){
            xpos+=50
        }
    })
    right.mousePressed(()=>{
        if(xpos>-gx+width/2){
            xpos-=50
        }
    })
    ll=LinkedList.fromArray([1,2,3,4])
}

function draw(){
    background(100)
    translate(xpos, 0)
    ll.show()
    push()
    textSize(30)
    text('Linked List', 80, 30)
    pop()
}