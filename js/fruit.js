//保存所有食物相关数据与行为
//版本一：30个活动食物，从画布低端向上漂浮
//版本二：30个食物，15个活动，15个不活动，从某个海葵头部出生，由小变大，向上漂浮
//1.创建食物类
var fruitObj=function()
{
	this.alive=[];//当前食物是否活动状态 true/false
	this.orange=new Image(); //橙色食物
	this.blue=new Image(); //蓝色食物
	this.x=[]; //食物位置
	this.y=[];
	this.spd=[]; //食物速度(生长。向上漂浮速度)
	this.fruitType=[]; //食物类别‘blue’ ‘orange’
	this.l=[];//食物图片的长度
	this.aneNO=[];//第几个海葵
}
//2.创建食物类属性数量
fruitObj.prototype.num=30;
//3.为食物添加初始化方法init
fruitObj.prototype.init=function()
{
	this.orange.src="src/fruit.png"; //下载食物图片
	this.blue.src="src/blue.png"; 
	for(var i=0;i<this.num;++i)
	{
		this.x[i]=0; //随机创建食物位置
		this.y[i]=0; 
		this.alive[i]=false;  //所有食物活动状态
		this.l[i]=0;        //图片长度0
		this.aneNO[i]=0;  //第几个海葵
		this.spd[i]=Math.random()*0.017+0.003; //向上漂浮速度
		this.fruitType[i]="";
	}
}
//4.为食物添加绘制方法 draw
fruitObj.prototype.draw=function()
{
	for(var i=0;i<this.num;++i)
	{
		if(this.alive[i])
		{
			if(this.l[i]<14)
			{
				this.l[i]+=this.spd[i]*deltaTime;//由小变大,出生
			}
			else
			{
				this.y[i]-=this.spd[i]*deltaTime*3;
			}
			if(this.fruitType[i]=='blue')
			{
				var pic=this.blue;
			}
			else
			{
				var pic=this.orange;
			}
			ctx2.drawImage(pic,this.x[i],this.y[i],this.l[i],this.l[i]);
			//如果当前食物漂浮出画面，将状态改变不活动
			if(this.y[i]<10)
			{
				this.alive[i]=false;
			}
			//食物由小变大，向上漂浮，平滑
			//
		}
	}
}
//5.将fruit.js加载index.html文件中
//6.在main.js创建食物对象并且调用相应方法
//7.为食物类添加出生食物的方法
fruitObj.prototype.born=function(i)
{
	//7.1随机获取一个海葵下标保存
	this.aneNO[i]=Math.floor(Math.random()*ane.num);
	//7.2修改当前食物状态alive l fruitType
	this.l[i]=0;
	this.fruitType[i]=Math.random()<0.9?"blue":"orange";
	this.alive[i]=true;
	//7.3设置食物的x,y
	this.x[i]=ane.headx[this.aneNO[i]];
	this.y[i]=ane.heady[this.aneNO[i]];
}
//8.创建一个函数，监听活动食物的数量，如果活动食物数量不足15个，则从不活动状态的食物中挑出一个，作为活动状态
function fruitMonitor()
{
	var num=0;
	for(var i=0;i<fruit.num;++i)
	{
		if(fruit.alive[i])
		{
			num++;
		}
	}
	if(num<15)
	{
		sendFruit();
		return;
	}
}
//9.创建一个函数，从不活动状态食物中挑一个食物为活动状态
function sendFruit()
{
	for(var i=0;i<fruit.num;++i)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}
	}
}
//10.为食物类添加，将活动状态改为不活动的状态