// 所有小鱼和数据（变量）和行为（方法）
// 1.创建小鱼类，babyObj[坐标，角度，眼睛，身体，尾巴]
var babyObj=function()
{
	this.x=[];
	this.y=[];
	this.angle=0;
	this.babyEye=[];
	this.babyBody=[];
	this.babyTail=[];
	// 1.6创建3个变量，切换小鱼眼睛的图片
	this.babyEyeIndex=0;//小鱼眼睛图片下标(0-1)
	this.babyEyeStart=1;// 计时开始
	this.babyEyeEnd=3000;//计时结束（切换图片）
	// 1.7创建3个变量，切换小鱼身体的图片
	this.babyBodyIndex=0;//(0-19)
	this.babyBodyStart=1;
	this.babyBodyEnd=2000;
	// 1.8创建3个变量，切换小鱼尾巴的图片
	this.babyTailIndex=0;//(0-7)
	this.babyTailStart=1;
	this.babyTailEnd=100;	
}
// 2.为小鱼类添加初始化方法init
babyObj.prototype.init=function()
{
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	for(var i=0;i<2;i++)
	{
		this.babyEye[i]=new Image();
		this.babyEye[i].src="src/babyEye"+i+".png";
	}
	// console.log(this.babyEye);
	for(var i=0;i<20;i++)
	{
		this.babyBody[i]=new Image();
		this.babyBody[i].src="src/babyFade"+i+".png";
	}
	// console.log(this.babyBody);
	for(var i=0;i<8;++i)
	{
		this.babyTail[i]=new Image();
		this.babyTail[i].src="src/babyTail"+i+".png";
	}
	// console.log(this.babyTail);
}
// 3.为小鱼类添加绘制方法
babyObj.prototype.draw=function()
{
	// 3.1修改小鱼位置（x,y）角度
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.99);
	// 计算坐标差，再计算角度差
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.6);
	// 3.2修改小鱼图片下标 眼睛 身体 尾巴
	//眼睛
	this.babyEyeStart+=deltaTime;
	if(this.babyEyeStart>this.babyEyeEnd)
	{
		this.babyEyeIndex=(this.babyEyeIndex+1)%2;//0和1来回切换
		this.babyEyeStart=1;
	}
	if(this.babyEyeIndex==0)
	{
		this.babyEyeEnd=3000;
	}
	if(this.babyEyeIndex==1)
	{
		this.babyEyeEnd=300;
	}
	//切换身体下标
	this.babyBodyStart+=deltaTime;
	if(this.babyBodyStart>this.babyBodyEnd)
	{
		this.babyBodyIndex=(this.babyBodyIndex+1)%20;//0和19来回切换
		this.babyBodyStart=1;
	}
	// console.log(this.babyBody[this.babyBodyIndex]);
	//切换尾巴下标
	this.babyTailStart+=deltaTime;
	if(this.babyTailStart>this.babyTailEnd)
	{
		this.babyTailIndex=(this.babyTailIndex+1)%8;//0和19来回切换
		this.babyTailStart=1;
	}

	// 3.4保存画笔状态
	ctx1.save();
	// 3.5设备画布原点
	ctx1.translate(this.x,this.y);
	// 3.6设备旋转角度
	ctx1.rotate(this.angle);
	// 3.7绘制身体
	ctx1.drawImage(this.babyBody[this.babyBodyIndex],-this.babyBody[this.babyBodyIndex].width*0.5,-this.babyBody[this.babyBodyIndex].height*0.5);
	// 3.8绘制尾巴
	ctx1.drawImage(this.babyTail[this.babyTailIndex],-this.babyTail[this.babyTailIndex].width*0.5+23,-this.babyTail[this.babyTailIndex].height*0.5);
	// 3.9绘制眼睛
	ctx1.drawImage(this.babyEye[this.babyEyeIndex],-this.babyEye[this.babyEyeIndex].width*0.5,-this.babyEye[this.babyEyeIndex].height*0.5);
	// 3.10恢复画笔状态
	ctx1.restore();
}
// 4.加载index.html文件中
// 5.在main.js创建小鱼类对象并调用相应方法