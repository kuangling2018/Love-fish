//创建大鱼类，保存大鱼的相关数据和行为
//位置，角度，图片，【游动，吃食物，喂小鱼】
//1.创建大鱼类
var momObj=function()
{
	// 1.1保存坐标
	this.x=0;
	this.y=0;
	// 1.2保存游动角度
	this.angle=0;
	// 1.3保存大鱼眼睛图片
	this.bigEye=[];
	// 1.4保存大鱼身体图片
	this.bigBody=[];
	// 1.5保存大鱼尾巴图片
	this.bigTail=[];
}
//2.为大鱼类添加初始化方法
momObj.prototype.init=function()
{
	// 2.1位置画布中心
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	// 2.2角度0
	this.angle=0;
	// 2.3创建循环，创建图片对象并且下载眼睁2张图片
	for(var i=0;i<2;i++)
	{
		this.bigEye[i]=new Image();
		this.bigEye[i].src="src/bigEye"+i+".png";
	}
	// console.log(this.bigEye);
	// 2.4创建循环，创建图片对象并且下载身体8张图片
	for(var i=0;i<8;i++)
	{
		this.bigBody[i]=new Image();
		this.bigBody[i].src="src/bigSwim"+i+".png";
	}
	// console.log(this.bigBody);
	// 2.5创建循环，创建图片对象并且下载尾巴8张图片
	for(var i=0;i<8;i++)
	{
		this.bigTail[i]=new Image();
		this.bigTail[i].src="src/bigTail"+i+".png";
	}
	// console.log(this.bigTail);
}
//3.为大鱼类添加绘制方法
momObj.prototype.draw=function()
{
	//0.5让大鱼向鼠标慢慢游过去
	this.x=lerpDistance(mx,this.x,0.98); //mx,my目标位置，即鼠标移动位置
	this.y=lerpDistance(my,this.y,0.99);
	// 06.修改大鱼的角度
	// 1.计算大鱼和鼠标坐标差
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	// 2.计算大鱼和鼠标的角度差 Math.atan2(y,x)+Math.PI
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;//目标角度值
	// 3.函数目标对象，源对象 速度 返回新角度
	this.angle=lerpAngle(beta,this.angle,0.9);
	// 1.保存画笔状态
	ctx1.save();
	// 2.平移原点，大鱼位置
	ctx1.translate(this.x,this.y);
	// 3.旋转角度，大鱼角度
	ctx1.rotate(this.angle);
	// 4.绘制身体
	ctx1.drawImage(this.bigBody[0],-this.bigBody[0].width*0.5,-this.bigBody[0].height*0.5);
	// 5.绘制尾巴
	ctx1.drawImage(this.bigTail[0],-this.bigTail[0].width*0.5+30,-this.bigTail[0].height*0.5);
	// 6.绘制眼睛
	ctx1.drawImage(this.bigEye[0],-this.bigEye[0].width*0.5,-this.bigEye[0].height*0.5);
	// 7.恢复画笔状态
	ctx1.restore();
}
//4.将mom.js加载index.html文件中
//5.在main.js创建大鱼对象并且调用相应方法