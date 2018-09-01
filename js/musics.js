var VoiceArray=new Array();

var bgm;
var voices=new Array();
function voiceControl(url)
{
	let voice=new Audio();
	voice.src=`media/voice/${url}.mp3`;
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
}

function voiceLoadCheck()
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
	
}
$(document).ready(()=>{
	bgm=new voiceControl("bgm");
	for(let i=0;i<6;i++) voices[i]=new voiceControl(`00${i+1}`);
	voiceLoadCheck();
})