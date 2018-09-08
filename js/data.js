// 1.创建一个分数的类dataobj类
var dataObj=function()
{
	this.fruitNum;//吃到食物的数量
	this.double;//吃到双倍分数的，橙色果实
	this.score;//分数（累加->绘制画布）
	this.gameOver;//游戏是否已经结束
	this.alpha;//透明度
}
// 2.为分数类添加初始化方法
dataObj.prototype.init=function()
{
	this.fruitNum=1;
	this.double=1;//1，蓝色食物 2，橙色食物
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
}
// 3.为分数类添加绘制方法
dataObj.prototype.draw=function()
{
	// 1.保存画笔的状态
	ctx1.save();
	// 2.绘制屏幕宽度一半，高度向下
	var w=canWidth;
	var h=canHeight;
	ctx1.fillStyle='#fff';
	ctx1.font="35px Verdana";
	ctx1.textAlign='center';
	ctx1.fillText('SCORE: '+this.score,w*0.5,h-80);
	// 10.恢复画笔状态
	ctx1.restore();

}
// 4.为分数类添加 加分
dataObj.prototype.addScore=function()
{
	//累加分数
	this.score+=this.fruitNum*100*this.double;
	this.double=1;
}
// 5.将data.js加载index.html
// 6.在main.js创建分数类的对象并且调用相应方法