// main.js游戏入口程序，所有对象创建初始化与绘制都在此文件进行

// 1.创建变量保存的各个不同角色
// 	1.1创建两个变量保存画布
 	var can1;
 	var can2;
// 	1.2创建两个变量保存画笔
 	var ctx1;
 	var ctx2;
// 	1.3创建两个变量保存画布宽度和高度
	var canWidth=0;
	var canHeight=0;
	// 1.4创建变量保存背景图片
	var bgPic=new Image();
	//1.5创建变量保存海葵对象
	var ane;
	//1.6创建变量保存食物对象
	var fruit;
	//1.7创建2个变量，保存上一帧被执行的时间，2帧之间的时间差
	var lastTime;
	var deltaTime;
	//1.8创建一个变量，保存大鱼对象
	var mom;
	//1.9创建2个变量，保存鼠标的位置
	var mx=0;
	var my=0;
	// 1.10创建一个变量，保存吃食物特效对象
	var wave;
	// 1.11创建一个变量，保存小鱼对象
	var baby;
	// 1.12创建一个变量，保存分数对象
	var data;
// 2.创建唯一入口函数game
function game()
{
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}
// 3.创建初始化函数init
function init()
{
	// 3.1初始化2个画布
	can1=document.getElementById('canvas1');
	can2=document.getElementById('canvas2');
	// 3.2初始化2个画笔
	ctx1=can1.getContext('2d');
	ctx2=can2.getContext('2d');
	// 3.3初始化画布宽度和高度
	canWidth=can1.width;
	canHeight=can1.height;
	// 3.4下载指定图片
	bgPic.src="src/background.jpg";
	// 3.5创建海葵类对象并且调用init方法
	ane=new aneObj();
	ane.init();
	// 3.6创建食物类对象并且调用init方法
	fruit=new fruitObj();
	fruit.init();
	// 3.7创建大鱼对象并且调用init方法
	mom=new momObj();
	mom.init();
	// 3.8为画布1绑定鼠标移动事件，调用onmouseMove
	can1.addEventListener('mousemove',onMouseMove,false);
	//3.9创建特效对象并且调用初始化方法
	wave=new waveObj();
	wave.init();
	//3.10创建小鱼对象并且调用初始化方法
	baby=new babyObj();
	baby.init();
	//3.11创建分数类对象并且调用初始化方法
	data=new dataObj();
	data.init();
}
// 4.创建绘制游戏不同角色的函数gameloop()
function gameloop()
{
	//4.1创建智能定时器，调用gameloop函数(周期性)
	//4.1.1计算2帧的时间差
	var now=Date.now();//当前时间
	deltaTime=now-lastTime;//2帧时间差
	lastTime=now;//上帧时间还原
	if(deltaTime>40)
	{
		deltaTime=40;
	}
	requestAnimFrame(gameloop);
	// 4.2.1调用监听食物状态函数
	fruitMonitor();
	// 4.2.2监听大鱼吃到食物
	momFruitsCollision();
	// 4.3调用绘制背景的函数
	drawBackground();
	// 4.4调用海葵绘制背景方法
	ane.draw();
	// 4.5调用食物绘制背景方法
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);
	// 4.8调用大鱼绘制方法
	mom.draw();
	// 4.9调用特效对象绘制方法
	wave.draw();
	//4.10调用小鱼对象的绘制方法
	baby.draw();
	//4.11调用分数对象的绘制方法
	data.draw();
}
// 5.当页面加载完成调用game函数
document.body.onload=game;
// 6.画布监听处理函数
function onMouseMove(e)
{
	if(e.offsetX||e.layerX)
	{
		mx=(e.offsetX==undefined)?e.layerX:e.offsetX;
	}
	if(e.offsetY||e.layerY)
	{
		my=(e.offsetY==undefined)?e.layerY:e.offsetY;
	}
}