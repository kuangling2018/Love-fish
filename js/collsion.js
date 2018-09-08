// 功能：完成碰撞检测
// （1）大鱼吃食物（大鱼碰撞了食物）
// （2）大鱼喂小鱼（大鱼碰撞到了小鱼）
function momFruitsCollision()
{
	// 1.创建循环，每个食物
	for(var i=0;i<fruit.num;++i)
	{// 2.判断如果当前食物的活动状态
		if(fruit.alive[i])
		{// 3.计算当前食物与大鱼之间的距离（碰撞检测）
			var len=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			// 4.如果距离小于30像素
			if(len<900)
			{
				// 5.alive[i]=false
				fruit.alive[i]=false;
				// 6.大鱼吃到食物出现动画效果
				wave.born(fruit.x[i],fruit.y[i]);
				// 7.加分 多加判断食物颜色，如果橙色double=2
				if(fruit.fruitType[i]=='orange')
				{
					data.double=2;
				}
				data.addScore();
			}
		}
	}
}