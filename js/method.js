const ImageArray=new Array();
let bgm;
let voices=new Array();
const Mpos=new getMousePos();
const loading=Object.freeze(new LOADING());

function areaCheck(Mouse,target,bs=0)
{
	return Mouse.x()>=target.x(bs)&&Mouse.x()<=(target.x(bs)+target.w(bs))&&Mouse.y()>=target.y(bs)&&Mouse.y()<=(target.y(bs)+target.h(bs));
}
function haveChar(check_arr,check)
{	
	return check_arr.some(c=>c==check);
}
function voiceConstruct()
{
	[bgm,voices]=parent.frames['music'].getObj();
}
function getLoading()
{
	return loading;
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
	loading.message().next();
	Promise.all(ilArray).then(parent.frames['music'].getData).then(()=>{
	loading.message().next().next();
		ImageArray.length=0;
		callback();
	}).catch(e=>{console.log(e);});
}

function getMousePos()
{
	let x;
	let y;
	let pre_x;
	let pre_y;
	this["x"]=()=>x;
	this["y"]=()=>y;
	this["prex"]=()=>pre_x;
	this["prey"]=()=>pre_y;
	this["getMousePos"]=e=>{
		x=e.offsetX;
		y=e.offsetY;
	};
	this["getPreMousePos"]=e=>{
		pre_x=x;
		pre_y=y;
	}
}
function BG(bg)
{
	const Images=new Image();
	Images.src=bg.url;
	ImageArray.push(Images);
	this["draw"]=context=>{context.drawImage(Images,bg.x,bg.y,bg.w,bg.h);}
}
function BUTTON(btn)
{
	const num=btn.url.length;
	const Images=new Array();
	for(let i=0;i<num;i++) Images.push(new Image());
	Images.forEach((v,i)=>{
		v.src=btn.url[i];
		ImageArray.push(v);}
		);
	const ww=[btn.w,btn.w*0.9,btn.w*1.1];
	const hh=[btn.h,btn.h*0.9,btn.h*1.1];
	const xx=[btn.x,btn.x+(ww[0]-ww[1])/2,btn.x-(ww[2]-ww[0])/2];
	const yy=[btn.y,btn.y+(hh[0]-hh[1])/2,btn.y-(hh[2]-hh[0])/2];
	let PlayOnce=true;
	let isDown=false;
	let isClick=true;
	this["w"]=i=>ww[i];
	this["h"]=i=>hh[i];
	this["x"]=i=>xx[i];
	this["y"]=i=>yy[i];
	this["sx"]=v=>{xx[0]=v};
	this["sy"]=v=>{yy[0]=v};
	this["sw"]=v=>{ww[0]=v};
	this["sh"]=v=>{hh[0]=v};
	this["PlayOnce"]=(...ar)=>{
		if(ar.length===0)return PlayOnce;
		else ar.length==1&&typeof(ar[0])=="boolean"?PlayOnce=ar[0]:PlayOnce=true;
	};
	this["isDown"]=(...ar)=>{
		if(ar.length===0)return isDown;
		else ar.length==1&&typeof(ar[0])=="boolean"?isDown=ar[0]:isDown=true;
	};
	this["isClick"]=(...ar)=>{
		if(ar.length===0)return isClick;
		else ar.length==1&&typeof(ar[0])=="boolean"?isClick=ar[0]:isClick=true;
	};
	for(let i=0;i<num;i++)
	{
		this[`draw${i+1}`]=(context,bs,x_fix=0,y_fix=0)=>{
			context.clearRect(xx[2]+x_fix,yy[2]+y_fix,ww[2],hh[2]);
			context.drawImage(Images[i],xx[bs]+x_fix,yy[bs]+y_fix,ww[bs],hh[bs]);
		};
	}
	this["clear"]=(context,x_fix=0,y_fix=0)=>{
		context.clearRect(xx[2]+x_fix,yy[2]+y_fix,ww[2],hh[2]);
	}
}
function NOIMGBOX(box)
{
	const w=box.w;
	const h=box.h;
	const x=box.x;
	const y=box.y;
	this["w"]=()=>w;
	this["h"]=()=>h;
	this["x"]=()=>x;
	this["y"]=()=>y;
	
}

function LOADING()
{
	const loadingState=[
		'載入中',
		'正在連線資料庫',
		'正在獲取資料',
		'正在載入影片',
		'正在建立遊戲物件',
		'正在檢察圖片載入情況',
		[
			'(音訊)正在連線資料庫',
			'開始取得音訊資料',
			'正在建立音訊物件',
			'正在檢查音訊載入情況',
			'音訊載入完成',
		],
		'載入完成'
	];
	let context;
	let counts=0;
	let t_lod;
	function Message()
	{
		let count=0,v_count=0;
		let message;
		const show=()=>{
			message=loadingState[count];
		};
		const v_show=()=>{
			message=loadingState[6][v_count];
		}
		this["start"]=()=>{
			count=0;
			show();
			return this;
		};
		this["next"]=()=>{
			count++;
			show();
			return this;
		};
		this["vstart"]=()=>{
			v_count=0;
			v_show();
			return this;
		};
		this["vnext"]=()=>{
			v_count++;
			v_show();
			return this;
		};
		this["get"]=()=>{
			return message;
		}
	}
	function Print()
	{
		this["x"]=200;
		this["y"]=210;
		this["r"]=20;
		this["lw"]=[3,1];
		this["font"]=["30px Arial","15px Arial"];
	}
	const print=Object.freeze(new Print());
	const message=Object.freeze(new Message());
	this["setContext"]=con=>{
		context=con;
	}
	this["message"]=()=>{
		return message;
	}
	this["overloading"]=()=>{
		context.clearRect(0,0,750,420);
		clearInterval(t_lod);
	};
	this["startloading"]=()=>{
		t_lod=setInterval(()=>{
			context.clearRect(0,0,750,420);
			context.lineWidth=print.lw[0];
			context.font=print.font[0];
			context.beginPath();
			context.arc(print.x,print.y,print.r,counts*Math.PI/9,(counts+3)*Math.PI/9);
			context.stroke();
			context.beginPath();
			context.arc(print.x,print.y,print.r,(counts+6)*Math.PI/9,(counts+9)*Math.PI/9);
			context.stroke();
			context.beginPath();
			context.arc(print.x,print.y,print.r,(counts+12)*Math.PI/9,(counts+15)*Math.PI/9);
			context.stroke();
			
			context.beginPath();
			context.arc(print.x,print.y,print.r/2,((5-counts)+12)*Math.PI/9,((5-counts)+15)*Math.PI/9);
			context.stroke();
			context.beginPath();
			context.arc(print.x,print.y,print.r/2,((5-counts)+6)*Math.PI/9,((5-counts)+9)*Math.PI/9);
			context.stroke();
			context.beginPath();
			context.arc(print.x,print.y,print.r/2,(5-counts)*Math.PI/9,((5-counts)+3)*Math.PI/9);
			context.stroke();
			switch(counts)
			{
				case 0:case 1:
					context.fillText("Loading .",print.x+print.r*2,print.y+print.r/2);
					break;
				case 2:case 3:
					context.fillText("Loading . .",print.x+print.r*2,print.y+print.r/2);
					break;
				case 4:case 5:
					context.fillText("Loading . . .",print.x+print.r*2,print.y+print.r/2);
					break;
			}
			context.lineWidth=print.lw[1];
			context.font=print.font[1];
			context.fillText(message.get(),print.x+print.r*2,print.y+3*print.r/2);
			counts=counts==5?0:counts+1;
		},60);
	};
}