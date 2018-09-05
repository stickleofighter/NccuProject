var ImageArray=new Array();
var bgm;
var voices=new Array();
var voiCheck=false;
var t_lod;

function areaCheck(Mouse,target,bs)
{
	return Mouse.x()>=target.x(bs)&&Mouse.x()<=(target.x(bs)+target.w(bs))&&Mouse.y()>=target.y(bs)&&Mouse.y()<=(target.y(bs)+target.h(bs));
}
function haveChar(check_arr,check)
{	
	return check_arr.some(c=>c==check);
}
function getMousePos(e)
{
	this["x"]=()=>e.offsetX;
	this["y"]=()=>e.offsetY;
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
	let imgload=img=>new Promise((res,rej)=>{
		img.onload=()=>{res();}
	});
	let ilArray=new Array();
	ImageArray.forEach((v,i)=>{
		ilArray[i]=imgload(v);
	});
	Promise.all(ilArray).then(parent.frames['music'].getData).then(()=>{
		ImageArray.length=0;
		callback();
	}).catch(e=>{console.log(e);});
}
/*function loadingdraw(over=true)
{
	let counts=0;
	ctcrk.lineWidth=5;
	if(!over)
	{
		ctcrk.clearRect(300,135,150,150);
		clearInterval(t_lod);
	}
	else{
		t_lod=setInterval(()=>{
		switch(counts)
		{
			case 0:
				ctcrk.clearRect(300,135,150,150);
				ctcrk.beginPath();
				ctcrk.arc(375,210,50,0,3*Math.PI/9);
				ctcrk.arc(375,210,50,6*Math.PI/9,9*Math.PI/9);
				ctcrk.arc(375,210,50,12*Math.PI/9,15*Math.PI/9);
				ctcrk.stroke();
				break;
			case 1:
				ctcrk.clearRect(300,135,150,150);
				ctcrk.beginPath();
				ctcrk.arc(375,210,50,Math.PI/9,4*Math.PI/9);
				ctcrk.arc(375,210,50,7*Math.PI/9,10*Math.PI/9);
				ctcrk.arc(375,210,50,13*Math.PI/9,16*Math.PI/9);
				ctcrk.stroke();
				break;
			case 2:
				ctcrk.clearRect(300,135,150,150);
				ctcrk.beginPath();
				ctcrk.arc(375,210,50,2*Math.PI/9,5*Math.PI/9);
				ctcrk.arc(375,210,50,8*Math.PI/9,11*Math.PI/9);
				ctcrk.arc(375,210,50,14*Math.PI/9,17*Math.PI/9);
				ctcrk.stroke();
				break;
		}
		counts=counts==2?0:counts;
		},150);
	}
}*/
function BG(bg)
{
	let Images=new Image();
	Images.src=bg.url;
	ImageArray.push(Images);
	this["draw"]=context=>{context.drawImage(Images,bg.x,bg.y,bg.w,bg.h);}
}
function BUTTON(btn)
{
	let Images=[new Image(),new Image()];
	Images.forEach((v,i)=>{
		v.src=btn.url[i];
		ImageArray.push(v);}
		);
	let ww=[btn.w,btn.w*0.9,btn.w*1.1];
	let hh=[btn.h,btn.h*0.9,btn.h*1.1];
	let xx=[btn.x,btn.x+(ww[0]-ww[1])/2,btn.x-(ww[2]-ww[0])/2];
	let yy=[btn.y,btn.y+(hh[0]-hh[1])/2,btn.y-(hh[2]-hh[0])/2];
	this.PlayOnce=true;
	this["w"]=i=>ww[i];
	this["h"]=i=>hh[i];
	this["x"]=i=>xx[i];
	this["y"]=i=>yy[i];
	this["drawNotCheck"]=(context,bs)=>{
		context.clearRect(xx[2],yy[2],ww[2],hh[2]);
		context.drawImage(Images[0],xx[bs],yy[bs],ww[bs],hh[bs]);
	};
	this["drawIsCheck"]=(context,bs)=>{
		context.clearRect(xx[2],yy[2],ww[2],hh[2]);
		context.drawImage(Images[1],xx[bs],yy[bs],ww[bs],hh[bs]);
	};
}