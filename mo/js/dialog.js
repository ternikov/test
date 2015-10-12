/*
Скрипт dialog (диалоговые окна).
Автор проекта: Алексей Конан 2013 г. (www.akonan.ru).
Разрешено свободное использование приложения и его модификаций в некомерческих целях.
*/
dialogs=new Array();
if(!("file" in window))d_inc("js/file.js");
if(!("opacity" in window))d_inc("js/opacity.js");
if(!("dnd" in window))d_inc("js/dnd.js");
function d_object(id,url){
this.id=id;
this.url=url;
this.w=this.h=this.x=this.y=this.fn=false;
this.title=this.caption=this.tpl="";
this.css="css/dialog.css";
this.type=function(){
  var t=this.url.substring(this.url.lastIndexOf(".")+1).toLowerCase();
  return (t=="jpg"||t=="png"||t=="jpeg")?"img":"frame";
  }
}
function dialog(url,title,caption,w,h,x,y,id,css,tpl,fn){
u=undefined;
if(id==u)id="dialog";
if(!dialogs[id])dialogs[id]=new d_object(id,url);
var d=dialogs[id];
if(url!=u)d.url=url;
if(w!=u)d.w=w;
if(h!=u)d.h=h;
if(x!=u)d.x=x;
if(y!=u)d.y=y;
if(title!=u)d.title=title;
if(caption!=u)d.caption=caption;
if(css!=u)d.css=css;
if(fn!=u)d.fn=fn;
if(tpl==u)tpl="html/dialog.html";
d.tpl==''?f_open(tpl,dialog_win,d):dialog_win(d.tpl,d);
}
function dialog_win(tpl,d){
d.tpl=tpl;
if(document.getElementById(d.id))return dialog_show(d.id);
var b=d.type()=="img"?'<img id="'+d.id+'_data" onload="dialog_onload(\''+d.id+'\')" src="'+d.url+'">':'<iframe id="'+d.id+'_data" frameborder="0" onload="dialog_onload(\''+d.id+'\')" src="'+d.url+'"></iframe>';
var dnd="dnd" in window?"dnd(event,'"+d.id+"')":"";
tpl=tpl.replace("[--body--]",b);
tpl=tpl.replace("[--title--]",d.title);
tpl=tpl.replace("[--caption--]",d.caption);
tpl=tpl.replace(/\[--id--\]/g,d.id);
tpl=tpl.replace("[--dnd--]",dnd);
b=document.body;
var de=document.documentElement;
var st=de.scrollTop>b.scrollTop?de.scrollTop:b.scrollTop;
var sl=de.scrollLeft>b.scrollLeft?de.scrollLeft:b.scrollLeft;
var h=de.scrollHeight>b.scrollHeight?de.scrollHeight:b.scrollHeight;
var w=de.scrollWidth>b.scrollWidth?de.scrollWidth:b.scrollWidth;
var ch=de.clientHeight>0&&de.clientHeight<b.clientHeight?de.clientHeight:b.clientHeight;
var cw=de.clientWidth>0&&de.clientWidth<b.clientWidth?de.clientWidth:b.clientWidth;
var e=document.createElement("div");
var s=e.style;
e.setAttribute("id",d.id+"_lock");
s.position="absolute";
s.width=w+"px";
s.height=h+"px";
s.zIndex=999;
s.left=0;
s.top=0;
e.className="dialog-lock";
b.appendChild(e);
var e=document.createElement("a");
s=e.style;
e.setAttribute("id",d.id+"_loading");
s.position="absolute";
s.zIndex=999;
s.left=sl+"px";
s.top=st+"px";
s.width=cw+"px"
s.height=ch+"px"
e.className="dialog-loading";
e.href="javascript:dialog_delete('"+d.id+"')";
b.appendChild(e);
var e=document.createElement("a");
e.setAttribute("id",d.id+"_author");
s=e.style;
s.position="absolute";
s.zIndex=999;
s.left=sl+cw+"px";
s.top=st+ch+"px";
e.className="dialog-author";
e.target="_blank";
e.href="http://akonan.ru";
e.innerHTML="Powered by A.Konan";
b.appendChild(e);
var e=document.createElement("link");
e.setAttribute("id",d.id+"_css");
e.setAttribute("type","text/css");
e.setAttribute("rel","stylesheet");
e.setAttribute("href",d.css);
b.appendChild(e);
var e=document.createElement("div");
s=e.style;
e.setAttribute("id",d.id);
e.innerHTML=tpl;
s.display="none";
s.position="absolute";
s.left=sl+"px";
s.top=st+"px";
b.appendChild(e);
}
function dialog_onload(id){
dialog_unload(id);
var d=dialogs[id];
var s=document.getElementById(id).style;
var data=document.getElementById(id+"_data");
var b=document.body;
var e=document.documentElement;
var st=e.scrollTop>b.scrollTop?e.scrollTop:b.scrollTop;
var sl=e.scrollLeft>b.scrollLeft?e.scrollLeft:b.scrollLeft;
var ch=e.clientHeight>0&&e.clientHeight<b.clientHeight?e.clientHeight:b.clientHeight;
var cw=e.clientWidth>0&&e.clientWidth<b.clientWidth?e.clientWidth:b.clientWidth;
s.display="block";
var w=d.w.toString().indexOf("%")>0?Math.round(parseInt(d.w)*b.parentNode.offsetWidth/100):d.w;
var h=d.h.toString().indexOf("%")>0?Math.round(parseInt(d.h)*b.parentNode.offsetHeight/100):d.h;
if(parseInt(w)==w)w+="px";
if(parseInt(h)==h)h+="px";
if(d.type()=="frame"){
  var f=document.frames?document.frames[id+"_data"]:data;
  if(w==0||h==0){
    var p=f.window?f.window:f.contentWindow;
    p=p.document.body.parentNode;
    if(h==0)h=p.scrollHeight+"px";
    if(w==0)w=p.scrollWidth+"px";
  }
  data.style.width=w;
  data.style.height=h;
  try{f.width=w;f.height=h;}catch(e){}
  }
else{
  if(w==0)w=data.offsetWidth+"px";
  else data.style.width=w;
  if(h==0)h=data.offsetHeight+"px";
  else data.style.height=h;
  }
var x=d.x===false||d.x===""?Math.round((sl+cw/2-parseInt(w)/2)-data.getBoundingClientRect().left):d.x;
var y=d.y===false||d.y===""?Math.round((st+ch/2-parseInt(h)/2)-data.getBoundingClientRect().top):d.y;
if(x<0)x=0;
if(y<0)y=0;
if(parseInt(x)==x)x+="px";
if(parseInt(y)==y)y+="px";
s.zIndex=999;
s.width=w;
s.height=h;
s.left=x;
s.top=y;
if("opacity" in window){
  opacity(id,0);
  opacity(id,100,300);
  }
if(d.fn)d.fn();
}
function dialog_unload(id){
if(document.getElementById(id+"_loading"))document.body.removeChild(document.getElementById(id+"_loading"));
if(document.getElementById(id+"_author"))document.body.removeChild(document.getElementById(id+"_author"));
}
function dialog_close(id){
var b=document.body;
b.removeChild(document.getElementById(id+"_css"));
b.removeChild(document.getElementById(id+"_lock"));
b.removeChild(document.getElementById(id));
dialog_unload(id);
}
function dialog_delete(id){
dialog_close(id);
dialogs[id]=false;
}
function dialog_hide(id){
document.getElementById(id).style.display="none";
document.getElementById(id+"_lock").style.visibility="hidden";
}
function dialog_show(id){
document.getElementById(id).style.display="block";
document.getElementById(id+"_lock").style.visibility="visible";
}
function d_inc(a){
var s=document.createElement("script");
s.src=a;
document.getElementsByTagName("head")[0].appendChild(s);
}
