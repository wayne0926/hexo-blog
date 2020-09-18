<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script><script class="meting-secondary-script-marker" src="/assets/js/Meting.min.js"></script>//听写按钮触发
/* function tingxie() {
    document.getElementById("txtJSON").value = ""; //清除输入框内容
    document.getElementById('display').style.display = 'none'; //隐藏输出单词
    document.getElementById('good').style.display = 'block'; //显示提示
    document.getElementById("xianshi-1").innerHTML = "<b>显示单词</b>"; //更改按钮名称
    document.getElementById("xianshi-1").style.fontFamily = "Microsoft Yahei"; //调整按钮字体
    document.getElementById("xianshi-1").style.fontSize = "25px"; //设置显目的字体
    document.getElementById("xianshi-1").removeAttribute("disabled"); //去掉不可点击			
    document.getElementById("xianshi-1").style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; //设置背景色		 */

/* }
 */
//显示单词按钮触发
/* function xianshi() {
    document.getElementById("xianshi-1").setAttribute("disabled", true); //设置不可点击
    document.getElementById('display').style.display = 'block'; //显示输出单词
    document.getElementById('good').style.display = 'none'; //隐藏“隐藏提示” */
    /* 隐藏单词倒计时 */
   /*  document.getElementById("xianshi-1").innerHTML = "隐藏单词(10)"; //10
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(9)"; //9
    }, 1000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(8)"; //8
    }, 2000);

    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(7)"; //7
    }, 3000);

    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(6)"; //6
    }, 4000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(5)"; //5
    }, 5000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(4)"; //4
    }, 6000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(3)"; //3
    }, 7000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(2)"; //2
    }, 8000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "隐藏单词(1)"; //1
    }, 9000); */
    /* 执行隐藏单词倒计时结束 */

    /* 执行隐藏单词 */
   /*  setTimeout(function () {
        document.getElementById('display').style.display = 'none'; //隐藏输出单词
        document.getElementById('good').style.display = 'block'; //显示提示框
        document.getElementById("good").innerHTML = "显示单词时间（10秒）结束，如需再次显示，请点击“显示单词”"; //更改隐藏提示内容 */
        /* 设置按钮不可点击颜色 */
        /* document.getElementById("xianshi-1").style.backgroundColor = '#555555'; //设置背景色
        document.getElementById("xianshi-1").innerHTML = "请先思考！(5)"; //更改按钮名称
    }, 10000); */
    /* 执行隐藏单词结束 */

    /* 开始倒计时 */
    /* setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "请先思考！(4)"; //4
    }, 11000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "请先思考！(3)"; //3
    }, 12000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "请先思考！(2)"; //2
    }, 13000);
    setTimeout(function () {
        document.getElementById("xianshi-1").innerHTML = "请先思考！(1)"; //1
    }, 14000); */
    /* 倒计时结束 */
   /*  setTimeout(function () { */
        /* 设置按钮可以点击（5秒后） */
        /* document.getElementById("xianshi-1").removeAttribute("disabled"); //去掉不可点击			
        document.getElementById("xianshi-1").style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; //设置背景色	
        document.getElementById("xianshi-1").innerHTML = "显示单词"; //更改回按钮名称
    }, 15000);

} */


// 底部信息最底部
/* $(function () {
    function footerPosition() {
        $("footer").removeClass("fixed-bottom");
        //网页正文全文高度
        var contentHeight = document.body.scrollHeight,
            //可视窗口高度，不包括浏览器顶部工具栏
            winHeight = window.innerHeight;
        if (!(contentHeight > winHeight)) {
            //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
            $("footer").addClass("fixed-bottom");
        } else {
            $("footer").removeClass("fixed-bottom");
        }
    }
    footerPosition();
    $(window).resize(footerPosition);
}); */

