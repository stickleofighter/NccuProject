var ctouchcheck;
var ctcrk;
var cbutton;
var cbtn;
var loading;
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
			 skips.draw1(cbtn,2);
			 if(skips.PlayOnce())
			 {
				skips.PlayOnce(false);
				voices[1].stop();
				voices[1].play();
			 }
		}
		else 
		{
			skips.draw1(cbtn,0);
			skips.PlayOnce(true);
		}
	};
	let MouseDownHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,skips,0))
		{
			ctouchcheck.off("mousemove",MouseMoveHandler);
			skips.draw1(cbtn,1);
			voices[2].stop();
			voices[2].play();
		}
		else skips.draw1(cbtn,0);
	};
	let MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		if(areaCheck(Mpos,skips,0)) skips.draw1(cbtn,0);
	};
	let MouseClickHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,skips,0))document.location.replace("start_page.html");
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
	cbutton=$("#buttonimg");
	cbtn=cbutton[0].getContext("2d");
	loading=Object.freeze(new LOADING(ctcrk));
}


function SourceOnload()
{
	loading.overloading();
	skips.draw1(cbtn,0);
	vidEndCheck();
	touchEventHandler();
}
function getData()
{
	let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexed;
	let request;
	let db;
	let skip_btn;
	let dbget=()=>{
		loading.startloading();
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
			let req=objectStore.get("button");
			req.onsuccess=e=>{
				skip_btn=e.target.result.skip;
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
		skips=Object.freeze(new BUTTON(skip_btn[0]));
		voiceConstruct();
		SourceLoadCheck(SourceOnload);
	};
	let Error=e=>{console.log(e);};
	dbget().then(dataget).then(ObjConstruct).catch(Error);
}
$(document).ready(()=>{
	canvasContext();
	getData();
});