
const COLOR_BLACK = '#000000';
const COLOR_WHITE = '#ffffff';
const COLOR_RED = '#ff0000';
const COLOR_ORANGE = '#ffa500';
const COLOR_YELLOW = '#ffff00';
const COLOR_GREEN = '#90ee90';
const COLOR_LIGHT_BLUE = '#87ceeb';
const COLOR_BLUE = '#1e90ff';
const COLOR_PINK = '#ffb6c1';

let painting = false;
let filling = false;

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("color");
const range = document.getElementById("jsRange");
const btnMode = document.getElementById("jsMode");
const btnSave = document.getElementById("jsSave");

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "white";
ctx.fillRect(0,0 ,canvas.width, canvas.height);
ctx.strokeStyle = COLOR_BLACK;
ctx.fillStyle = COLOR_BLACK;
ctx.lineWidth = 2.5;

function onMouseMove(event){
    var x = event.offsetX;
    var y = event.offsetY;

    if(painting == false){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleBushSize(event){
    // console.log(event.target.value);
    const bushSize = event.target.value;
    ctx.lineWidth = bushSize;
}

function handleMode(event){
    if(filling === true){
        filling = false;
        btnMode.innerText = "Fill";
    }
    else{
        filling = true;
        btnMode.innerText = "Paint";
    }
}

function handleCanvasClick(event){
    if(filling == true){
        ctx.fillRect(0, 0,canvas.width, canvas.height);
    }
}

function handelContextMenu(event){
    //console.log(event);
    event.preventDefault();
}

function saveImage(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    
    link.href = image;
    link.download = "paintJS[😍]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handelContextMenu);

}
if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if(range){
    range.addEventListener("input", handleBushSize);
}

if(btnMode){
    btnMode.addEventListener("click", handleMode);
}

if(btnSave){
    btnSave.addEventListener("click", saveImage);
}