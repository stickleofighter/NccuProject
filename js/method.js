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