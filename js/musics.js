var VoiceArray=new Array();

var bgm;
var voices=new Array();
function voiceControl(url)
{
	let voice=new Audio();
	voice.src=`media/voice/${url}.mp3`;
	VoiceArray.push(voice);
	voice.volume=0.5;
	return{
		muteswitch:()=>{
			voice.muted=!voice.muted;
		},
		play: ()=>{
			voice.play();
		},
		pause: ()=>{
			voice.pause();
		},
		stop: ()=>{
			voice.pause();
			voice.currentTime=0;
		},
		set loop(tf){
			voice.loop=tf;
		},
		set volume(num){
			voice.volume=num*0.005;
		},
		get ended(){
			return voice.ended;
		}
	};
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
	bgm=voiceControl("bgm");
	for(let i=0;i<6;i++) voices[i]=voiceControl(`00${i+1}`);
	voiceLoadCheck();
})