let ctouchcheck;
let ctcrk;
let cbackground;
let cbg;
let cbutton;
let cbtn;

let bg;
let buttons=new Array();


function touchEventHandler()
{
	let Mpos;
	const MouseMoveHandler=e=>
	{
		Mpos=new getMousePos(e);
		for(let i in buttons)
		{
			if(areaCheck(Mpos,buttons[i],0))
			{
				buttons[i].draw2(cbtn,2);
				if(buttons[i].PlayOnce())
				{
					buttons[i].PlayOnce(false);
					voices[1].stop();
					voices[1].play();
				}
			}
			else
			{
				buttons[i].PlayOnce(true);
				buttons[i].draw1(cbtn,0);
			}
		}
	};
	const MouseDownHandler=e=>
	{
		Mpos=new getMousePos(e);
		for(let i in buttons)
		{
			if(areaCheck(Mpos,buttons[i],0))
			{
				ctouchcheck.off("mousemove",MouseMoveHandler);
				buttons[i].draw2(cbtn,1);
				voices[2].stop();
				voices[2].play();
			}
			else buttons[i].draw1(cbtn,0);
		}
	};
	const MouseUpHandler=e=>
	{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		if(areaCheck(Mpos,buttons[0],0))buttons[0].draw2(cbtn,2);
		if(areaCheck(Mpos,buttons[1],0))buttons[1].draw2(cbtn,2);
		if(areaCheck(Mpos,buttons[2],0))buttons[2].draw2(cbtn,2);
		if(areaCheck(Mpos,buttons[3],0))buttons[3].draw2(cbtn,2);
	};
	const MouseClickHandler=e=>
	{
		Mpos=new getMousePos(e);
		if(areaCheck(Mpos,buttons[2],0)) document.location.replace("team_page.html");
	};
	const MouseOutHandler=e=>{
		ctouchcheck.on("mousemove",MouseMoveHandler);
		for(let i in buttons) buttons[i].draw1(cbtn,0);
	};
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
	let buttons_btn=new Array();
	let bg_btn;
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
	const ObjConstruct=()=>{
		loading.message().next().next();
		bg=Object.freeze(new BG(bg_btn));
		buttons_btn.forEach((v,i)=>{
			buttons[i]=Object.freeze(new BUTTON(v));
		});
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
	for(let i in buttons) buttons[i].draw1(cbtn,0);
	bgm.play();
	touchEventHandler();
}

$(document).ready(()=>{
	canvasContext();
	getData();
});