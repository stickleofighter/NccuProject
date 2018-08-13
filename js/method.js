var ImageArray=new Array();
var bgm;
var voices=new Array();
var voiCheck;

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
	voices=parent.frames['music'].voices;
	voiCheck=parent.frames['music'].voiceLoadCheck;
}
function SourceLoadCheck(callback)
{
	let t_img=setInterval(()=>{
		if(ImageArray.every((img)=>{
			return img.height>0;
		})&&voiCheck()){
			clearInterval(t_img),
			ImageArray.length=0;
			callback();
		}
	},100)
}