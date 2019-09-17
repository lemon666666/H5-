
//获取元素
var getElement = function(selector){
	return document.querySelector(selector)
}

var getAllElement = function(selector){
	return document.querySelectorAll(selector)
}

//获取元素类名
var getClass = function( element ){
	return element.getAttribute('class');
}
var setClass = function( element, cls ){
	return element.setAttribute('class', cls)
} 

//为元素添加样式
var addClass = function( element ,cls){
	var baseClass = getClass(element);
	if(baseClass.indexOf(cls) === -1){  //如果元素样式不存在
		setClass(element,baseClass+' '+cls)
	}
}
//删除样式
var delClass = function(element,cls){
	var baseClass = getClass(element);
	if(baseClass.indexOf(cls) != -1){
		setClass(element,baseClass.split(cls).join('').trim())
	}
}



var screenAnimateElements = {
	'.screen-1': [
		'.screen-1__heading',
		'.screen-1__phone',
		'.screen-1__shadow'
	],
	'.screen-2': [
		'.screen-2__heading',
		'.screen-2__phone',
		'.screen-2__subheading',
		'.screen-2__point',
		'.screen-2__point_i_1',
		'.screen-2__point_i_2',
		'.screen-2__point_i_3'
	],
	'.screen-3': [
		'.screen-3__heading',
		'.screen-3__phone',
		'.screen-3__subheading',
		'.screen-3_features'
	],
	'.screen-4': [
		'.screen-4__heading',
		'.screen-4__subheading',
		'.screen-4__type__item_i_1',
		'.screen-4__type__item_i_2',
		'.screen-4__type__item_i_3',
		'.screen-4__type__item_i_4'
	],
	'.screen-5': [
		'.screen-5__heading',
		'.screen-5__subheading',
		'.screen-5__bg'
	]
}

//初始化样式
var setScreenAnimateInit = function(screenClass){
	//获取当前屏的元素
	var screen = document.querySelector(screenClass);
	//需要设置动画的元素
	var animateElements = screenAnimateElements[screenClass]
	
	for(var i = 0; i < animateElements.length; i++){
		//获取当前屏数组下元素
		var element = document.querySelector(animateElements[i]);
		//获取当前屏数组下元素的class
		var baseClass = element.getAttribute('class');
		//给当前屏数组下元素设置class
		element.setAttribute('class',baseClass+' '+animateElements[i].substr(1)+'_animate_init');
		}
	}

//设置播放屏幕内的元素动画
		var playCurrentAnimateDone = function(screenClass){
			//获取当前屏的元素
			var screen = document.querySelector(screenClass);
			//需要设置动画的元素
			var animateElements = screenAnimateElements[screenClass]
			for(var i = 0; i < animateElements.length; i++){
				//获取当前屏数组下元素
				var element = document.querySelector(animateElements[i]);
				//获取当前屏数组下元素的class
				var baseClass = element.getAttribute('class');
				//给当前屏数组下元素设置class
				element.setAttribute('class',baseClass.replace('_animate_init','_animate_done'));
			}
		}
		
		//页面加载完成时
		window.onload = function(){
			switchNavItemsActive(0)
			for(k in screenAnimateElements){
				if(k==='.screen-1') continue;  //跳过第一屏
				setScreenAnimateInit(k)
			}
		}
		
		//滚动到那就播放哪里
		var navItems = getAllElement('.header__nav-item');
		var outLineItems = getAllElement('.outline__item');
		
		
		var switchNavItemsActive = function(index){
			for(var i=0;i<navItems.length;i++){
				delClass(navItems[i],'header__nav-item_status_active')
			}
			addClass(navItems[index],'header__nav-item_status_active')
			
			for(var i=0;i<outLineItems.length;i++){
				delClass(outLineItems[i],'outline__item_status_active')
			}
			addClass(outLineItems[index],'outline__item_status_active')
		}
		
		//滑动门特效
		var navTip = getElement('.header__nav-tip')
		var setTip = function(index,lib){
			lib[index].onmouseover = function(){
				// console.log(this,index)
				navTip.style.left = (index * 74) + 'px'
			}
			var activeIndex=0;
			lib[index].onmouseout = function(){
				// console.log(this,index)
				for(var i=0;i<lib.length;i++){
					if(getClass(this).indexOf('header__nav-item_status_active') > -1){
						activeIndex = i
						break;    //跳出for循环
						//continue;   //跳过此次循环，执行下一次
					}
				}
				navTip.style.left = (activeIndex * 70) + 'px'
			}
		}
		for(var i = 0;i<navItems.length;i++){
			if(i == 5) continue;   //如果为按钮 跳过此次循环
			setTip(i,navItems)
		}
		
		
		var setScrollTip = function(index){
			navTip.style.left = (index * 74)+'px'
		}
		//页面滚动时
		window.onscroll = function(){
			//获取页面滚动条的位置
			var top = document.documentElement.scrollTop;
			//导航条样式
			if(top>80){
				addClass(getElement('.header'),'header_status_black')   //导航条变成黑色
				addClass(getElement('.outline'),'outline_status_in')    //大纲滑出
			}else{
				delClass(getElement('.header'),'header_status_black')
				delClass(getElement('.outline'),'outline_status_in')
				
				//导航条颜色变化
				switchNavItemsActive(0)
				//滑动条随页面滚动而滚动
				setScrollTip(0)
			}
			if(top>800*1 - 100){
				playCurrentAnimateDone('.screen-2')
				switchNavItemsActive(1)
				setScrollTip(1)
			}
			if(top>800*2 - 100){
				playCurrentAnimateDone('.screen-3')
				switchNavItemsActive(2)
				setScrollTip(2)
			}
			if(top>800*3 - 100){
				playCurrentAnimateDone('.screen-4')
				switchNavItemsActive(3)
				setScrollTip(3)
			}
			if(top>800*4 - 100){
				playCurrentAnimateDone('.screen-5')
				switchNavItemsActive(4)
				setScrollTip(4)
			}
		}
		
		
		//滚动大纲同步,双向定位
		
		var setNavJump = function(i, lib){
			var item = lib[i];
			item.onclick = function(){
				// console.log(i)
				//跳转  
				document.documentElement.scrollTop = i*800
			}
		}
		for(var i = 0;i < navItems.length; i++){
			setNavJump(i, navItems)
		}
		for(var i = 0;i < outLineItems.length; i++){
			if(i==5)continue;   //跳过大纲第五条
			setNavJump(i, outLineItems)
		}
		
		
		
		//播放第一屏动画
		setTimeout(function(){
			playCurrentAnimateDone('.screen-1') 
		},500)
		
		
		//返回顶部按钮
			document.querySelector('.outline__item-back').onclick = function(){
				var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
				if (currentScroll > 0) {
				     window.scrollTo (0,0);
				}
			}