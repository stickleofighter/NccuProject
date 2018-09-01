var ctouchcheck;
var ctcrk;
var cbackground;
var cbg;
var cbutton;
var cbtn;

var bg;
var check_btn;

function touchEventHandler()
{
	let Mpos;
	let MouseMoveHandler=e=>
	{
		Mpos=getMousePos(e);
		if(areaCheck(Mpos.x,Mpos.y,check_btn.x[0],check_btn.y[0],check_btn.w[0],check_btn.h[0]))
		{
			 check_btn.draw(2);
			 if(check_btn.MovePlayOnce)
			 {
				check_btn.MovePlayOnce=false;
				voices[1].stop();
				voices[1].play();
			 }
		}
		else 
		{
			check_btn.draw(0);
			check_btn.MovePlayOnce=true;
		}
	};
	let MouseDownHandler=e=>
	{
		Mpos=getMousePos(e);
		if(areaCheck(Mpos.x,Mpos.y,check_btn.x[0],check_btn.y[0],check_btn.w[0],check_btn.h[0])) 
		{
			ctouchcheck.off("mousemove",MouseMoveHandler);
			check_btn.draw(1);
			voices[2].stop();
			voices[2].play();
		}
		else check_btn.draw(0);
	};
	let MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		check_btn.draw(0);
	};
	let MouseClickHandler=e=>
	{
		Mpos=getMousePos(e);
		if(areaCheck(Mpos.x,Mpos.y,check_btn.x[0],check_btn.y[0],check_btn.w[0],check_btn.h[0]))document.location.replace("start_page.html");
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
	//loadingdraw(true);
}
function ObjConstruct()
{
	bg=BG();
	check_btn=CHECK("back",575,300,68,44);
	voiceConstruct();
}
function SourceOnload()
{
	//loadingdraw(false);
	bg.draw();
	check_btn.drawNotCheck(0);
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	ObjConstruct();
	SourceLoadCheck(SourceOnload);
});