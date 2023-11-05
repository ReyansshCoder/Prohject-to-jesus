//**Main .js ka khel */

status=""
objects=[]


function setup(){
    canvas=createCanvas(500,500)
    canvas.center()
v1= createCapture(VIDEO)
v1.hide()
}
function modelLoaded(){
    console.log("model has loaded")
    status=true
    
}


function start(){
    mymodel=ml5.objectDetector('cocossd',modelLoaded)
document.getElementById("status").innerHTML="started detecting"
XD=document.getElementById("tb").value
}
 

function gotResult(error,results){
    if(error){
            console.log(error)}
            else{
                console.log(results)
                objects=results
            }
}

function draw(){
    image(v1,0,0,500,500)
    if(status !=""){
        mymodel.detect(v1,gotResult)
        for(i=0;i<objects.length;i++){
            //**major work is abt to start */
            document.getElementById("status").innerHTML="DETECTED";
        
        ac=floor(objects[i].confidence*100)
        stroke ("Blue")
        text (objects[i].label+" "+ac+" %",objects[i].x,objects[i].y) 
        noFill()
        stroke ("red")
    rect (objects[i].x,objects[i].y,objects[i].width,objects[i].height)    
    if(objects[i].label==XD){
        v1.stop()
        mymodel.detect(gotResult)
        document.getElementById("objn").innerHTML=XD+" found"
        s=window.speechSynthesis
        utter=new SpeechSynthesisUtterance(XD+"Found")
        s.speak(utter)
    }
    else{
        document.getElementById("objn").innerHTML=XD+"Not Found"
    }
    }
    }
    }