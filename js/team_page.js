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