//其他
function pronance(e) {
    var pn = document.getElementsByName("proun");
    var p = 1;
    for (n = 0; n < pn.length; n++) {
        if (pn[n].checked) {
            p = pn[n].value;
        }
    }
    var audio = $("#audio");
    audio.attr("src", "http://dict.youdao.com/dictvoice?type=0&audio=" + $(e).attr("class") /* + "&type=" + p */);
    audio.get(0).play();

    $("#dictHcContent").attr("src", "http://dict.cn/apis/dict3.php?q=" + $(e).attr("class"));

}

//转换按钮触发
function zhuanhuan() {
    if (document.getElementById("txtJSON").value == "") {
        alert('请输入单词!');
    } else {
            $(".display").empty();
            var words = $('#txtJSON').val().split("\n");
            for (i = 0; i < words.length; i++) {
                $(".display").append("<div class='word card bg-secondary text-white lead p-2 col' style='float:left;width:50%;'><a class='" + words[i] + "' onclick='pronance(this)'>" +
                    words[i] + "</a></div>");
            // card bg-secondary text-white lead p-2 col
            /// style='float:left;width:50%;'
        };
       /*  document.getElementById("xianshi-1").innerHTML = "显示单词(听写开始后使用)"; //更改名称
        document.getElementById('xianshi-1').style.display = 'block'; //调整为显示按钮
        document.getElementById("xianshi-1").setAttribute("disabled", true); //设置不可点击
        document.getElementById("xianshi-1").style.backgroundColor = '#555555'; //设置背景色
        document.getElementById("xianshi-1").style.fontSize = "15px"; //设置不显目的字体
        document.getElementById("good").style.display = "none";
        document.getElementById("display").style.display = "block" */
    }
}

//听写
$("button#dictation").click(function () {
    debugger;
    var childs = $(".display").find("div > a");
    var pn = document.getElementsByName("proun");
    var p = 1;
    for (n = 0; n < pn.length; n++) {
        if (pn[n].checked) {
            p = pn[n].value;
        }
    }
    var i = 0;
    var t = document.getElementById("time").value;

    function myloop() {
        setTimeout(function () {
            var audio = $("#audio");
            audio.attr("src", "http://dict.youdao.com/dictvoice?type=0&audio=" + $(childs[i]).attr("class")/*  + "&type=" + p */);
            audio.get(0).play();
            i++;
            if (i < childs.length) {
                myloop();
            }
        }, 1000 * t);
    }

    myloop();


});

//百度站长
(function () {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

//跳转判断
/* if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) { //跳到手机端
    window.location = "../wap.html";
} */

//“如何使用”
function MsgBox() //声明标识符
{
    alert(
        "使用说明： \n1、将单词按照一行一词粘贴到下面的输入框。 \n2、点击“转换”，然后下方会出现转换后的单词； \n\n·单击每个单词，会发出读音，右下角会出现释义。 \n\n·设定间隔时间，点击“听写”，即可按时间间隔，依次读出每个单词"); //弹出对话框
}

//“关于工具”
function MsgBox2() //声明标识符
{
    alert("本工具由Wei Ran 搭建运维，远古级源码来源于网络，本人大约用了累计8个小时维护、修复 \n\n反馈问题到：wr20060926@qq.com \n您的支持就是我的动力 \n\n版本：5.33           最近维护时间：2020/6/6/22:00"); //弹出对话框
}

//离开提示
function myfunction() {
    return "确认离开当前页面吗？输入的单词将不会保存，全部丢失！";
}

//360站长
(function () {
    var src = "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
    document.write('<script src="' + src + '" id="sozz"><\/script>');
})();

//浏览器控制台打印信息
console.log("如果使用中出现问题，请发邮件到：wr20060926@qq.com \nor \n访问：https://wr0926.ml/tx/liuyan/ \n反馈 \n谢谢支持！ \n您的支持就是我最大的动力！");

//浏览器控制台打印信息
console.log("%c版本：5.33", "color:red");

//浏览器控制台打印信息
console.log("%c最近维护时间：2020，6，6，22:00", "color:red");