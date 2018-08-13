var ctouchcheck;
var ctcrk;
var cbackground;
var cbg;
var cbutton;
var cbtn;

var bg;
var buttons=new Array();


function BG()
{
	let Images=new Image();
	Images.src="media/pic/main_page/start_page.png";
	ImageArray.push(Images);
	let xx=0;
	let yy=0;
	let ww=750;
	let hh=420;
	return{
		draw: ()=>{cbg.drawImage(Images,xx,yy,ww,hh);}
	};
}
function BUTTON(url,x,y,w,h)
{
	let Images=new Image();
	let Images2=new Image();
	Images.src=`media/pic/main_page/${url}_btn1.png`;
	Images2.src=`media/pic/main_page/${url}_btn2.png`;
	ImageArray.push(Images);
	ImageArray.push(Images2);
	let ww=[w,w*0.9,w*1.1];
	let hh=[h,h*0.9,h*1.1];
	let xx=[x,x+(ww[0]-ww[1])/2,x-(ww[2]-ww[0])/2];
	let yy=[y,y+(hh[0]-hh[1])/2,y-(hh[2]-hh[0])/2];
	return{
		get x(){return xx;},
		get y(){return yy;},
		get w(){return ww;},
		get h(){return hh;},
		drawNotCheck: (bs)=>{
			cbtn.clearRect(xx[2],yy[2],ww[2],hh[2]);
			cbtn.drawImage(Images,xx[bs],yy[bs],ww[bs],hh[bs]);
		},
		drawIsCheck: (bs)=>{
			cbtn.clearRect(xx[2],yy[2],ww[2],hh[2]);
			cbtn.drawImage(Images2,xx[bs],yy[bs],ww[bs],hh[bs]);
		}
	};
}

function touchEventHandler()
{
	let Mpos;
	let MouseMoveHandler=e=>
	{
		Mpos=getMousePos(e);
		for(let i in buttons)
		{
			if(areaCheck(Mpos.x,Mpos.y,buttons[i].x[0],buttons[i].y[0],buttons[i].w[0],buttons[i].h[0]))
			{
				buttons[i].drawIsCheck(2);
				voices[1].play();
			}
			else buttons[i].drawNotCheck(0);
		}
	};
	let MouseDownHandler=e=>
	{
		Mpos=getMousePos(e);
		for(let i in buttons)
		{
			if(areaCheck(Mpos.x,Mpos.y,buttons[i].x[0],buttons[i].y[0],buttons[i].w[0],buttons[i].h[0]))
			{
				buttons[i].drawIsCheck(1);
				voices[2].play();
			}
			else buttons[i].drawNotCheck(0);
		}
	};
	let MouseUpHandler=e=>
	{
		for(let i in buttons) 
			if(areaCheck(Mpos.x,Mpos.y,buttons[i].x[0],buttons[i].y[0],buttons[i].w[0],buttons[i].h[0]))buttons[i].drawIsCheck(2);
	};
	let MouseClickHandler=e=>
	{
		Mpos=getMousePos(e);
		for(let i in buttons) 
			if(areaCheck(Mpos.x,Mpos.y,buttons[i].x[0],buttons[i].y[0],buttons[i].w[0],buttons[i].h[0]))console.log("inside"+i);
	};
	ctouchcheck.on("mousemove",MouseMoveHandler);
	ctouchcheck.on("mousedown",MouseDownHandler);
	ctouchcheck.on("mouseup",MouseUpHandler);
	ctouchcheck.on("click",MouseClickHandler);
}

function canvasContext()
{
	ctouchcheck=$("#touchfeel");
	ctcrk=ctouchcheck[0].getContext("2d");
	cbackground=$("#backgroundimg");
	cbg=cbackground[0].getContext("2d");
	cbutton=$("#buttonimg");
	cbtn=cbutton[0].getContext("2d");
}
function ObjConstruct()
{
	bg=BG();
	buttons[0]=BUTTON("gamestart",340,285,152,44);
	buttons[1]=BUTTON("set",525,285,152,44);
	buttons[2]=BUTTON("team",340,350,152,44);
	buttons[3]=BUTTON("quesmake",525,350,152,44);
	voiceConstruct();
}
function SourceOnload()
{
	bg.draw();
	for(let i in buttons) buttons[i].drawNotCheck(0);
	bgm.play();
	bgm.loop=true;
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	ObjConstruct();
	SourceLoadCheck(SourceOnload);
});