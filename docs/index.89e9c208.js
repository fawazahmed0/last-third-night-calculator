!function(){function t(t,e,n,r){Object.defineProperty(t,e,{get:n,set:r,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=n.parcelRequireedbe;function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}function s(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||s(t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function l(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||s(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}null==i&&((i=function(t){if(t in r)return r[t].exports;if(t in o){var e=o[t];delete o[t];var n={id:t,exports:{}};return r[t]=n,e.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){o[t]=e},n.parcelRequireedbe=i),i.register("gm4sb",(function(e,n){var r,o;t(e.exports,"register",(function(){return r}),(function(t){return r=t})),t(e.exports,"resolve",(function(){return o}),(function(t){return o=t}));var i={};r=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)i[e[n]]=t[e[n]]},o=function(t){var e=i[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),i.register("94QpV",(function(t,e){"use strict";var n=i("fJTwY"),r=i("evd6Q"),o=.833,u=.3,s=6,f=12,l=18,h=-6,d=function(){function t(e,o,i){a(this,t),this.date=e,this.lat=o,this.longitude=i,this.sun=new n(e,o,i),this.moon=new r(e,o,i)}return c(t,[{key:"solarNoon",get:function(){return this.sun.solarNoon}},{key:"sunrise",get:function(){return this.sun.timeAtAngle(o,!0)}},{key:"sunset",get:function(){return this.sun.timeAtAngle(o)}},{key:"sunriseEnd",get:function(){return this.sun.timeAtAngle(u,!0)}},{key:"sunsetStart",get:function(){return this.sun.timeAtAngle(u,!1)}},{key:"civilDawn",get:function(){return this.sun.timeAtAngle(s,!0)}},{key:"dawn",get:function(){return this.civilDawn}},{key:"civilDusk",get:function(){return this.sun.timeAtAngle(s,!1)}},{key:"dusk",get:function(){return this.civilDusk}},{key:"nauticalDawn",get:function(){return this.sun.timeAtAngle(f,!0)}},{key:"nauticalDusk",get:function(){return this.sun.timeAtAngle(f,!1)}},{key:"nightStart",get:function(){return this.astronomicalDusk}},{key:"astronomicalDusk",get:function(){return this.sun.timeAtAngle(l,!1)}},{key:"astronomicalDawn",get:function(){return this.sun.timeAtAngle(l,!0)}},{key:"nightEnd",get:function(){return this.astronomicalDawn}},{key:"goldenHourStart",get:function(){return this.sun.timeAtAngle(h,!1)}},{key:"goldenHourEnd",get:function(){return this.sun.timeAtAngle(h,!0)}},{key:"lunarDistance",get:function(){return this.moon.distance}},{key:"lunarIlluminosity",get:function(){return this.moon.illuminosity}},{key:"sunAltitude",get:function(){return this.sun.sunAltitude()}}]),t}();t.exports=d})),i.register("fJTwY",(function(t,e){"use strict";var n=function(){function t(e,n,r){a(this,t),this.date=e,this.latitude=n,this.longitude=r,this.julianDate=function(t){var e=t.getFullYear(),n=t.getMonth()+1;n<3&&(e--,n+=12);var r=t.getDate(),o=Math.floor(e/100),i=2-o+Math.floor(o/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(n+1))+r+i-1524.5}(e)}return c(t,[{key:"solarNoon",get:function(){return function(t,e,n){var i=v(o(t-e/360)),a=o(t+(720-4*e-i)/1440);i=v(a);var u=720-4*e-i;for(;u<0;)u+=1440;for(;u>=1440;)u-=1440;return r(n,u)}(this.julianDate,this.longitude,this.date)}},{key:"timeAtAngle",value:function(t,e){return function(t,e,n,o,a,u){var c=M(t,e,n,a,u),s=M(t,e,n+c/1440,a,u);if(m(s))return r(o,s);var f=i(n);return p(y(a>66.4&&f>79&&f<267||a<-66.4&&(f<83||f>263)?!t:t,t,e,n,a,u))}(e,t,this.julianDate,this.date,this.latitude,this.longitude)}},{key:"sunAltitude",value:function(){return t=this.julianDate,e=this.latitude,n=i(t),r=s(-23.45*Math.cos(s(360/365*(n+10)))),o=0,e=s(e),u(Math.asin(Math.sin(r)*Math.sin(e)+Math.cos(r)*Math.cos(o)*Math.cos(e)));var t,e,n,r,o}}]),t}(),r=function(t,e){var n=60*(e-Math.floor(e));return new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),0,e,n))};function o(t){return(t-2451545)/36525}function i(t){var e,n=Math.floor(t+.5),r=t+.5-n;if(n<2299161)e=n;else{var o=Math.floor((n-1867216.25)/36524.25);e=n+1+o-Math.floor(o/4)}var i,a=e+1524,u=Math.floor((a-122.1)/365.25),c=Math.floor(365.25*u),s=Math.floor((a-c)/30.6001),f=a-c-Math.floor(30.6001*s)+r,l=s<14?s-1:s-13,h=(i=l>2?u-4716:u-4715)%4==0&&i%100!=0||i%400==0?1:2;return Math.floor(275*l/9)-h*Math.floor((l+9)/12)+f-30}function u(t){return 180*t/Math.PI}function s(t){return Math.PI*t/180}function f(t){for(var e=280.46646+t*(36000.76983+3032e-7*t);e>360;)e-=360;for(;e<0;)e+=360;return e}function l(t){return 357.52911+t*(35999.05029-1537e-7*t)}function h(t){var e=f(t),n=function(t){var e=s(l(t));return Math.sin(e)*(1.914602-t*(.004817+14e-6*t))+Math.sin(e+e)*(.019993-101e-6*t)+289e-6*Math.sin(e+e+e)}(t);return e+n}function d(t){var e=function(t){return 23+(26+(21.448-t*(46.815+t*(59e-5-.001813*t)))/60)/60}(t),n=125.04-1934.136*t;return e+.00256*Math.cos(s(n))}function g(t){var e=d(t),n=function(t){var e=125.04-1934.136*t;return h(t)-.00569-.00478*Math.sin(s(e))}(t),r=Math.sin(s(e))*Math.sin(s(n));return u(Math.asin(r))}function v(t){var e=d(t),n=f(t),r=function(t){return.016708634-t*(42037e-9+1.267e-7*t)}(t),o=l(t),i=Math.tan(s(e)/2);i*=i;var a=Math.sin(2*s(n)),c=Math.sin(s(o));return 4*u(i*a-2*r*c+4*r*i*c*Math.cos(2*s(n))-.5*i*i*Math.sin(4*s(n))-1.25*r*r*Math.sin(2*s(o)))}function m(t){for(var e=!1,n=""+t,r=0;r<n.length;r++){var o=n.charAt(r);if(0!==r||"-"!==o&&"+"!==o)if("."!==o||e){if(o<"0"||o>"9")return!1}else e=!0}return!0}function p(t){if(t<9e5||t>2817e3)return"error";var e,n=Math.floor(t+.5),r=t+.5-n;if(n<2299161)e=n;else{var o=Math.floor((n-1867216.25)/36524.25);e=n+1+o-Math.floor(o/4)}var i=e+1524,a=Math.floor((i-122.1)/365.25),u=Math.floor(365.25*a),c=Math.floor((i-u)/30.6001),s=i-u-Math.floor(30.6001*c)+r,f=c<14?c-1:c-13,l=f>2?a-4716:a-4715;return new Date(Date.UTC(l,f-1,s,0,0,0))}function M(t,e,n,r,i){var a=o(n),c=v(a),f=function(t,e,n){var r=s(e),o=s(n),i=Math.cos(s(90+t))/(Math.cos(r)*Math.cos(o))-Math.tan(r)*Math.tan(o);return Math.acos(i)}(e,r,g(a));return t||(f=-f),720-4*(i+u(f))-c}function y(t,e,n,r,o,i){for(var a=r,u=t?1:-1,c=M(e,n,a,o,i);!m(c);)c=M(e,n,a+=u,o,i);return a}t.exports=n})),i.register("evd6Q",(function(t,e){"use strict";var n=function(){function t(e,n,o){a(this,t),this.date=e,this.latitude=n,this.longitude=o,this.julianDate=r(e)}return c(t,[{key:"illuminosity",get:function(){return t=this.date,e=(r(t)+2451543.5-2451545)/36525,f=357.5291092+35999.0502909*e-1536e-7*(n=e*e)+(a=n*e)/2449e4,o(180-(c=297.8501921+445267.1114034*e-.0018819*n+a/545868-(u=a*e)/113065e3)-6.289*i(s=134.9633964+477198.8675055*e+.0087414*n+a/69699-u/14712e3)+2.1*i(f)-1.274*i(2*c-s)-.658*i(2*c)-.214*i(2*s)-.11*i(c))/360;var t,e,n,a,u,c,s,f}},{key:"distance",get:function(){return function(t){for(var e=r(t)+2451543.5,n=(e-2451545)/36525,a=n*n,c=a*n,w=c*n,D=218.3164477+481267.88123421*n-.0015786*a+c/538841-w/65194e3,b=297.8501921+445267.1114034*n-.0018819*a+c/545868-w/113065e3,A=357.5291092+35999.0502909*n-1536e-7*a+c/2449e4,k=134.9633964+477198.8675055*n+.0087414*a+c/69699-w/14712e3,S=93.272095+483202.0175233*n-.0036539*a-c/3526e3+w/86331e4,I=119.75+131.849*n,j=53.09+479264.29*n,C=313.45+481266.484*n,x=1-.002516*n-74e-7*a,q=x*x,T=0,P=0,R=0;R<60;R++){var E=1;1===Math.abs(f[R])&&(E=x),2===Math.abs(f[R])&&(E=q),T+=d[R]*E*i(o(s[R]*b+f[R]*A+l[R]*k+h[R]*S)),P+=g[R]*E*u(o(s[R]*b+f[R]*A+l[R]*k+h[R]*S))}var U=0;for(R=0;R<60;R++){E=1;1===Math.abs(m[R])&&(E=x),2===Math.abs(m[R])&&(E=q),U+=y[R]*E*i(o(v[R]*b+m[R]*A+p[R]*k+M[R]*S))}T=T+3958*i(o(I))+1962*i(o(D-S))+318*i(o(j)),U=U-2235*i(o(D))+382*i(o(C))+175*i(o(I-S))+175*i(o(I+S))+127*i(o(D-k))-115*i(o(D+k));var O=o(D+T/1e6),F=o(U/1e6);F>180&&(F-=360);var H=Math.round(385000.56+P/1e3),L=23.4393-3.563e-9*(e-2451543.5),Y=o((_=i(O)*u(L)-(Q=F,Math.tan(Q*Math.PI/180)*i(L)),J=u(O),180/Math.PI*Math.atan(_/J)-180*(J<0)))/15,N=o((B=i(F)*u(L)+u(F)*i(L)*i(O),180/Math.PI*Math.asin(B)));var B;var _,J;var Q;N>180&&(N-=360);return{ra:Y,dec:N,distance:H}}(this.date).distance}}]),t}();function r(t){var e=t.getFullYear(),n=t.getMonth()+1,r=t.getDate(),o=Math.floor(e/100),i=2-o+Math.floor(o/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(n+1))+r+i-1524.5}function o(t){return t-360*Math.floor(t/360)}function i(t){return Math.sin(t*Math.PI/180)}function u(t){return Math.cos(t*Math.PI/180)}var s=[0,2,2,0,0,0,2,2,2,2,0,1,0,2,0,0,4,0,4,2,2,1,1,2,2,4,2,0,2,2,1,2,0,0,2,2,2,4,0,3,2,4,0,2,2,2,4,0,4,1,2,0,1,3,4,2,0,1,2,2],f=[0,0,0,0,1,0,0,-1,0,-1,1,0,1,0,0,0,0,0,0,1,1,0,1,-1,0,0,0,1,0,-1,0,-2,1,2,-2,0,0,-1,0,0,1,-1,2,2,1,-1,0,0,-1,0,1,0,1,0,0,-1,2,1,0,0],l=[1,-1,0,2,0,0,-2,-1,1,0,-1,0,1,0,1,1,-1,3,-2,-1,0,-1,0,1,2,0,-3,-2,-1,-2,1,0,2,0,-1,1,0,-1,2,-1,1,-2,-1,-1,-2,0,1,4,0,-2,0,2,1,-2,-3,2,1,-1,3,-1],h=[0,0,0,0,0,2,0,0,0,0,0,0,0,-2,2,-2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,-2,2,0,2,0,0,0,0,0,0,-2,0,0,0,0,-2,-2,0,0,0,0,0,0,0,-2],d=[6288774,1274027,658314,213618,-185116,-114332,58793,57066,53322,45758,-40923,-34720,-30383,15327,-12528,10980,10675,10034,8548,-7888,-6766,-5163,4987,4036,3994,3861,3665,-2689,-2602,2390,-2348,2236,-2120,-2069,2048,-1773,-1595,1215,-1110,-892,-810,759,-713,-700,691,596,549,537,520,-487,-399,-381,351,-340,330,327,-323,299,294,0],g=[-20905355,-3699111,-2955968,-569925,48888,-3149,246158,-152138,-170733,-204586,-129620,108743,104755,10321,0,79661,-34782,-23210,-21636,24208,30824,-8379,-16675,-12831,-10445,-11650,14403,-7003,0,10056,6322,-9884,5751,0,-4950,4130,0,-3958,0,3258,2616,-1897,-2117,2354,0,0,-1423,-1117,-1571,-1739,0,-4421,0,0,0,0,1165,0,0,8752],v=[0,0,0,2,2,2,2,0,2,0,2,2,2,2,2,2,2,0,4,0,0,0,1,0,0,0,1,0,4,4,0,4,2,2,2,2,0,2,2,2,2,4,2,2,0,2,1,1,0,2,1,2,0,4,4,1,4,1,4,2],m=[0,0,0,0,0,0,0,0,0,0,-1,0,0,1,-1,-1,-1,1,0,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,-1,0,0,0,0,1,1,0,-1,-2,0,1,1,1,1,1,0,-1,1,0,-1,0,0,0,-1,-2],p=[0,1,1,0,-1,-1,0,2,1,2,0,-2,1,0,-1,0,-1,-1,-1,0,0,-1,0,1,1,0,0,3,0,-1,1,-2,0,2,1,-2,3,2,-3,-1,0,0,1,0,1,1,0,0,-2,-1,1,-2,2,-2,-1,1,1,-1,0,0],M=[1,1,-1,-1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,-1,-1,1,3,1,1,1,-1,-1,-1,1,-1,1,-3,1,-3,-1,-1,1,-1,1,-1,1,1,1,1,-1,3,-1,-1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,1],y=[5128122,280602,277693,173237,55413,46271,32573,17198,9266,8822,8216,4324,4200,-3359,2463,2211,2065,-1870,1828,-1794,-1749,-1565,-1491,-1475,-1410,-1344,-1335,1107,1021,833,777,671,607,596,491,-451,439,422,421,-366,-351,331,315,302,-283,-229,223,223,-220,-220,-185,181,-177,176,166,-164,132,-119,115,107];t.exports=n})),i.register("5waPY",(function(e,n){var r;t(e.exports,"getBundleURL",(function(){return r}),(function(t){return r=t}));var o={};function i(t){return(""+t).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(t){var e=o[t];return e||(e=function(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(t)return i(t[2])}return"/"}(),o[t]=e),e}})),i("gm4sb").register(JSON.parse('{"lXpII":"index.89e9c208.js","1ZyPq":"service-worker.js"}'));var h={};h=i("94QpV");var d={};function g(t,e,n,r){var o,i=new Date,a=new Date(i);i.setHours(n),i.setMinutes(r),a.setHours(t),a.setMinutes(e),o=i>a?864e5-(i-a):a-i;var u=new Date(i.getTime()+2*o/3),c=new Date(i.getTime()+1*o/2),s=new Date;return i<s&&s.setDate(s.getDate()+1),[c,u,s]}!function(t,e){var n,r;"object"==typeof d?d=e():"function"==typeof define&&define.amd?define(e):(t=t||self,n=t.Cookies,(r=t.Cookies=e()).noConflict=function(){return t.Cookies=n,r})}(d,(function(){"use strict";function t(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}var e=function e(n,r){function o(e,o,i){if("undefined"!=typeof document){"number"==typeof(i=t({},r,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var a="";for(var u in i)i[u]&&(a+="; "+u,!0!==i[u]&&(a+="="+i[u].split(";")[0]));return document.cookie=e+"="+n.write(o,e)+a}}return Object.create({set:o,get:function(t){if("undefined"!=typeof document&&(!arguments.length||t)){for(var e=document.cookie?document.cookie.split("; "):[],r={},o=0;o<e.length;o++){var i=e[o].split("="),a=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(r[u]=n.read(a,u),t===u)break}catch(t){}}return t?r[t]:r}},remove:function(e,n){o(e,"",t({},n,{expires:-1}))},withAttributes:function(n){return e(this.converter,t({},this.attributes,n))},withConverter:function(n){return e(t({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(n)}})}({read:function(t){return'"'===t[0]&&(t=t.slice(1,-1)),t.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(t){return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});return e})),window.setPartNightAndHijri=function(){if(""!=document.querySelector("#fajrtime").value&&""!=document.querySelector("#magribtime").value){var t=f(g.apply(void 0,l(document.querySelector("#fajrtime").value.split(":")).concat(l(document.querySelector("#magribtime").value.split(":"))))),n=t[0],r=t[1],o=t[2];document.querySelector("#lastthird").innerText=r.toLocaleString("default",{hour:"numeric",minute:"numeric"}),document.querySelector("#midnight").innerText=n.toLocaleString("default",{hour:"numeric",minute:"numeric"});var i=parseInt(document.querySelector("#dateoffset").value||"0");document.querySelector("#datepencil").removeAttribute("hidden"),o.setDate(o.getDate()+i);var a=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"numeric",day:"numeric",calendar:"islamic"}).format(o).split(" ")[0].split("/");document.querySelector("#hijridate").innerText=a[1]+" "+m[a[0]-1]+" "+a[2]+" AH";var u=(new Date).getDay(),c=new Date;for(c.setDate(a[1]),c.setMonth(a[0]-1),c.setFullYear(a[2]);c.setFullYear(c.getFullYear()-1),c.getDay()!=u;);document.querySelector("#dateInput").value=c.toLocaleDateString("en-CA"),e(d).set("dateoffset",i,{expires:36500})}},window.autoDetectWithCoords=function(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((function(t){var e=new h(new Date,t.coords.latitude,t.coords.longitude),n=e.astronomicalDawn,r=e.sunset;document.querySelector("#fajrtime").value=n.toLocaleString("default",{hour:"numeric",minute:"numeric",hour12:!1}),document.querySelector("#magribtime").value=r.toLocaleString("default",{hour:"numeric",minute:"numeric",hour12:!1}),setPartNightAndHijri()}))};var v;v=i("5waPY").getBundleURL("lXpII")+i("gm4sb").resolve("1ZyPq"),"serviceWorker"in navigator&&navigator.serviceWorker.register(v);var m=["Muharram","Safar","Rabiʻ I","Rabiʻ II","Jumada I","Jumada II","Rajab","Shaʻban","Ramadan","Shawwal","Dhuʻl-Qiʻdah","Dhuʻl-Hijjah"];document.addEventListener("DOMContentLoaded",(function(){[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(t){return new bootstrap.Tooltip(t)})),document.querySelector("#dateoffset").value=e(d).get("dateoffset")||"0"}))}();
//# sourceMappingURL=index.89e9c208.js.map