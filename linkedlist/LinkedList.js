class Node{
    constructor(v){
        this.val=v
        this.next=null
    }

}
class LinkedList{
    constructor(){
        this.start=null
    }

    static fromArray(arr){
        let list=new LinkedList()
        arr.forEach(e=>{
            list.addNode(e)
        })
        return list
    }

    toArray(){
        let arr=[]
        if(this.start==null){
            return arr
        }else{
            get(this.start)
        }
        function get(n){
            arr.push(n.val)
            if(n.next!=null){
                get(n.next)
            }
        }
        return arr
    }
    addNode(v){
        if(this.start==null){
            let node=new Node(v)
            this.start=node
        }else{
            add(this.start,v)
        }
        function add(n,v){
            if(n.next==null){
                let node=new Node(v)
                n.next=node
            }else{
                add(n.next,v)
            }
        }
    }
    
    addAtStart(v){
        let node=new Node(v)
        if(this.start==null){
            this.start=node
        }else{
            let list=this.start
            this.start=node
            node.next=list
        }
    }

    addAtIndex(i,v){
        if(i==0){
            let node=new Node(v)
            let rest=this.start
            this.start=node
            node.next=rest
        }else{
            i--
            add(this.start)
        }
        function add(n){
            if(i==0){
                LinkedList.addAfterNode(n,v)
            }
            else if(n.next==null){
                LinkedList.addAfterNode(n,v)
            }else{
                i--
                add(n.next)
            }
        }
    }

    removeFromIndex(i){
        if(i==0){
            this.start=this.start.next
        }else{
            i--
            remove(this.start)
        }
        function remove(n){
            if(n.next==null){
                return
            }else if(i==0){
                n.next=n.next.next
            }else{
                i--
                remove(n.next)
            }
        }
    }
    static addAfterNode(n,v){
        let node=new Node(v)
        let rest=n.next
        n.next=node
        node.next=rest
    }

    reverse(){
        let arr=this.toArray()
        let list=LinkedList.fromArray(arr.reverse()) 
        this.start=list.start
    }

    show(){
        let x=100,y=width/2
        let arr=this.toArray()
        textSize(20)
        text('index no.',40,y-40)
        textAlign(CENTER, CENTER)
        arr.forEach((e,i)=>{
            text(i,x,y-40)
            if(i<arr.length-1){
                line(x+25, y, x+75, y)
            }
            ellipse(x, y, 50)
            text(e, x, y) 
            x+=100
        })
        gx=x-100
    }

}