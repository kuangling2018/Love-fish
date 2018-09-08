// 完成大鱼吃吃小鱼特效
// 1.创建特效类
var waveObj=function()
{
	this.x=[];
	this.y=[];
	//光环坐标
	this.r=[];
	this.alive=[];
}
// 2.添加数量属性10，屏幕最多一次出现10个圈
waveObj.prototype.num=10;
// 3.添加初始化方法
waveObj.prototype.init=function()
{
	for(var i=0;i<this.num;++i)
	{
		// 所有光环状态true
		this.alive[i]=false;
		this.r[i]=0;
		this.x[i]=0;
		this.y[i]=0;
	}
	// console.log(1);
}
// 4.添加绘制方法
waveObj.prototype.draw=function()
{
	// 4.1保存画笔1状态
	ctx1.save();
	// 4.2设置描边宽度
	ctx1.lineWidth=3;
	ctx1.strokeStyle="rgba(255,255,255,0.2)";
	// 4.3创建循环，循环所有对象
	for(var i=0;i<this.num;++i)
	{
		if(this.alive[i])//alive为true就画圈
		{
			this.r[i]+=deltaTime*0.02;//daltaTime两帧的时间差// 4.5半径变大
			if(this.r[i]>=100)	// 4.6如果半径超过100就让当前特效对象alive=false
			{
				this.alive[i]=false;
				break;
			}
			ctx1.beginPath();// 4.7开始新路径
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);// 4.8绘制圆
			ctx1.closePath();// 4.9闭合路径并且描边
			ctx1.stroke();	
		}
	}
	ctx1.restore();// 1.10恢复画笔1状态
}
// 5.添加出生方法 10个光圈选一个变为可见
waveObj.prototype.born=function(x,y)
{
	for(var i=0;i<this.num;++i)
	{
		//第一个没有出生光环
		if(!this.alive[i])
		{
			this.alive[i]=true;
			this.r[i]=20;
			this.x[i]=x;
			this.y[i]=y;
			return;//选中一个就退出
		}
	}
}
// 6.将wave.js加载index.html