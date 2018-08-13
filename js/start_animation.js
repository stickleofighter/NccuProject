var ctouchcheck;
var ctcrk;
var cbutton;
var cbtn;

var skips;

function SKIP(x,y,w,h)//665 385 75 30
{
	let Images=new Image();
	Images.src="media/pic/main_page/skip.png";
	ImageArray.push(Images);
	let ww=[w,w*0.9,w*1.1];
	let hh=[h,h*0.9,h*1.1];
	let xx=[x,x+(ww[0]-ww[1])/2,x-(ww[2]-ww[0])/2];
	let yy=[y,y+(hh[0]-hh[1])/2,y-(hh[2]-hh[0])/2];
	return{
		get w(){return ww;},
		get h(){return hh;},
		get x(){return xx;},
		get y(){return yy;},
		draw: (bs)=>{
			cbtn.clearRect(xx[2],yy[2],ww[2],hh[2]);
			cbtn.drawImage(Images,xx[bs],yy[bs],ww[bs],hh[bs]);
		}
	};
}

function vidEndCheck()
{
	let vid=$("#VIDEO1")
	let a=setInterval(()=>
	{
		if(vid[0].ended)
		{
			clearInterval(this);
			document.location.replace("MonopolyLearn.html");
		}
	},10);
}
function touchEventHandler()
{
	let Mpos;
	let MouseMoveHandler=e=>
	{
		Mpos=getMousePos(e);
		if(areaCheck(Mpos.x,Mpos.y,skips.x[0],skips.y[0],skips.w[0],skips.h[0])) skips.draw(2);
		else skips.draw(0);
	};
	let MouseDownHandler=e=>
	{
		Mpos=getMousePos(e);
		if(areaCheck(Mpos.x,Mpos.y,skips.x[0],skips.y[0],skips.w[0],skips.h[0])) skips.draw(1);
		else skips.draw(0);
	};
	let MouseUpHandler=e=>
	{
		skips.draw(0);
	};
	let MouseClickHandler=e=>
	{
		Mpos=getMousePos(e);
		if(areaCheck(Mpos.x,Mpos.y,skips.x[0],skips.y[0],skips.w[0],skips.h[0]))document.location.replace("MonopolyLearn.html");
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
	cbutton=$("#buttonimg");
	cbtn=cbutton[0].getContext("2d");
}
function ObjConstruct()
{
	skips=SKIP(665,385,75,30);
}
function SourceOnload()
{
	skips.draw(0);
	vidEndCheck();
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	ObjConstruct();
	SourceLoadCheck(SourceOnload);
});