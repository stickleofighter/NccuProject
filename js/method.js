var ImageArray=new Array();
var bgm;
var voices=new Array();

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
	bgm=parent.frames['music'].bgm;
	voices=parent.frames['music'].voices;
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


function BG(bg)
{
	let Images=new Image();
	Images.src=bg.url;
	ImageArray.push(Images);
	this["draw"]=context=>{context.drawImage(Images,bg.x,bg.y,bg.w,bg.h);}
}
function BUTTON(btn)
{
	let num=btn.url.length;
	let Images=new Array();
	for(let i=0;i<num;i++) Images.push(new Image());
	Images.forEach((v,i)=>{
		v.src=btn.url[i];
		ImageArray.push(v);}
		);
	let ww=[btn.w,btn.w*0.9,btn.w*1.1];
	let hh=[btn.h,btn.h*0.9,btn.h*1.1];
	let xx=[btn.x,btn.x+(ww[0]-ww[1])/2,btn.x-(ww[2]-ww[0])/2];
	let yy=[btn.y,btn.y+(hh[0]-hh[1])/2,btn.y-(hh[2]-hh[0])/2];
	let PlayOnce=true;
	this["w"]=i=>ww[i];
	this["h"]=i=>hh[i];
	this["x"]=i=>xx[i];
	this["y"]=i=>yy[i];
	this["PlayOnce"]=(...ar)=>{
		if(ar.length===0)return PlayOnce;
		else ar.length==1&&typeof(ar[0])=="boolean"?PlayOnce=ar[0]:PlayOnce=true;
	};
	for(let i=0;i<num;i++)
	{
		this[`draw${i+1}`]=(context,bs)=>{
			context.clearRect(xx[2],yy[2],ww[2],hh[2]);
			context.drawImage(Images[i],xx[bs],yy[bs],ww[bs],hh[bs]);
		};
	}
}
function LOADING(context)
{
	function Print()
	{
		this["x"]=200;
		this["y"]=210;
		this["r"]=20;
		this["lw"]=3;
		this["font"]=["30px Arial","10px Arial"];
	}
	let message;
	let counts=0;
	let t_lod;
	let print=new Print();
	this["message"]=mes=>{
		typeof(mes)=="string"?message=mes:message="等待中...";
	}
	this["overloading"]=()=>{
		context.clearRect(circle.x-1.5*circle.r,circle.y-1.5*circle.r,700,500);
		clearInterval(t_lod);
	};
	this["startloading"]=()=>{
		t_lod=setInterval(()=>{
			ctcrk.lineWidth=circle.lw;
			ctcrk.font=circle.font;
			context.clearRect(circle.x-1.5*circle.r,circle.y-1.5*circle.r,500,500);
			context.beginPath();
			context.arc(circle.x,circle.y,circle.r,counts*Math.PI/9,(counts+3)*Math.PI/9);
			context.stroke();
			context.beginPath();
			context.arc(circle.x,circle.y,circle.r,(counts+6)*Math.PI/9,(counts+9)*Math.PI/9);
			context.stroke();
			context.beginPath();
			context.arc(circle.x,circle.y,circle.r,(counts+12)*Math.PI/9,(counts+15)*Math.PI/9);
			context.stroke();
			switch(counts)
			{
				case 0:case 1:
					context.fillText("Loading .",circle.x+circle.r*2,circle.y+circle.r/2);
					break;
				case 2:case 3:
					context.fillText("Loading . .",circle.x+circle.r*2,circle.y+circle.r/2);
					break;
				case 4:case 5:
					context.fillText("Loading . . .",circle.x+circle.r*2,circle.y+circle.r/2);
					break;
			}
			counts=counts==5?0:counts+1;
		},60);
	};
}