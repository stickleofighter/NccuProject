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
		if(areaCheck(Mpos,buttons[0],0))buttons[0].drawIsCheck(cbtn,2);
		if(areaCheck(Mpos,buttons[1],0))buttons[1].drawIsCheck(cbtn,2);
		if(areaCheck(Mpos,buttons[2],0))buttons[2].drawIsCheck(cbtn,2);
		if(areaCheck(Mpos,buttons[3],0))buttons[3].drawIsCheck(cbtn,2);
	};
	let MouseClickHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,buttons[2],0)) document.location.replace("team_page.html");
	};
	let MouseOutHandler=MouseUpHandler;
	ctouchcheck.on("mousemove",MouseMoveHandler);
	ctouchcheck.on("mousedown",MouseDownHandler);
	ctouchcheck.on("mouseup",MouseUpHandler);
	ctouchcheck.on("click",MouseClickHandler);
	ctouchcheck.on("mouseout",MouseOutHandler);
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
function getData()
{
	let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexed;
	let request;
	let db;
	let buttons_btn=new Array();
	let bg_btn;
	let dbget=()=>{
		loadingdraw(true);
		return new Promise((res,rej)=>{			
			request=indexedDB.open("MonopolyLearnData",1);
			request.onsuccess=e=>{
				db=e.target.result;
				console.log(`indexedDB資料庫MonopolyLearnData打開成功`);
				res();
			}
			request.onerror=e=>{rej(e.target.errorCode);}
		});
	};
	let dataget=()=>{
		console.log(`開始取得資料`);
		return new Promise((res,rej)=>{
			let transaction=db.transaction(["dataSet"],"readwrite");
			let objectStore=transaction.objectStore("dataSet");
			let req1=objectStore.get("bg");
			let req2=objectStore.get("button");
			req1.onsuccess=e=>{
				bg_btn=e.target.result.main;
			};
			req2.onsuccess=e=>{
				buttons_btn=e.target.result.main;
			}
			transaction.oncomplete=e=>{
				res();
			};
			transaction.onerror=e=>{
				rej(e.target.errorCode);
			}
		});
	};
	let ObjConstruct=()=>{
		bg=new BG(bg_btn);
		buttons_btn.forEach((v,i)=>{
			buttons[i]=new BUTTON(v);
		});
		voiceConstruct();
		SourceLoadCheck(SourceOnload);
	};
	let Error=e=>{console.log(e);};
	dbget().then(dataget).then(ObjConstruct).catch(Error);
}
function SourceOnload()
{
	loadingdraw(false);
	bg.draw(cbg);
	for(let i in buttons) buttons[i].drawNotCheck(cbtn,0);
	bgm.play();
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	getData();
});