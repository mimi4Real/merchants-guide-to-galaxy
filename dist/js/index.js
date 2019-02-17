!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n(3);var r,i=n(1),a=(r=i)&&r.__esModule?r:{default:r};var s=null,o="test-btn",u="submit-btn",d="content-input",l="content-tips",c="content-define",f="content-result",m={addEventListener:function(e,t,n){e.addEventListener(t,function(e){n&&n(e)})}},h={handleAddInput:function(e){var t=document.getElementById(c),n=document.getElementById(d),r=e||n.value;if(r&&r.trim()){var i=s.execute(r);switch(i.status){case"error":this.addTips(i.message);break;default:var a=this.createFragment(r);t.appendChild(a),!e&&this.clearInput()}}},createFragment:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"p",n="string"==typeof e?[e]:e,r=document.createDocumentFragment();for(var i in n){var a=document.createElement(t);a.textContent=n[i],r.appendChild(a)}return r},addTips:function(e){e&&(document.getElementById(l).textContent=e)},clearInput:function(){document.getElementById(d).value="",document.getElementById(l).textContent=""},handleResult:function(){var e=s.solutions,t=document.createDocumentFragment(),n=document.getElementById(f);n.appendChild(this.createFragment("Test Output:","h3"));var r=e.map(function(e){var t=[].slice.call(e.alias||[]);return"unKnow"===e.type?t.push("I have no idea what you are talking about"):(t.push("is","howMany"===e.type?e.romanNumber*e.unitNumber:e.romanNumber),"howMany"===e.type&&t.push("Credits")),t.join(" ")});n.appendChild(this.createFragment(r)),n.appendChild(t)},handleClear:function(){s=new a.default,this.clearInput(),document.getElementById(c).innerHTML="",document.getElementById(f).innerHTML="",document.getElementById(c).appendChild(this.createFragment("Test Input:","h3"))},handleTest:function(){this.handleClear(),n(2).default.split("\n").forEach(function(e){h.handleAddInput(e)}),h.handleResult()}};!function(){s=new a.default;var e=document.getElementById(d);m.addEventListener(e,"keypress",function(e){13===e.keyCode&&h.handleAddInput()});var t=document.getElementById(u);m.addEventListener(t,"click",function(){h.handleResult()});var n=document.getElementById(o);m.addEventListener(n,"click",function(){h.handleTest()});var r=document.getElementById("clear-btn");m.addEventListener(r,"click",function(){h.handleClear()}),h.handleTest()}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var a={I:1,V:5,X:10,L:50,C:100,D:500,M:1e3},s=["I","V","X","L","C","D","M"],o={isAlias:new RegExp(/^[a-z]+\s+is\s+[i|v|x|l|c|d|m]$/i),isCredit:new RegExp(/^([a-z\s]+)is\s+(\d+.?\d*)\s+credits$/i),howMuch:new RegExp(/^how\s+much\s+is\s+([a-z\s]+)[?]$/i),howMany:new RegExp(/^how\s+many\s+credits\s+is\s+([a-z\s]+)[?]$/i)},u=function(e,t){return e.toLowerCase()===t.toLowerCase()},d=function(e){return e?e.match(/([ixcm])\1{3,}/i)||e.match(/([dlv])\1/i)?{status:"error",message:"I|X|C|M repeats at most 3 times, D|L|V cannot be repeated"}:{status:"success",message:""}:{status:"error",message:"there are undefined names in it"}},l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.alias=[],this.units=[],this.solutions=[]}return i(e,[{key:"execute",value:function(e){var t=this.getType(e),n=void 0;switch(t){case"isAlias":n=this.addAlias(e);break;case"isCredit":n=this.addUnit(e);break;case"howMuch":case"howMany":n=this.addSolutions(e,t);break;default:this.solutions.push({type:t,text:e}),n={status:"warning",message:""}}return n}},{key:"getType",value:function(e){var t="unKnow";for(var n in o)if(null!==o[n].exec(e.trim())){t=n;break}return t}},{key:"addAlias",value:function(e){var t=o.isAlias.exec(e)[0].split(/\s+/),n=t[0],r=t[2],i=this.alias.findIndex(function(e){return u(e.name,n)}),a=this.alias.findIndex(function(e){return u(e.value,r)});return i>-1||a>-1?{status:"error",message:(i>-1?n:r)+" has already assigned"}:(this.alias.push({name:t[0],value:t[2],text:e}),{status:"success",message:""})}},{key:"addUnit",value:function(e){var t=o.isCredit.exec(e),n=t[1].trim().split(/\s+/),r=n.pop();if(this.alias.findIndex(function(e){return u(e.name,r)})>-1)return{status:"error",message:r+" has been defined"};if(n.length<1)return{status:"error",message:"please provide at least one existing definition"};var i=this.aliasToRoman(n),a=d(i);if("error"===a.status)return a;var s=this.romanToNumber(i);return this.units.push({name:r,value:t[2]/s,text:e}),{status:"success",message:""}}},{key:"addSolutions",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"howMuch",n=o[t].exec(e)[1].trim();if(!n)return{status:"error",message:"please enter any definition"};var r=n.split(/\s+/),i=null;if("howMany"===t){if(i=r.pop(),this.units.findIndex(function(e){return u(e.name,i)})<0)return{status:"error",message:i+" is not defined"};if(r.length<1)return{status:"error",message:"please provide at least one existing definition"}}var a=this.aliasToRoman(r),s=d(a);if("error"===s.status)return s;var l={type:t,text:e,alias:r,roman:a,romanNumber:this.romanToNumber(a)};if("howMany"===t){l.unit=i;var c=this.units.findIndex(function(e){return u(e.name,i)});l.unitNumber=this.units[c].value}return this.solutions.push(l),{status:"success",message:""}}},{key:"aliasToRoman",value:function(e){var t=this,n=[],i=function(r){var i=t.alias.findIndex(function(t){return u(t.name,e[r])});if(-1===i)return{v:""};n.push(t.alias[i].value)};for(var a in e){var s=i(a);if("object"===(void 0===s?"undefined":r(s)))return s.v}return n.join("")}},{key:"romanToNumber",value:function(e){var t=[];return e.split("").forEach(function(e,n,r){var i=e.toUpperCase(),o=a[i],u=s.indexOf(i);t.push(o);var d=!1,l=!1;if(n!==r.length-1){var c=r[n+1].toUpperCase();d=s.indexOf(c)-u<=2,l=o<a[c]}u%2==0&&l&&d&&(t[n]*=-1)}),t.reduce(function(e,t){return e+t})}}]),e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default="glob is I\nprok is V\npish is X\ntegj is L\nglob glob Silver is 34 Credits\nglob prok Gold is 57800 Credits\npish pish Iron is 3910 Credits\nhow much is pish tegj glob glob ?\nhow many Credits is glob prok Silver ?\nhow many Credits is glob prok Gold ?\nhow many Credits is glob prok Iron ?\nhow much wood could a woodchuck chuck if a woodchuck could chuck wood ?"},function(e,t){}]);