var ctouchcheck;
var ctcrk;
var cbackground;
var cbg;
var cbutton;
var cbtn;

var bg;
var back_btn;

function touchEventHandler()
{
	let Mpos;
	let MouseMoveHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,back_btn,0))
		{
			 back_btn.draw2(cbtn,2);
			 if(back_btn.PlayOnce())
			 {
				back_btn.PlayOnce(false);
				voices[1].stop();
				voices[1].play();
			 }
		}
		else 
		{
			back_btn.draw1(cbtn,0);
			back_btn.PlayOnce(true);
		}
	};
	let MouseDownHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,back_btn,0))
		{
			ctouchcheck.off("mousemove",MouseMoveHandler);
			back_btn.draw2(cbtn,1);
			voices[2].stop();
			voices[2].play();
		}
		else back_btn.draw1(cbtn,0);
	};
	let MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		if(areaCheck(Mpos,back_btn,0)) back_btn.draw1(cbtn,0);
	};
	let MouseClickHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,back_btn,0))document.location.replace("start_page.html");
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
	let back_img;
	let bg_img;
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
				bg_img=e.target.result.team;
			};
			req2.onsuccess=e=>{
				back_img=e.target.result.teamset;
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
		bg=Object.freeze(new BG(bg_img));
		back_btn=Object.freeze(new BUTTON(back_img[0]));
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
	back_btn.drawNotCheck(cbtn,0);
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	getData();
});