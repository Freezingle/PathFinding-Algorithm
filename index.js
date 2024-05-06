    const display= document.querySelector("canvas");
    const ctx= display.getContext("2d");
    const source= document.getElementById("source");
    const obs= document.getElementById("obstacles");
    const dest= document.getElementById("destination");
    const run= document.getElementById("play");
    const boxes=[]
    display.width = 1200;
    display.height =600;
    const obstacleArray=[];
    let callflag=1;
    let callflag2=1;

    ctx.strokeStyle ="#461111"
    ctx.fillStyle=" rgb(61, 59, 85)";
    ctx.fillRect(0,0,display.width,display.height);
    obs.style.display="none";
    class Boxes{
        constructor(Xstart,Ystart,Xend,Yend,index)
        {
            this.start={
                x: Xstart,
                y: Ystart
            }
            this.end={x:Xend, y:Yend}
            this.prior;
            this.visited=0;
            this.source=0;
            this.destination=0;
            this.obstacle=0;
            this.index=index;
        }

    }

    class Queue{
        constructor()
        {
                this.queue=[];
                this.frontIndex=0;
                this.backIndex=0;
            
                
        }
    enqueue(boxes)
    {
        this.queue[this.backIndex]= boxes;
        this.backIndex++; 
    }
    dequeue()
    {
        delete this.queue[this.frontIndex];
        this.frontIndex++;
    }

    }

    function Axes()
    {
        ctx.strokeStyle="white";
        ctx.lineWidth=0.5
        ctx.beginPath();
        //horizontal lines
        for(let i=0; i<display.height; i+=60)
        {
            ctx.moveTo(0,i);
            ctx.lineTo(display.width,i);
        }
        ctx.stroke();
        //vertical line 
        ctx.strokeStyle="white";
        ctx.beginPath()
        for (let j=0; j<display.width; j+=60)
        {
            ctx.moveTo(j,0);
            ctx.lineTo(j,display.height);
        }
        ctx.stroke();
    }

    Axes();



    function defineEachBox()
    {
        let Xstart=0,Ystart=0,Xend=0,Yend=0, index=0;
        
        while(Yend< display.height)
        {
            Xend=0;
            Xstart=0;
            Yend+=60;
            while(Xend<display.width)
            {
                Xend+=60;
            boxes.push(new Boxes(Xstart,Ystart,Xend,Yend,index));
            index++;
            Xstart=Xend;
        
            }
            Ystart=Yend;
        }
    }
    defineEachBox();

    function fillObstacles()
    { ctx.fillStyle="black";
    obs.style.display="none";
    display.addEventListener("click",(event)=>{
        

            
                for(let i = 0; i<boxes.length; i++)
                {
                    if(event.clientX> boxes[i].start.x && event.clientX < boxes[i].end.x && event.clientY > boxes[i].start.y && event.clientY < boxes[i].end.y && boxes[i].source!=1 && boxes[i].destination!=1 && boxes[i].obstacle!=1)
                    {
                        boxes[i].obstacle=1;
                        ctx.fillRect(boxes[i].start.x, boxes[i].start.y, 60,60);
                        
                    }
                }
        })
    }



        
        
        function fillSource(){
            source.style.display="none";
            ctx.fillStyle="yellow";
        display.addEventListener ("click",(event)=>{
            let i=0
            while( i<boxes.length && callflag==1)
                    {
                    
                        if(event.clientX> boxes[i].start.x && event.clientX < boxes[i].end.x && event.clientY > boxes[i].start.y && event.clientY < boxes[i].end.y && boxes[i].destination!=1)
                        {
                            ctx.fillRect(boxes[i].start.x, boxes[i].start.y, 60,60);
                            boxes[i].source=1;
                            callflag =0;

                            break;
                        }
                        i++;
                    }
        })
        return 0;
        }

        function fillDest()
    { ctx.fillStyle="green";
    dest.style.display="none";
    obs.style.display="block";
        display.addEventListener ("click",(event)=>{
        let i=0
        while( i<boxes.length && callflag2==1)
                {
                    if(event.clientX> boxes[i].start.x && event.clientX < boxes[i].end.x && event.clientY > boxes[i].start.y && event.clientY < boxes[i].end.y && boxes[i].source!=1 &&callflag2==1)
                    {
                        
                        ctx.fillRect(boxes[i].start.x, boxes[i].start.y, 60,60);
                    boxes[i].destination=1
                        callflag2 =0;

                        break;
                    }
                    i++;
                }
        })
    }
    source.addEventListener("click",()=>{
        fillSource()});
    obs.addEventListener("click",()=>{fillObstacles()})

    dest.addEventListener("click", ()=>{fillDest()})

    run.addEventListener("click",()=>{play()});
    /*
    starting bata neighbouring sab lai queue ma rakhne, search garisakeko lai arko queue ma rakhne jun feri research na hos vanera 
    one by one dequeue gardai tinerko neighbouring check garne while keeping prior on box 
    jaba vettinxa destination taba destination ko prior ko prior ko prior ko gardai source samma aune 
    finish! 
    */
    //should be recursive i guess~

    const queues= new Queue();

    function play()
    {
        let s=-1,d=-1,indexArray=[], prior,temp;
        let n=0, run=1;
        for (let i=0; i< boxes.length; i++)
        {
            if(boxes[i].source==1)
            {
                s=i;
                break;
            }
        }
        for (let j=0; j< boxes.length; j++)
        { 
            if(boxes[j].destination==1)
                {
                    d=j;
                    break;
                }
        }
        for(let k=0; k<boxes.length; k++)
        {
                if(boxes[k].obstacle==1)
                {
                    obstacleArray.push(new Queue(boxes[k]));

                }
            }
        console.log(s);
        console.log(boxes[s].index);
        //console.log(boxes[d]);
    //console.log((boxes.length));
    

                
            
    //ENQUEUE
                            

    temp = s;
        while(1)
        {
            indexArray.push(temp+1,temp-1,temp+20,temp+21,temp+19,temp-20,temp-21,temp-19);
            console.log(indexArray);
                    

                        while(n< 8)
                        {
                            console.log(n);
                        
                        if(boxes[indexArray[n]]==null)
                        {
                            n++;
                                continue;
                        }
                    
                        
                        else if(boxes[indexArray[n]].obstacle!=1 && boxes[indexArray[n]].visited!=1 && boxes[indexArray[n]].destination!=1)
                        {
                            console.log("im queuing up");
                            boxes[indexArray[n]].prior= boxes[temp];
                            boxes[indexArray[n]].visited=1;
                            queues.enqueue(boxes[indexArray[n]]);
                            

                        }
                        else if(boxes[indexArray[n]].destination==1)
                        {
                            console.log("congratulations!");
                            boxes[indexArray[n]].prior= boxes[temp];
                            boxes[indexArray[n]].visited=1;
                            break;
                        }
                        


                
                        n++;
                    }
                    console.log("this is front of queue")
                console.log(queues.queue[queues.frontIndex].index);
                
                    if(n < 8)
                    {
                        break;
                    }    
                    
                else{
                    
                        temp = queues.queue[queues.frontIndex].index;
                        console.log("i reached here");
                        console.log(temp);
                        queues.dequeue();
                        indexArray.pop();
                        indexArray.pop();
                        indexArray.pop();
                        indexArray.pop();
                        indexArray.pop();
                        indexArray.pop();
                        indexArray.pop();
                        indexArray.pop();
                        
                        n=0;
                    
                    }        
                }
                let m =d;
                ctx.fillStyle="red";
                setInterval(()=>{
                    
                    if(boxes[m].prior!= boxes[s]){
                        ctx.fillRect(boxes[m].prior.start.x, boxes[m].prior.start.y, 60,60)
                        m= boxes[m].prior.index;
                    
                    }
                },500)
                
                
                
                    console.log(obstacleArray);
                //  console.log(queues);

    }