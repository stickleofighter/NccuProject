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
	const MouseMoveHandler=e=>
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
	const MouseDownHandler=e=>
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
	const MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		if(areaCheck(Mpos,skips,0)) skips.draw1(cbtn,0);
	};
	const MouseClickHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,skips,0))document.location.replace("start_page.html");
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
	cbutton=$("#buttonimg");
	cbtn=cbutton[0].getContext("2d");
	loading.setContext(ctcrk);
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
	const dbget=()=>{
		loading.startloading();
		loading.message(`正在連線資料庫`);
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
	const dataget=()=>{
		console.log(`開始取得資料`);
		loading.message(`正在獲取資料`);
		return new Promise((res,rej)=>{
			let transaction=db.transaction(["dataSet"],"readwrite");
			let objectStore=transaction.objectStore("dataSet");
			let req=objectStore.get("button");
			req.onsuccess=e=>{
				skip_btn=e.target.result.skip;
			}
			transaction.oncomplete=e=>{
				loading.message(`已獲取資料`);
				res();
			};
			transaction.onerror=e=>{
				rej(e.target.errorCode);
			}
		});
	};
	const ObjConstruct=()=>{
		loading.message(`正在建立遊戲物件`);
		skips=Object.freeze(new BUTTON(skip_btn[0]));
		voiceConstruct();
		SourceLoadCheck(SourceOnload);
	};
	const Error=e=>{console.log(e);};
	dbget().then(dataget).then(ObjConstruct).catch(Error);
}
$(document).ready(()=>{
	canvasContext();
	getData();
});