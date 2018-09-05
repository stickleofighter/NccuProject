var VoiceArray=new Array();

var bgm;
var voices=new Array();
var loadCheck=false;
function voiceControl(url)
{
	let voice=new Audio();
	voice.src=url;
	VoiceArray.push(voice);
	voice.volume=0.5;
	this["muteswitch"]=()=>{
		voice.muted=!voice.muted;
	};
	this["play"]=()=>{
		voice.play();
	};
	this["pause"]=()=>{
		voice.pause();
	};
	this["stop"]=()=>{
		voice.pause();
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
			return new Promise((res,rej)=>{			
				request=indexedDB.open("MonopolyLearnData",1);
				request.onsuccess=e=>{
					db=e.target.result;
					console.log(`(音訊)indexedDB資料庫MonopolyLearnData打開成功`);
					res();
				}
				request.onerror=e=>{rej(e.target.errorCode);}
			});
		};
		let dataget=()=>{	
			console.log(`開始取得音訊資料`);
			return new Promise((res,rej)=>{
				let transaction=db.transaction(["dataSet"],"readwrite");
				let objectStore=transaction.objectStore("dataSet");
				let req=objectStore.get("sound");
				req.onsuccess=e=>{
					bgm_vol=e.target.result.bgm;
					voices_vol=e.target.result.voice;
				};
				transaction.oncomplete=e=>{
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
				res();
			});
		};
		let allVolCheck=()=>{
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
		let finish=()=>{loadCheck=true;resolve();};
		let Error=e=>{console.log(e);};
		
		dbget().then(dataget).then(objectConstruct).then(allVolCheck).then(finish).catch(Error);
	});
}

/*function voiceLoadCheck()
{
	let t_voi=setInterval(()=>{
		if(VoiceArray.every(voi=>{
		return voi.readyState==4;
	}))
	{
		clearInterval(t_voi);
		localStorage["voiceloadcheck"]=JSON.stringify(true);
		parent.frames['main'].voiceConstruct();
	}
	},100)
	
}*/
$(document).ready(()=>{
	/*bgm=new voiceControl("bgm");
	for(let i=0;i<6;i++) voices[i]=new voiceControl(`00${i+1}`);
	voiceLoadCheck();*/
})