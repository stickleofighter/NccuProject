var ImageArray=new Array();
var bgm;
var vo1;
var vo2;

function areaCheck(mx,my,x1,y1,xs,ys)
{
	return mx>=x1&&mx<=(x1+xs)&&my>=y1&&my<=(y1+ys);
}
function haveChar(check_arr,check)
{	
	return check_arr.some(c=>c==check);
}
function getMousePos(e)
{
	return{
		get x(){return e.offsetX;},
		get y(){return e.offsetY;}
	}
}
function voiceConstruct()
{
	bgm=parent.frames['music'].bgm;
	vo1=parent.frames['music'].vo1;
	vo2=parent.frames['music'].vo2;
}
function voicePlay(url)
{
	vo1.ended?vo1.play():vo2.play();
}
function imageLoadCheck(callback)
{
	let t_img=setInterval(()=>{
		if(ImageArray.every((img)=>{
			return img.height>0;
		})){
			clearInterval(t_img),
			ImageArray.length=0;
			callback();
		}
	},100)
}