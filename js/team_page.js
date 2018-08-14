var ctouchcheck;
var ctcrk;
var cbackground;
var cbg;
var cbutton;
var cbtn;

var bg;
var check_btn;

function BG()
{
	let Images=new Image();
	Images.src="../pic/main_page/team_page.png";
	ImageArray.push(Images);
	let xx=0;
	let yy=0;
	let ww=750;
	let hh=420;
	return{
		draw: ()=>{cbg.drawImage(Images,xx,yy,ww,hh);}
	};
}
function CHECK(url,x,y,w,h)
{
	let Images=new Image();
	let Images2=new Image();
	Images.src=`media/pic/main_page/${url}_1.png`;
	Images2.src=`media/pic/main_page/${url}_2.png`;
	ImageArray.push(Images);
	ImageArray.push(Images2);
	let PlayOnce=true;
	let ww=[w,w*0.9,w*1.1];
	let hh=[h,h*0.9,h*1.1];
	let xx=[x,x+(ww[0]-ww[1])/2,x-(ww[2]-ww[0])/2];
	let yy=[y,y+(hh[0]-hh[1])/2,y-(hh[2]-hh[0])/2];
	return{
		get x(){return xx;},
		get y(){return yy;},
		get w(){return ww;},
		get h(){return hh;},
		get MovePlayOnce(){return PlayOnce;},
		set MovePlayOnce(tf){PlayOnce=tf;},
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