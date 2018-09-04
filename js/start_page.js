var ctouchcheck;
var ctcrk;
var cbackground;
var cbg;
var cbutton;
var cbtn;

var bg;
var buttons=new Array();


function touchEventHandler()
{
	let Mpos;
	let MouseMoveHandler=e=>
	{
		Mpos=new getMousePos(e);
		for(let i in buttons)
		{
			if(areaCheck(Mpos,buttons[i],0))
			{
				buttons[i].drawIsCheck(cbtn,2);
				if(buttons[i].PlayOnce)
				{
					buttons[i].PlayOnce=false;
					voices[1].stop();
					voices[1].play();
				}
			}
			else
			{
				buttons[i].PlayOnce=true;
				buttons[i].drawNotCheck(cbtn,0);
			}
		}
	};
	let MouseDownHandler=e=>
	{
		Mpos=new getMousePos(e);
		for(let i in buttons)
		{
			if(areaCheck(Mpos,buttons[i],0))
			{
				ctouchcheck.off("mousemove",MouseMoveHandler);
				buttons[i].drawIsCheck(cbtn,1);
				voices[2].stop();
				voices[2].play();
			}
			else buttons[i].drawNotCheck(cbtn,0);
		}
	};
	let MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		for(let i in buttons) 
			if(areaCheck(Mpos,buttons[i],0))buttons[i].drawIsCheck(cbtn,2);
	};
	let MouseClickHandler=e=>
	{
		Mpos=new getMousePos(e);
		for(let i in buttons) 
			if(areaCheck(Mpos,buttons[i],0))console.log("inside"+i);
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
	let DATA=JSON.parse(setData);
	let bg_img=DATA.bg.main;
	let button_btn=DATA.button.main;
	bg=new BG(bg_img);
	button_btn.forEach((v,i)=>{
		buttons[i]=new BUTTON(v);
	});
	voiceConstruct();
}
function SourceOnload()
{
	//loadingdraw(false);
	bg.draw(cbg);
	for(let i in buttons) buttons[i].drawNotCheck(cbtn,0);
	bgm.play();
	bgm.loop=true;
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	ObjConstruct();
	SourceLoadCheck(SourceOnload);
});