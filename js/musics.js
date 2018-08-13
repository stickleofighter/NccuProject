var bgm;
var vo1;
var vo2;
function voiceControl(kind)
{
	let voice=$(kind);
	voice[0].volume=0.5;
	return{
		muteswitch:()=>{
			voice[0].muted=!voice[0].muted;
		},
		play: ()=>{
			voice[0].play();
		},
		switchurl: (url)=>{
			voice[0].src=`media/voice/${url}.mp3`;
		},
		set volume(){
			voice[0].volume=num*0.005;
		},
		get ended(){
			return voice[0].ended;
		}
	};
}
$(document).ready(()=>{
	bgm=voiceControl("#bgMusic");
	vo1=voiceControl("#bgSound1");
	vo2=voiceControl("#bgSound2");
})