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
	return VoiceArray.every((voi)=>{
		return voi.readyState==4;
	});
	
}
$(document).ready(()=>{
	bgm=voiceControl("bgm");
	for(let i=0;i<6;i++) voices[i]=voiceControl(`00${i+1}`);
})