/*
Прозрачность элементов
Автор: Алексей Конан
Дата: 04.01.2014
Документация: http://akonan.ru/?id=25
*/
opacities=[];
function Opacity(id){
var p=this;
var e=p.element=typeof(id)=='string'?document.getElementById(id):id;
for(var n in opacities)if(opacities[n].element==e)return opacities[n];
opacities.push(p);
p.opacity=e.currentStyle?e.currentStyle["opacity"]*100:window.getComputedStyle(e,"").getPropertyValue("opacity")*100;
p.actual=p.opacity;
p.final=p.time=0;
p.dt=40;
p.alpha=function(fn){
  clearTimeout(p.timer);
  var u=undefined;
  var a=arguments;
  var s=p.element.style;
  if(p.time==u)p.time=0;
  var n=p.time/p.dt<1?1:p.time/p.dt;
  p.actual+=(p.final-p.actual)/n;
  p.time-=p.dt;
  p.opacity=Math.round(p.actual);
  s.opacity!=u?s.opacity=p.opacity/100:s.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+p.opacity+")";
  if(p.opacity!=p.final)p.timer=setTimeout(function(){p.alpha.apply(p,a)},p.dt);
  else{
    p.actual=p.opacity;
    if(fn!=u)return fn.apply(fn,Array.prototype.slice.call(a,1));
    }
  }
}
function opacity(id,a,t,fn){
var e=new Opacity(id);
e.final=a;
e.time=typeof(t)=='string'?Math.round(Math.abs(a-e.actual)*1000/parseInt(t)):t;
e.dt=100;
e.alpha.apply(e,Array.prototype.slice.call(arguments,3));
}
