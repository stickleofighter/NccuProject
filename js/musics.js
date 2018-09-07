var VoiceArray=new Array();

var bgm;
var voices=new Array();
var loadCheck=false;
var loading;

function voiceControl(url)
{
	let voice=new Audio();
	voice.src=url;
	VoiceArray.push(voice);
	voice.volume=0.5;
	let playPromise;
	let pause2=()=>{
		if(playPromise!==undefined)
		{
			playPromise.then(()=>{voice.pause();}).catch(e=>console.log(e));
		}
	}
	this["muteswitch"]=()=>{
		voice.muted=!voice.muted;
	};
	this["play"]=()=>{
		voice.play();
	};
	this["pause"]=()=>{
		pause2();
	};
	this["stop"]=()=>{
		pause2();
		voice.currentTime=0;
	};
	this["loop"]=(tf=true)=>{
		voice.loop=tf;
	};
	this["volume"]=(num=100)=>{
		voice.volume=num*0.005;
	};
	this["ended"]=()=>voice.ended;
	
	this["addEventListener"]=(attribute,func)=>{voice.addEventListener(attribute,func)};
}
function getData()
{
	loading=parent.frames['main'].loading;
	return new Promise((resolve,reject)=>{
		if(loadCheck)
		{
			resolve();
			return;
		}
		let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexed;
		let request;
		let db;
		let bgm_vol;
		let voices_vol=new Array();
		let dbget=()=>{
			loading.message(`正在連線資料庫`);
			return new Promise((res,rej)=>{			
				request=indexedDB.open("MonopolyLearnData",1);
				request.onsuccess=e=>{
					db=e.target.result;
					console.log(`(音訊)indexedDB資料庫MonopolyLearnData打開成功`);
					loading.message(`已連線資料庫`);
					res();
				}
				request.onerror=e=>{rej(e.target.errorCode);}
			});
		};
		let dataget=()=>{	
			console.log(`開始取得音訊資料`);
			loading.message(`正在獲取資料`);
			return new Promise((res,rej)=>{
				let transaction=db.transaction(["dataSet"],"readwrite");
				let objectStore=transaction.objectStore("dataSet");
				let req=objectStore.get("sound");
				req.onsuccess=e=>{
					bgm_vol=e.target.result.bgm;
					voices_vol=e.target.result.voice;
				};
				transaction.oncomplete=e=>{
					loading.message(`已獲取資料`);
					res();
				};
				transaction.onerror=e=>{
					rej(e.target.errorCode);
				}
			});
		};
		let objectConstruct=()=>{
			console.log(`開始音訊建構...`)
			return new Promise((res,rej)=>{
				bgm=new voiceControl(bgm_vol.url);
				voices_vol.forEach(v=>{
					voices.push(new voiceControl(v.url));
				});
				bgm.loop(true);
				loading.message(`已建立音訊實體`);
				res();
			});
		};
		let allVolCheck=()=>{
			console.log(`開始載入測試...`);
			loading.message(`正在檢察音訊載入情況`);
			return new Promise((res,rej)=>{
				let lc=vol=>{
					return new Promise((rs,rj)=>{
						vol.addEventListener("canplaythrough",()=>{
							rs();
						});
					});
				};
				let literal=new Array();
				literal.push(lc(bgm));
				voices.forEach(v=>{
					literal.push(lc(v));
				});
				Promise.all(literal).then(()=>{res();}).catch(e=>{console.log(e)});
			});
		};
		let finish=()=>{
			console.log("建構完成");
			loading.message(`音訊載入完成`);
			loadCheck=true;
			resolve();
			};
		let Error=e=>{console.log(e);};
		
		dbget().then(dataget).then(objectConstruct).then(allVolCheck).then(finish).catch(Error);
	});
}


$(document).ready(()=>{

})