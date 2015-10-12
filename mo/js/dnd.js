/*
Drag & drop. Перетаскивание.
Автор: Алексей Конан
Дата: 05.02.2014
Документация: http://akonan.ru/?id=3
*/
dragndrop=[];
function Dnd(id){
var t=this;
var e=t.element=typeof(id)=='string'?document.getElementById(id):id;
for(var n in dragndrop)if(dragndrop[n].element==e)return dragndrop[n];
dragndrop.push(t);
var d=t.dnd=document.createElement("div");
var de=document.documentElement;
var b=document.body;
var s=d.style;
s.position="absolute";
s.zIndex=1000;
s.width="100%";
s.height="100%";
s.left=de.scrollLeft>b.scrollLeft?de.scrollLeft+"px":b.scrollLeft+"px";
s.top=de.scrollTop>b.scrollTop?de.scrollTop+"px":b.scrollTop+"px";
s.backgroundColor="#ffffff";
s.opacity=0;
s.filter="alpha(opacity=0)";
t.drag=function(ev){
  if(ev.preventDefault)ev.preventDefault();
  b.appendChild(d);
  t.x=ev.clientX;
  t.y=ev.clientY;
  }
t.drop=function(){
  b.removeChild(d);
  if(t.ready!=undefined)return t.ready();
  }
t.move=function(ev){
  t.left=e.currentStyle?e.currentStyle["marginLeft"]:window.getComputedStyle(e,"").getPropertyValue("margin-left");
  t.top=e.currentStyle?e.currentStyle["marginTop"]:window.getComputedStyle(e,"").getPropertyValue("margin-top");
  e.style.marginLeft=parseInt(t.left)+ev.clientX-t.x+"px";
  e.style.marginTop=parseInt(t.top)+ev.clientY-t.y+"px";
  t.x=ev.clientX;
  t.y=ev.clientY;
  s.left=de.scrollLeft>b.scrollLeft?de.scrollLeft+"px":b.scrollLeft+"px";
  s.top=de.scrollTop>b.scrollTop?de.scrollTop+"px":b.scrollTop+"px";
  if(t.action!=undefined)return t.action();
  }
d.onmouseup=t.drop;
d.onmousemove=t.move;
}
function dnd(ev,id,fn){
if(id==undefined||id==0)id=ev.target?ev.target:ev.srcElement;
var d=new Dnd(id);
if(fn!=undefined){
  var a=Array.prototype.slice.call(arguments,3);
  d.ready=function(){fn.apply(fn,a)};
  }
d.drag(ev);
}
