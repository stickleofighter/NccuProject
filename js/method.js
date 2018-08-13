var ImageArray=new Array();
var bgm;
var voices=new Array();
var voiCheck=false;

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
	if(JSON.parse(localStorage["voiceloadcheck"]))
	{
		bgm=parent.frames['music'].bgm;
		voices=parent.frames['music'].voices;
		voiCheck=true;	
	}
}
function SourceLoadCheck(callback)
{
	let t_img=setInterval(()=>{
		if(ImageArray.every((img)=>{
			return img.height>0;
		})&&voiCheck){
			clearInterval(t_img),
			ImageArray.length=0;
			callback();
		}
	},100)
}
function loadingdraw(over=true)
{
	let counts=0;
	ctcrk.lineWidth=10;
	let t_lod=setInterval(()=>{
		switch(counts)
		{
			case 0:
				ctcrk.beginPath();
				ctcrk.arc(375,210,50,0,3*Math.PI/9);
				ctcrk.arc(375,210,50,6*Math.PI/9,9*Math.PI/9);
				ctcrk.arc(375,210,50,12*Math.PI/9,15*Math.PI/9);
				ctcrk.stroke();
				break;
			case 1:
				ctcrk.beginPath();
				ctcrk.arc(375,210,50,Math.PI/9,4*Math.PI/9);
				ctcrk.arc(375,210,50,7*Math.PI/9,10*Math.PI/9);
				ctcrk.arc(375,210,50,13*Math.PI/9,16*Math.PI/9);
				ctcrk.stroke();
				break;
			case 2:
				ctcrk.beginPath();
				ctcrk.arc(375,210,50,2*Math.PI/9,5*Math.PI/9);
				ctcrk.arc(375,210,50,8*Math.PI/9,11*Math.PI/9);
				ctcrk.arc(375,210,50,14*Math.PI/9,17*Math.PI/9);
				ctcrk.stroke();
				counts=0;
				break;
		}
		counts++;
	},300)
	if(!over)
	{
		ctcrk.clearRect(320,155,100,100);
		clearInterval(t_lod);
	}
}