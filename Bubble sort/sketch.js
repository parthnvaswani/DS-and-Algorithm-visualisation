let i=0,j,arr=[],sortbutt,arrinp,bool=false,p=9;

function setup(){
    createDiv('Bubble Sort visualizer')
    createCanvas(500, 500)
    frameRate(5)
    background(100)
    createDiv('enter an array to sort...')
    arrinp=createInput('', text).attribute('placeholder', 'eg:1 23 12 4')
    sortbutt=createButton('sort')
    sortbutt.mousePressed(()=>{startsort(arrinp.value())})
}

function startsort(v){
    v=v.trim()
    if(bool==false){
    if(v){
        let tarr=v.split(' ')
        if(tarr.every(e=>e.match(/^\d+$/g))){
            for(let k=0;k<tarr.length;k++)arr[k]=+tarr[k]
            bool=true
        }
        else alert('enter valid array')
    }
    else alert('enter something')
    }else alert('sorting in progress')
}

function draw(){
    if(bool){
        background(100)
        for(let j=i+1;j<arr.length;j++){
            if(arr[j]<arr[i]){
                let temp=arr[i]
                arr[i]=arr[j]
                arr[j]=temp
            }
        }
        for(let k=0;k<arr.length;k++){
            let x=k*p;
            let y=arr[k]*p/3;
            push()
            translate(p-2, height)
            rotate(180*Math.PI/180)
            scale(-1,1)
            strokeWeight(p)
            line(x, 0, x, y)
            pop()
        }
        i++
        if(i>=arr.length){
            bool=false
            i=0
        }
    }
}

