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

function setScreenAnimate(screenClass){
	//获取当前屏的元素
	var screen = document.querySelector(screenClass);
	//需要设置动画的元素
	var animateElements = screenAnimateElements[screenClass]
	//是否有初始化子元素的样式
	var isSetAnimateClass = false;
	//当前屏幕下所有子元素是否为done
	var isAnimateDone = false;
	
	
	screen.onclick = function(){

		//初始化样式，增加init
		if ( isSetAnimateClass === false) {
			for(var i = 0; i < animateElements.length; i++){
				//获取当前屏数组下元素
				var element = document.querySelector(animateElements[i]);
				//获取当前屏数组下元素的class
				var baseClass = element.getAttribute('class');
				//给当前屏数组下元素设置class
				element.setAttribute('class',baseClass+' '+animateElements[i].substr(1)+'_animate_init');
			}
			isSetAnimateClass = true;
			return;
		} 
		//切换所有 animateElements init->done
		if ( isAnimateDone === false) {
			for(var i = 0; i < animateElements.length; i++){
				//获取当前屏数组下元素
				var element = document.querySelector(animateElements[i]);
				//获取当前屏数组下元素的class
				var baseClass = element.getAttribute('class');
				//给当前屏数组下元素设置class
				element.setAttribute('class',baseClass.replace('_animate_init','_animate_done'));
			}
			isAnimateDone = true;
			return;
		} 
		//切换所有 animateElements done->init
		if ( isAnimateDone === true) {
			for(var i = 0; i < animateElements.length; i++){
				//获取当前屏数组下元素
				var element = document.querySelector(animateElements[i]);
				//获取当前屏数组下元素的class
				var baseClass = element.getAttribute('class');
				//给当前屏数组下元素设置class
				element.setAttribute('class',baseClass.replace('_animate_done','_animate_init'));
			}
			isAnimateDone = false;
			return;
		} 
	}
	
}

for(k in screenAnimateElements){
	setScreenAnimate(k)
}
