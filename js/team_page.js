let ctouchcheck;
let ctcrk;
let cbackground;
let cbg;
let cbutton;
let cbtn;

let bg;
let backs;

function touchEventHandler()
{
	const MouseMoveHandler=e=>
	{
		Mpos.getMousePos(e);
		if(areaCheck(Mpos,backs,0))
		{
			 backs.draw2(cbtn,2);
			 if(backs.PlayOnce())
			 {
				backs.PlayOnce(false);
				voices[1].stop();
				voices[1].play();
			 }
		}
		else 
		{
			backs.draw1(cbtn,0);
			backs.PlayOnce(true);
		}
	};
	const MouseDownHandler=e=>
	{
		Mpos.getMousePos(e);
		if(areaCheck(Mpos,backs,0))
		{
			ctouchcheck.off("mousemove",MouseMoveHandler);
			backs.draw2(cbtn,1);
			voices[2].stop();
			voices[2].play();
		}
		else backs.draw1(cbtn,0);
	};
	const MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		if(areaCheck(Mpos,backs,0)) backs.draw1(cbtn,0);
	};
	const MouseClickHandler=e=>
	{
		Mpos.getMousePos(e);
		if(areaCheck(Mpos,backs,0))document.location.replace("start_page.html");
	};
	const MouseOutHandler=MouseUpHandler;
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
	loading.setContext(ctcrk);
}
function getData()
{
	let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexed;
	let request;
	let db;
	let back_img;
	let bg_img;
	const dbget=()=>{
		loading.startloading();
		loading.message().start().next();
		return new Promise((res,rej)=>{			
			request=indexedDB.open("MonopolyLearnData",1);
			request.onsuccess=e=>{
				db=e.target.result;
				//console.log(`indexedDB資料庫MonopolyLearnData打開成功`);
				res();
			}
			request.onerror=e=>{rej(e.target.errorCode);}
		});
	};
	const dataget=()=>{
		//console.log(`開始取得資料`);
		loading.message().next();
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
	const ObjConstruct=()=>{
		loading.message().next().next();
		bg=Object.freeze(new BG(bg_img));
		backs=Object.freeze(new BUTTON(back_img[0]));
		voiceConstruct();
		SourceLoadCheck(SourceOnload);
	};
	const Error=e=>{console.log(e);};
	dbget().then(dataget).then(ObjConstruct).catch(Error);
}

function SourceOnload()
{
	loading.overloading();
	bg.draw(cbg);
	backs.draw1(cbtn,0);
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	getData();
});