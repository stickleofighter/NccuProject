var ctouchcheck;
var ctcrk;
var cbackground;
var cbg;
var cbutton;
var cbtn;

function BG()
{
	let Images=new Image();
	Images.src="../pic/main_page/team_page.png";
	ImageArray.push(Images);
	let xx=0;
	let yy=0;
	let ww=750;
	let hh=420;
	return{
		draw: ()=>{cbg.drawImage(Images,xx,yy,ww,hh);}
	};
}
function CHECK(url,x,y,w,h)
{
	let Images=new Image();
	let Images2=new Image();
	Images.src=`media/pic/main_page/${url}_1.png`;
	Images2.src=`media/pic/main_page/${url}_2.png`;
	ImageArray.push(Images);
	ImageArray.push(Images2);
	let PlayOnce=true;
	let ww=[w,w*0.9,w*1.1];
	let hh=[h,h*0.9,h*1.1];
	let xx=[x,x+(ww[0]-ww[1])/2,x-(ww[2]-ww[0])/2];
	let yy=[y,y+(hh[0]-hh[1])/2,y-(hh[2]-hh[0])/2];
}