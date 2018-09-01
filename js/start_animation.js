var ctouchcheck;
var ctcrk;
var cbutton;
var cbtn;

var skips;

function vidEndCheck()
{
	let vid=$("#VIDEO1")
	let a=setInterval(()=>
	{
		if(vid[0].ended)
		{
			clearInterval(a);
			document.location.replace("start_page.html");
		}
	},10);
}
function touchEventHandler()
{
	let Mpos;
	let MouseMoveHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,skips,0))
		{
			 skips.drawNotCheck(cbtn,2);
			 if(skips.PlayOnce)
			 {
				skips.PlayOnce=false;
				voices[1].stop();
				voices[1].play();
			 }
		}
		else 
		{
			skips.drawNotCheck(cbtn,0);
			skips.PlayOnce=true;
		}
	};
	let MouseDownHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,skips,0))
		{
			ctouchcheck.off("mousemove",MouseMoveHandler);
			skips.drawNotCheck(cbtn,1);
			voices[2].stop();
			voices[2].play();
		}
		else skips.drawNotCheck(cbtn,0);
	};
	let MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		skips.drawNotCheck(cbtn,0);
	};
	let MouseClickHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,skips,0))document.location.replace("start_page.html");
	};
	ctouchcheck.on("mousemove",MouseMoveHandler);
	ctouchcheck.on("mousedown",MouseDownHandler);
	ctouchcheck.on("mouseup",MouseUpHandler);
	ctouchcheck.on("click",MouseClickHandler);
}

function initialSet()
{
	localStorage["voiceloadcheck"]=JSON.stringify(false);
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
	let DATA=JSON.parse(setData);
	let skip_btn=DATA.button.skip;
	skips=new BUTTON(skip_btn[0]);
	initialSet();
	voiceConstruct();
}
function SourceOnload()
{
	skips.drawNotCheck(cbtn,0);
	vidEndCheck();
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	ObjConstruct();
	SourceLoadCheck(SourceOnload)
});