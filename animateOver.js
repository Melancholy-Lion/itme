/**
 * Created by jiaoshou on 2016/8/14.
 */
//获取任意样式
function getStyle(element, attr) {
    if(window.getComputedStyle) {
        return window.getComputedStyle(element,null)[attr];
    }else{
        return element.currentStyle[attr];
    }
}


//width : 400
//left : 300

//在修改单个属性的基础上修改
//1 修改参数，传入对象
//2 遍历对象，获取到所有的属性
//3 把target修改 成 attrs[attr]

function animate(element, attrs, fn) {
    //清除定时器
    if(element.timerId) {
        clearInterval(element.timerId);
    }

    element.timerId = setInterval(function () {

        //问题：当多个属性的最小值到达之后，动画就会停止
        //解决：当所有属性都到达目标值，动画停止

        //假设所有的属性都到达目标值，停止定时器
        var isStop = true;

        //遍历多个属性
        for(var attr in attrs) {

            if(attr === "zIndex") {
                element.style[attr] = attrs[attr];
            }else if(attr === "opacity") {
                //获取当前元素样式属性的值
                var current = parseFloat(getStyle(element, attr)) || 0;
                current *= 100;
                //每一次step的值会越来越小
                var step = (attrs[attr]*100 - current)/8;			//attrs[attr]*100  为了便于处理整数运算

                //正数  向上取整   负数 向下取整
                step = step > 0 ?  Math.ceil(step): Math.floor(step);

                current += step;


                element.style[attr] = current/100;
                //更改ie下的透明度
                element.style.filter = "alpha(opacity="+ current +")";

                //如果有一个属性没有到达目标值，不能停止动画
                if(step != 0) {
                    isStop = false;
                }
            }else{
                //获取当前元素样式属性的值
                var current = parseInt(getStyle(element, attr)) || 0;
                //每一次step的值会越来越小
                var step = (attrs[attr] - current)/8;

                //正数  向上取整   负数 向下取整
                step = step > 0 ?  Math.ceil(step): Math.floor(step);

                current += step;


                element.style[attr] = current + "px";


                //如果有一个属性没有到达目标值，不能停止动画
                if(step != 0) {
                    isStop = false;
                }
            }

        }

        //停止定时器
        if(isStop) {
            clearInterval(element.timerId);

            //执行回调函数
            if(fn){
                fn();
            }
        }
    },30);
}