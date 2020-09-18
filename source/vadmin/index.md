---
title: 评论管理
date: 2020-08-22 14:52:46
comments: false 
---
{% raw %}
<html>
<head>
<meta http-equiv="Content-Language" content="zh-cn">
<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=gb2312">
<title>跳转到评论管理页面</title>
</head>
<body>
<form name=loading>
<P align=center><FONT face=Arial color=#0066ff size=2>跳转中...</FONT>
<INPUT style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; FONT-WEIGHT: bolder; PADDING-BOTTOM: 0px; COLOR: #0066ff; BORDER-TOP-style: none; PADDING-TOP: 0px; FONT-FAMILY: Arial; BORDER-RIGHT-style: none; BORDER-LEFT-style: none; BORDER-BOTTOM-style: none"
size=46 name=chart>
<BR>
<INPUT style="BORDER-RIGHT: medium none; BORDER-TOP: medium none; BORDER-LEFT: medium none; COLOR: #0066ff; BORDER-BOTTOM: medium none; TEXT-ALIGN: center" size=47 name=percent>
<script language="javascript">
var bar=0
var line="||"
var amount="||"
count()
function count(){
    bar=bar+2
    amount =amount + line
    document.loading.chart.value=amount
    document.loading.percent.value=bar+"%"
    if (bar<99){
        setTimeout("count()",50);
    }else{
        window.location = "https://wayne0926.avosapps.us/";
    }
}
</script>
</P>
</form>
</body>
</html>

{% endraw %}