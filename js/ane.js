//该文件保存海葵数据与行为
//海葵数据 x len 数量50
//1.创建海葵类
// var aneObj=function()
// {
// 	this.x=[];//保存每个海葵的x坐标
// 	this.len=[];//保存每个海葵的高度
// }
//2.为海葵类添加属性num=50
// aneObj.prototype.num=50;
//3.为海葵添加init方法
// aneObj.prototype.init=function()
// {
// 	for(var i=0;i<this.num;i++)
// 	{
// 		//初始化每个海葵的高度 200基准高 50像素随机
// 		this.len[i]=200+Math.random()*50;
// 		//初始化每个海葵x位置 16基准像素 20随机值
// 		this.x[i]=i*16+Math.random()*20;
// 	}
// }
//4.为海葵类添加draw方法
// aneObj.prototype.draw=function()
// {
// 	ctx2.save();
// 	ctx2.strokeStyle='#3b154e';
// 	ctx2.globalAlpha=0.6;//透明度
// 	ctx2.lineWidth=20;
// 	ctx2.lineCap='round';//圆角
// 	for(var i=0;i<this.num;++i)
// 	{
// 		ctx2.beginPath();
// 		ctx2.moveTo(this.x[i],canHeight);
// 		ctx2.lineTo(this.x[i],canHeight-this.len[i]);
// 		ctx2.stroke();
// 	}
// 	ctx2.restore();
// }
//5.将ane.js加载index.html文件中
//6.在main.js创建海葵对象并且调用相应方法
//
//
//另外一种版本，海葵动起来，加入了贝塞尔曲线等
//1.创建海葵类
var aneObj=function()
{
	// console.log(1);
	//startpoint,controlpoint,endpoint
	this.rootx=[];//startpoint y值固定在画布最底部
	this.headx=[];//endpoint
	this.heady=[];
	this.amp=[];//振幅（-1到1）
	this.alpha=0;//正弦函数角度
}
//2.为海葵类添加属性num=50
aneObj.prototype.num=50;
//3.为海葵添加init方法
aneObj.prototype.init=function()
{
	var h=canHeight;
	for(var i=0;i<this.num;++i)
	{
		// 每个海葵，生长位置随机，比较像自然生长
		this.rootx[i]=i*16+Math.random()*20;//startpoint
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+50;
		// console.log(this.amp[i]);
	}
}
//4.为海葵类添加draw方法
aneObj.prototype.draw=function()
{
	//海葵随着时间变化角度发生变化
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);
	// 1.保存画笔状态
	ctx2.save();
	// 2.设置画笔样式，透明度，圆角，宽度
	ctx2.strokeStyle='#3b154e';
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=20;
	ctx2.lineCap='round';
	// 创建循环
	for(var i=0;i<this.num;i++)
	{
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);//移动到起始点
		//重新计算终点坐标
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		//绘制贝塞尔曲线
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}
//5.将ane.js加载index.html文件中
//6.在main.js创建海葵对象并且调用相应方法