window.onload=function () {
	// 实现按需加载
/*  1、获取元素节点
    2、添加滚动轴事件
    3、处理scrollTop在各个浏览器中的兼容
    4、遍历每个floor
    5、获取到每个floor下的img
    6、遍历img
    7、获取img身上的自定义属性
    8、替换img src 属性值
*/
//实现侧导航的选项卡效果
/*    1、初始化css  display:none;
    2、获取元素节点
    3、遍历title 添加onmouseover事件
    4、遍历所有选项卡
    5、給当前标签下的选项卡添加 active类 active{display:block}*/
    let cennavs=document.getElementsByClassName('cenav')[0].getElementsByTagName('li');

    for (let i=0;i<cennavs.length;i++) {
        let items = cennavs[i].getElementsByClassName('cenav_item');
        cennavs[i].onmouseover = function () {
            items[0].classList.add('active');
        };
        cennavs[i].onmouseout = function (){
                items[0].classList.remove('active');
        }
    }
    //排行榜的选项卡效果
/*	1、初始化css .Rankings下
		*标题 tab》li tab_active{color:}
    	*选项卡 con》li con_active{display:block}
    	*dot left=10px;
    2、通过获取tab并遍历 拿到每个li的offsetWidth 和 i
	3、然后将dot的left重新赋值  dot.style.left=i*offsetWidth+'px';
    4、获取con
		*遍历con  j con[j].style.display='none';
		*con[i].style.display='block';*/

function Tab(b) {
    let ranking=document.getElementsByClassName(b)[0];
    let tab=ranking.getElementsByClassName('tab')[0];
    let tabLis=tab.getElementsByTagName('li');
    let dot=ranking.getElementsByClassName('dot')[0];
    let con=ranking.getElementsByClassName('con')[0];
    let cons=con.getElementsByTagName('ul');
    for (let i=0;i<tabLis.length;i++){
        let w=tabLis[i].offsetWidth;
        tabLis[i].onmouseover=function () {
            dot.style.left=w*i+10+'px';
            for (let j=0;j<cons.length;j++){
                cons[j].style.display='none';
            }
            cons[i].style.display='block';
        }
    }
}
Tab('Rankings');
Tab('new-right');


//轮播图模块开始
    /*需求分析
    1、初始化CSS
    2、获取元素
        ·bannerImg、·banner_dot 、·banner_btn_left banner_btn_right
    3、添加定时器    操作图片  .imgActive
    4、
    */
    function Op(cName) {
        let banner_content=document.querySelector(cName);
        let bannerImg=banner_content.getElementsByClassName('bannerImg');
        let banner_dot=banner_content.querySelectorAll('.banner_dot>li');
        let banner_btn_left=banner_content.querySelector('.banner_btn_left');
        let banner_btn_right=banner_content.querySelector('.banner_btn_right');
        let CurIndex=0;
        let timer=setInterval(move,3000);
        function move(type) {
            type=type||'right';
            if (type=='left'){
                CurIndex--;
                if (CurIndex==-1){
                    CurIndex=bannerImg.length-1;
                }
            }else if (type=='right'){
                CurIndex++;
                if (CurIndex>bannerImg.length-1){
                    CurIndex=0;
                }
            }
            for (let i=0;i<bannerImg.length;i++){
                bannerImg[i].classList.remove('imgActive');
                banner_dot[i].classList.remove('banner_dot_active');
            }
            // bannerImg.forEach(function (ele,index) {
            //     ele.classList.remove('imgActive');
            //     // console.log(banner_dot[index]);
            //     banner_dot[index].classList.remove('banner_dot_active');
            // });
            bannerImg[CurIndex].classList.add('imgActive');
            banner_dot[CurIndex].classList.add('banner_dot_active');
        }
        banner_btn_left.onclick=function () {
            clearInterval(timer);
            move('left');
        };
        banner_btn_right.onclick=function () {
            clearInterval(timer);
            move('right');
        };
        banner_content.onmouseover=function () {
            clearInterval(timer);
        };
        banner_content.onmouseout=function () {
            timer=setInterval(move,3000);
        };
        banner_dot.forEach(function (ele,index) {
            ele.addEventListener('mouseover',function () {

            });
            ele.addEventListener('mouseover',function () {
                clearInterval(timer);
                for (let i=0;i<bannerImg.length;i++){
                    bannerImg[i].classList.remove('imgActive');
                    banner_dot[i].classList.remove('banner_dot_active');
                }
                bannerImg[index].classList.add('imgActive');
                this.classList.add('banner_dot_active');
                CurIndex=index;
            });

        });
    }
    Op('.banner_content');
    Op('.canBuy');
    Op('.MI');

//轮播图模块结束

    /*
需求分析：
1、初始化css  jump.style.height='340px';
2、获取元素
floor 6
jump 楼层跳转模块
items 楼层跳转模块 子模块 6
3、通过window.onscroll=function(){
    控制jump 的显示隐藏
    items添加鼠标点击事件  实现楼层跳转
}
*/

    window.onscroll=function () {
        let floors=document.getElementsByClassName("floor");
        let scrollTop=window.scrollY || document.body.scrollTop || document.documentElement.scrollTop||window
            .pageYOffset;
        for (let i = 0; i < floors.length; i++) {
            let imgs=floors[i].getElementsByTagName("img");
            if (scrollTop > (floors[i].offsetTop-400)){
                for (let j = 0; j < imgs.length; j++) {
                    let jiazai=imgs[j].getAttribute("attr");
                    imgs[j].src=jiazai;
                }
            }
        }
        let lc=document.querySelectorAll('.louceng');
        let jumps=document.querySelector('.jump');
        let items=document.querySelectorAll('.wy');
        let num;
        let obj=document.documentElement.scrollTop?document.documentElement:document.body;
        let scTop=document.body.scrollTop||document.documentElement.scrollTop||window.scrollY||window.pageYOffset;
        if (scTop>lc[0].offsetTop-200){
            jumps.style.display='block';
        }else {
            jumps.style.display='none';
        }
        for (let j=0;j<lc.length;j++){
            if (scTop>=lc[j].offsetTop-100){
                num=j;
                for(let i=0;i<items.length;i++){
                    items[i].style.backgroundColor='#918888';
                }
                items[j].style.backgroundColor='#d70b1c';
            }
        }
        for (let i=0;i<items.length;i++){
            items[i].ai=i;
            items[i].onclick=function () {
                // obj.scrollTop=lc[i].offsetTop;
                animate(obj,{scrollTop:lc[i].offsetTop},1000,Tween.Linear);
            };
            items[i].onmouseover=function () {
                items[i].style.backgroundColor='#d70b1c';
            };
            items[i].onmouseout=function () {
                if (i!=num){
                    items[this.ai].style.backgroundColor='#918888';
                }
            }
        }
    };

    /*
    节点轮播
    1、初始化css样式 ul横排 li横排 图片盒子 .JS_conl  overflow=hidden;
    2、获取btn 按钮  获取到ul

    */
    let JS_conlBox=document.querySelector('.JS_conlBox');
    let uls=JS_conlBox.querySelectorAll('.JS_conlBox>ul');
    let uls_num=uls.length;
    let uls_width=parseInt(getAttr("width"));
    let JS_btnl=document.querySelector('.JS_btnl');
    let JS_btnr=document.querySelector('.JS_btnr');
    JS_conlBox.style.width=uls_num * uls_width+"px";
    let index=0;
    JS_btnr.onclick=function () {
        if (index==-3){
            return
        }
        index--;

        JS_conlBox.style.transform = `translateX(${1000*index}px)`;
            // index=0;
    };
    JS_btnl.onclick=function () {
        if (index==0){
            return
        }
        index++;
        JS_conlBox.style.transform = `translateX(${1000*index}px)`;
    };

    function getAttr(attr) {
        if(uls[0].currentStyle){
            return uls[0].currentStyle[attr];
        }else {
            return getComputedStyle(uls[0],null)[attr];
        }
    }

    let JS_conr=document.querySelector('.JS_conr');
    let JS_conrLis=JS_conr.querySelectorAll('.JS_conr>.JS_conrImg>li');
    let ins=0;
    let JS_conrDot=JS_conr.querySelectorAll('.JS_conr>.dot>li');
    let JS_conr_timer=setInterval(function () {
        if (ins==JS_conrLis.length){
            ins=0;
        }

        for (let i=0;i<JS_conrLis.length;i++){
            JS_conrLis[i].classList.remove('JS_conr_active');
            JS_conrDot[i].classList.remove('active');
        }
        JS_conrLis[ins].classList.add('JS_conr_active');
        JS_conrDot[ins].classList.add('active');
        ins++;
    },2000)
};



