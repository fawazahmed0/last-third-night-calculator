!function(){function t(t,e,r,n){Object.defineProperty(t,e,{get:r,set:n,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},a=r.parcelRequireedbe;null==a&&((a=function(t){if(t in n)return n[t].exports;if(t in o){var e=o[t];delete o[t];var r={id:t,exports:{}};return n[t]=r,e.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,e){o[t]=e},r.parcelRequireedbe=a),a.register("gm4sb",(function(e,r){var n,o;t(e.exports,"register",(function(){return n}),(function(t){return n=t})),t(e.exports,"resolve",(function(){return o}),(function(t){return o=t}));var a={};n=function(t){for(var e=Object.keys(t),r=0;r<e.length;r++)a[e[r]]=t[e[r]]},o=function(t){var e=a[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),a.register("94QpV",(function(t,e){"use strict";var r=a("fJTwY"),n=a("evd6Q");const o=.833,i=.3,u=6,s=12,c=18,l=-6;t.exports=class{get solarNoon(){return this.sun.solarNoon}get sunrise(){return this.sun.timeAtAngle(o,!0)}get sunset(){return this.sun.timeAtAngle(o)}get sunriseEnd(){return this.sun.timeAtAngle(i,!0)}get sunsetStart(){return this.sun.timeAtAngle(i,!1)}get civilDawn(){return this.sun.timeAtAngle(u,!0)}get dawn(){return this.civilDawn}get civilDusk(){return this.sun.timeAtAngle(u,!1)}get dusk(){return this.civilDusk}get nauticalDawn(){return this.sun.timeAtAngle(s,!0)}get nauticalDusk(){return this.sun.timeAtAngle(s,!1)}get nightStart(){return this.astronomicalDusk}get astronomicalDusk(){return this.sun.timeAtAngle(c,!1)}get astronomicalDawn(){return this.sun.timeAtAngle(c,!0)}get nightEnd(){return this.astronomicalDawn}get goldenHourStart(){return this.sun.timeAtAngle(l,!1)}get goldenHourEnd(){return this.sun.timeAtAngle(l,!0)}get lunarDistance(){return this.moon.distance}get lunarIlluminosity(){return this.moon.illuminosity}get sunAltitude(){return this.sun.sunAltitude()}constructor(t,e,o){this.date=t,this.lat=e,this.longitude=o,this.sun=new r(t,e,o),this.moon=new n(t,e,o)}}})),a.register("fJTwY",(function(t,e){"use strict";var r=function(t,e){var r=60*(e-Math.floor(e));return new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),0,e,r))};function n(t){return(t-2451545)/36525}function o(t){var e,r=Math.floor(t+.5),n=t+.5-r;if(r<2299161)e=r;else{var o=Math.floor((r-1867216.25)/36524.25);e=r+1+o-Math.floor(o/4)}var a,i=e+1524,u=Math.floor((i-122.1)/365.25),s=Math.floor(365.25*u),c=Math.floor((i-s)/30.6001),l=i-s-Math.floor(30.6001*c)+n,f=c<14?c-1:c-13,h=(a=f>2?u-4716:u-4715)%4==0&&a%100!=0||a%400==0?1:2;return Math.floor(275*f/9)-h*Math.floor((f+9)/12)+l-30}function a(t){return 180*t/Math.PI}function i(t){return Math.PI*t/180}function u(t){for(var e=280.46646+t*(36000.76983+3032e-7*t);e>360;)e-=360;for(;e<0;)e+=360;return e}function s(t){return 357.52911+t*(35999.05029-1537e-7*t)}function c(t){var e=u(t),r=function(t){var e=i(s(t));return Math.sin(e)*(1.914602-t*(.004817+14e-6*t))+Math.sin(e+e)*(.019993-101e-6*t)+289e-6*Math.sin(e+e+e)}(t);return e+r}function l(t){var e=function(t){return 23+(26+(21.448-t*(46.815+t*(59e-5-.001813*t)))/60)/60}(t),r=125.04-1934.136*t;return e+.00256*Math.cos(i(r))}function f(t){var e=l(t),r=function(t){var e=125.04-1934.136*t;return c(t)-.00569-.00478*Math.sin(i(e))}(t),n=Math.sin(i(e))*Math.sin(i(r));return a(Math.asin(n))}function h(t){var e=l(t),r=u(t),n=function(t){return.016708634-t*(42037e-9+1.267e-7*t)}(t),o=s(t),c=Math.tan(i(e)/2);c*=c;var f=Math.sin(2*i(r)),h=Math.sin(i(o));return 4*a(c*f-2*n*h+4*n*c*h*Math.cos(2*i(r))-.5*c*c*Math.sin(4*i(r))-1.25*n*n*Math.sin(2*i(o)))}function d(t){for(var e=!1,r=""+t,n=0;n<r.length;n++){var o=r.charAt(n);if(0!==n||"-"!==o&&"+"!==o)if("."!==o||e){if(o<"0"||o>"9")return!1}else e=!0}return!0}function g(t){if(t<9e5||t>2817e3)return"error";var e,r=Math.floor(t+.5),n=t+.5-r;if(r<2299161)e=r;else{var o=Math.floor((r-1867216.25)/36524.25);e=r+1+o-Math.floor(o/4)}var a=e+1524,i=Math.floor((a-122.1)/365.25),u=Math.floor(365.25*i),s=Math.floor((a-u)/30.6001),c=a-u-Math.floor(30.6001*s)+n,l=s<14?s-1:s-13,f=l>2?i-4716:i-4715;return new Date(Date.UTC(f,l-1,c,0,0,0))}function v(t,e,r,o,u){var s=n(r),c=h(s),l=function(t,e,r){var n=i(e),o=i(r),a=Math.cos(i(90+t))/(Math.cos(n)*Math.cos(o))-Math.tan(n)*Math.tan(o);return Math.acos(a)}(e,o,f(s));return t||(l=-l),720-4*(u+a(l))-c}function m(t,e,r,n,o,a){for(var i=n,u=t?1:-1,s=v(e,r,i,o,a);!d(s);)s=v(e,r,i+=u,o,a);return i}t.exports=class{get solarNoon(){return function(t,e,o){var a=h(n(t-e/360)),i=n(t+(720-4*e-a)/1440);a=h(i);var u=720-4*e-a;for(;u<0;)u+=1440;for(;u>=1440;)u-=1440;return r(o,u)}(this.julianDate,this.longitude,this.date)}timeAtAngle(t,e){return function(t,e,n,a,i,u){var s=v(t,e,n,i,u),c=v(t,e,n+s/1440,i,u);if(d(c))return r(a,c);var l=o(n);return g(m(i>66.4&&l>79&&l<267||i<-66.4&&(l<83||l>263)?!t:t,t,e,n,i,u))}(e,t,this.julianDate,this.date,this.latitude,this.longitude)}sunAltitude(){return t=this.julianDate,e=this.latitude,r=o(t),n=i(-23.45*Math.cos(i(360/365*(r+10)))),u=0,e=i(e),a(Math.asin(Math.sin(n)*Math.sin(e)+Math.cos(n)*Math.cos(u)*Math.cos(e)));var t,e,r,n,u}constructor(t,e,r){this.date=t,this.latitude=e,this.longitude=r,this.julianDate=function(t){var e=t.getFullYear(),r=t.getMonth()+1;r<3&&(e--,r+=12);var n=t.getDate(),o=Math.floor(e/100),a=2-o+Math.floor(o/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(r+1))+n+a-1524.5}(t)}}})),a.register("evd6Q",(function(t,e){"use strict";function r(t){var e=t.getFullYear(),r=t.getMonth()+1,n=t.getDate(),o=Math.floor(e/100),a=2-o+Math.floor(o/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(r+1))+n+a-1524.5}function n(t){return t-360*Math.floor(t/360)}function o(t){return Math.sin(t*Math.PI/180)}function a(t){return Math.cos(t*Math.PI/180)}var i=[0,2,2,0,0,0,2,2,2,2,0,1,0,2,0,0,4,0,4,2,2,1,1,2,2,4,2,0,2,2,1,2,0,0,2,2,2,4,0,3,2,4,0,2,2,2,4,0,4,1,2,0,1,3,4,2,0,1,2,2],u=[0,0,0,0,1,0,0,-1,0,-1,1,0,1,0,0,0,0,0,0,1,1,0,1,-1,0,0,0,1,0,-1,0,-2,1,2,-2,0,0,-1,0,0,1,-1,2,2,1,-1,0,0,-1,0,1,0,1,0,0,-1,2,1,0,0],s=[1,-1,0,2,0,0,-2,-1,1,0,-1,0,1,0,1,1,-1,3,-2,-1,0,-1,0,1,2,0,-3,-2,-1,-2,1,0,2,0,-1,1,0,-1,2,-1,1,-2,-1,-1,-2,0,1,4,0,-2,0,2,1,-2,-3,2,1,-1,3,-1],c=[0,0,0,0,0,2,0,0,0,0,0,0,0,-2,2,-2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,-2,2,0,2,0,0,0,0,0,0,-2,0,0,0,0,-2,-2,0,0,0,0,0,0,0,-2],l=[6288774,1274027,658314,213618,-185116,-114332,58793,57066,53322,45758,-40923,-34720,-30383,15327,-12528,10980,10675,10034,8548,-7888,-6766,-5163,4987,4036,3994,3861,3665,-2689,-2602,2390,-2348,2236,-2120,-2069,2048,-1773,-1595,1215,-1110,-892,-810,759,-713,-700,691,596,549,537,520,-487,-399,-381,351,-340,330,327,-323,299,294,0],f=[-20905355,-3699111,-2955968,-569925,48888,-3149,246158,-152138,-170733,-204586,-129620,108743,104755,10321,0,79661,-34782,-23210,-21636,24208,30824,-8379,-16675,-12831,-10445,-11650,14403,-7003,0,10056,6322,-9884,5751,0,-4950,4130,0,-3958,0,3258,2616,-1897,-2117,2354,0,0,-1423,-1117,-1571,-1739,0,-4421,0,0,0,0,1165,0,0,8752],h=[0,0,0,2,2,2,2,0,2,0,2,2,2,2,2,2,2,0,4,0,0,0,1,0,0,0,1,0,4,4,0,4,2,2,2,2,0,2,2,2,2,4,2,2,0,2,1,1,0,2,1,2,0,4,4,1,4,1,4,2],d=[0,0,0,0,0,0,0,0,0,0,-1,0,0,1,-1,-1,-1,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,-1,0,0,0,0,1,1,0,-1,-2,0,1,1,1,1,1,0,-1,1,0,-1,0,0,0,-1,-2],g=[0,1,1,0,-1,-1,0,2,1,2,0,-2,1,0,-1,0,-1,-1,-1,0,0,-1,0,1,1,0,0,3,0,-1,1,-2,0,2,1,-2,3,2,-3,-1,0,0,1,0,1,1,0,0,-2,-1,1,-2,2,-2,-1,1,1,-1,0,0],v=[1,1,-1,-1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,-1,-1,1,3,1,1,1,-1,-1,-1,1,-1,1,-3,1,-3,-1,-1,1,-1,1,-1,1,1,1,1,-1,3,-1,-1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,1],m=[5128122,280602,277693,173237,55413,46271,32573,17198,9266,8822,8216,4324,4200,-3359,2463,2211,2065,-1870,1828,-1794,-1749,-1565,-1491,-1475,-1410,-1344,-1335,1107,1021,833,777,671,607,596,491,-451,439,422,421,-366,-351,331,315,302,-283,-229,223,223,-220,-220,-185,181,-177,176,166,-164,132,-119,115,107];t.exports=class{get illuminosity(){return t=this.date,e=(r(t)+2451543.5-2451545)/36525,l=357.5291092+35999.0502909*e-1536e-7*(a=e*e)+(i=a*e)/2449e4,n(180-(s=297.8501921+445267.1114034*e-.0018819*a+i/545868-(u=i*e)/113065e3)-6.289*o(c=134.9633964+477198.8675055*e+.0087414*a+i/69699-u/14712e3)+2.1*o(l)-1.274*o(2*s-c)-.658*o(2*s)-.214*o(2*c)-.11*o(s))/360;var t,e,a,i,u,s,c,l}get distance(){return function(t){for(var e=r(t)+2451543.5,M=(e-2451545)/36525,p=M*M,w=p*M,D=w*M,A=218.3164477+481267.88123421*M-.0015786*p+w/538841-D/65194e3,b=297.8501921+445267.1114034*M-.0018819*p+w/545868-D/113065e3,y=357.5291092+35999.0502909*M-1536e-7*p+w/2449e4,S=134.9633964+477198.8675055*M+.0087414*p+w/69699-D/14712e3,I=93.272095+483202.0175233*M-.0036539*p-w/3526e3+D/86331e4,j=119.75+131.849*M,x=53.09+479264.29*M,C=313.45+481266.484*M,q=1-.002516*M-74e-7*p,k=q*q,P=0,R=0,T=0;T<60;T++){var U=1;1===Math.abs(u[T])&&(U=q),2===Math.abs(u[T])&&(U=k),P+=l[T]*U*o(n(i[T]*b+u[T]*y+s[T]*S+c[T]*I)),R+=f[T]*U*a(n(i[T]*b+u[T]*y+s[T]*S+c[T]*I))}var E=0;for(T=0;T<60;T++){U=1;1===Math.abs(d[T])&&(U=q),2===Math.abs(d[T])&&(U=k),E+=m[T]*U*o(n(h[T]*b+d[T]*y+g[T]*S+v[T]*I))}P=P+3958*o(n(j))+1962*o(n(A-I))+318*o(n(x)),E=E-2235*o(n(A))+382*o(n(C))+175*o(n(j-I))+175*o(n(j+I))+127*o(n(A-S))-115*o(n(A+S));var F=n(A+P/1e6),L=n(E/1e6);L>180&&(L-=360);var H=Math.round(385000.56+R/1e3),O=23.4393-3.563e-9*(e-2451543.5),Y=n((_=o(F)*a(O)-(Q=L,Math.tan(Q*Math.PI/180)*o(O)),J=a(F),180/Math.PI*Math.atan(_/J)-180*(J<0)))/15,N=n((B=o(L)*a(O)+a(L)*o(O)*o(F),180/Math.PI*Math.asin(B)));var B;var _,J;var Q;N>180&&(N-=360);return{ra:Y,dec:N,distance:H}}(this.date).distance}constructor(t,e,n){this.date=t,this.latitude=e,this.longitude=n,this.julianDate=r(t)}}})),a.register("5waPY",(function(e,r){var n;t(e.exports,"getBundleURL",(function(){return n}),(function(t){return n=t}));var o={};function a(t){return(""+t).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}n=function(t){var e=o[t];return e||(e=function(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(t)return a(t[2])}return"/"}(),o[t]=e),e}})),a("gm4sb").register(JSON.parse('{"lXpII":"index.3e5fbbc9.js","1ZyPq":"service-worker.js"}'));var i={};i=a("94QpV");var u={};!function(t,e){var r,n;"object"==typeof u?u=e():"function"==typeof define&&define.amd?define(e):(t=t||self,r=t.Cookies,(n=t.Cookies=e()).noConflict=function(){return t.Cookies=r,n})}(u,(function(){"use strict";function t(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)t[n]=r[n]}return t}var e=function e(r,n){function o(e,o,a){if("undefined"!=typeof document){"number"==typeof(a=t({},n,a)).expires&&(a.expires=new Date(Date.now()+864e5*a.expires)),a.expires&&(a.expires=a.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var u in a)a[u]&&(i+="; "+u,!0!==a[u]&&(i+="="+a[u].split(";")[0]));return document.cookie=e+"="+r.write(o,e)+i}}return Object.create({set:o,get:function(t){if("undefined"!=typeof document&&(!arguments.length||t)){for(var e=document.cookie?document.cookie.split("; "):[],n={},o=0;o<e.length;o++){var a=e[o].split("="),i=a.slice(1).join("=");try{var u=decodeURIComponent(a[0]);if(n[u]=r.read(i,u),t===u)break}catch(t){}}return t?n[t]:n}},remove:function(e,r){o(e,"",t({},r,{expires:-1}))},withAttributes:function(r){return e(this.converter,t({},this.attributes,r))},withConverter:function(r){return e(t({},this.converter,r),this.attributes)}},{attributes:{value:Object.freeze(n)},converter:{value:Object.freeze(r)}})}({read:function(t){return'"'===t[0]&&(t=t.slice(1,-1)),t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(t){return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});return e})),window.setPartNightAndHijri=function(){if(""!=document.querySelector("#fajrtime").value&&""!=document.querySelector("#magribtime").value){let[t,r,n]=function(t,e,r,n){let o,a=new Date,i=new Date(a);a.setHours(r),a.setMinutes(n),i.setHours(t),i.setMinutes(e),o=a>i?864e5-(a-i):i-a;let u=new Date(a.getTime()+2*o/3),s=new Date(a.getTime()+1*o/2),c=new Date;return a<c&&c.setDate(c.getDate()+1),[s,u,c]}(...document.querySelector("#fajrtime").value.split(":"),...document.querySelector("#magribtime").value.split(":"));document.querySelector("#lastthird").innerText=r.toLocaleString("default",{hour:"numeric",minute:"numeric"}),document.querySelector("#midnight").innerText=t.toLocaleString("default",{hour:"numeric",minute:"numeric"});let o=parseInt(document.querySelector("#dateoffset").value||"0");document.querySelector("#datepencil").removeAttribute("hidden"),n.setDate(n.getDate()+o);let a=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"numeric",day:"numeric",calendar:"islamic"}).format(n).split(" ")[0].split("/");document.querySelector("#hijridate").innerText=a[1]+" "+c[a[0]-1]+" "+a[2]+" AH";let i=(new Date).getDay(),s=new Date;for(s.setDate(a[1]),s.setMonth(a[0]-1);s.setFullYear(s.getFullYear()-1),s.getDay()!=i;);document.querySelector("#dateInput").value=s.toLocaleDateString("en-CA"),e(u).set("dateoffset",o,{expires:36500})}},window.autoDetectWithCoords=function(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((t=>{var e=new i(new Date,t.coords.latitude,t.coords.longitude);let r=e.astronomicalDawn,n=e.sunset;document.querySelector("#fajrtime").value=r.toLocaleString("default",{hour:"numeric",minute:"numeric",hour12:!1}),document.querySelector("#magribtime").value=n.toLocaleString("default",{hour:"numeric",minute:"numeric",hour12:!1}),setPartNightAndHijri()}))};var s;s=a("5waPY").getBundleURL("lXpII")+a("gm4sb").resolve("1ZyPq"),"serviceWorker"in navigator&&navigator.serviceWorker.register(s);var c=["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"];document.addEventListener("DOMContentLoaded",(function(){new URLSearchParams(document.location.search).get("date")&&document.querySelector("#datecontainerspan").removeAttribute("hidden"),[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(t){return new bootstrap.Tooltip(t)})),document.querySelector("#dateoffset").value=e(u).get("dateoffset")||"0"}))}();
//# sourceMappingURL=index.3e5fbbc9.js.map
