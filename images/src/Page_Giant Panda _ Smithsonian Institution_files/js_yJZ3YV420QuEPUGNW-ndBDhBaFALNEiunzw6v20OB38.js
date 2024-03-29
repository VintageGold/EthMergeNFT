/* luminateExtend.js | Version: 1.8.1 (18-OCT-2016) */
!function(a){var b=function(b){return b&&a.inArray(b,["es_US","en_CA","fr_CA","en_GB","en_AU"])<0&&(b="en_US"),b},c=function(a){return a&&(a=b(a),luminateExtend.sessionVars.set("locale",a)),a},d=function(a,b){return(a?luminateExtend.global.path.secure+"S":luminateExtend.global.path.nonsecure)+"PageServer"+(luminateExtend.global.routingId&&""!==luminateExtend.global.routingId?";"+luminateExtend.global.routingId:"")+"?pagename=luminateExtend_server&pgwrap=n"+(b?"&"+b:"")},e=function(b,c){if(b.responseFilter&&b.responseFilter.array&&b.responseFilter.filter&&luminateExtend.utils.stringToObj(b.responseFilter.array,c)){var e,f,d=b.responseFilter.filter.split("==")[0].split("!=")[0].replace(/^\s+|\s+$/g,"");if(b.responseFilter.filter.indexOf("!=")!==-1?(e="nequal",f=b.responseFilter.filter.split("!=")[1]):b.responseFilter.filter.indexOf("==")!==-1&&(e="equal",f=b.responseFilter.filter.split("==")[1]),e&&f){f=f.replace(/^\s+|\s+$/g,"");var g=[],h=!1;if(a.each(luminateExtend.utils.ensureArray(luminateExtend.utils.stringToObj(b.responseFilter.array,c)),function(){"nequal"===e&&this[d]===f||"equal"===e&&this[d]!==f?h=!0:g.push(this)}),h){var i=b.responseFilter.array.split(".");a.each(c,function(b,d){b===i[0]&&a.each(d,function(d,e){d===i[1]&&(2===i.length?c[b][d]=g:a.each(e,function(e,f){e===i[2]&&(3===i.length?c[b][d][e]=g:a.each(f,function(a,f){a===i[3]&&4===i.length&&(c[b][d][e][a]=g)}))}))})})}}}var j=a.noop;b.callback&&("function"==typeof b.callback?j=b.callback:b.callback.error&&c.errorResponse?j=b.callback.error:b.callback.success&&!c.errorResponse&&(j=b.callback.success));var k=b.data.indexOf("&method=login")!==-1&&b.data.indexOf("&method=loginTest")===-1,l=b.data.indexOf("&method=logout")!==-1;if(k||l){var m=function(){j(c)},n={callback:m,useCache:!1,useHTTPS:b.useHTTPS};k&&c.loginResponse&&c.loginResponse.nonce&&(n.nonce="NONCE_TOKEN="+c.loginResponse.nonce),luminateExtend.api.getAuth(n)}else j(c)};window.luminateExtend=function(a){luminateExtend.init(a||{})},luminateExtend.library={version:"1.7.1"},luminateExtend.global={update:function(b,d){b&&(b.length?d&&("locale"===b&&(d=c(d)),luminateExtend.global[b]=d):(b.locale&&(b.locale=c(b.locale)),luminateExtend.global=a.extend(luminateExtend.global,b)))}},luminateExtend.init=function(c){var d=a.extend({apiCommon:{},auth:{type:"auth"},path:{}},c||{});if(d.locale&&(d.locale=b(d.locale)),d.supportsCORS=!1,window.XMLHttpRequest){var e=new XMLHttpRequest;"withCredentials"in e&&(d.supportsCORS=!0)}return luminateExtend.global=a.extend(luminateExtend.global,d),luminateExtend},luminateExtend.api=function(a){luminateExtend.api.request(a||{})},luminateExtend.api.bind=function(b){return b=b||"form.luminateApi",a(b).length>0&&a(b).each(function(){"form"===this.nodeName.toLowerCase()&&a(this).bind("submit",function(b){b.cancelBubble=!0,b.returnValue=!1,b.stopPropagation&&(b.stopPropagation(),b.preventDefault()),a(this).attr("id")||a(this).attr("id","luminateApi-"+(new Date).getTime());var g,c=a(this).attr("action"),d=c.split("?"),e=a(this).data("luminateapi"),f=d[0].indexOf("/site/")!==-1?d[0].split("/site/")[1]:d[0],h=a(this).attr("enctype"),i=d.length>1?d[1]:"",j="#"+a(this).attr("id"),k=!1,l=!1;e&&(e.callback&&(g=luminateExtend.utils.stringToObj(e.callback)),e.requiresAuth&&"true"===e.requiresAuth&&(k=!0),(0===c.indexOf("https:")||"https:"===window.location.protocol&&c.indexOf("http")===-1)&&(l=!0)),luminateExtend.api.request({api:f,callback:g,contentType:h,data:i,form:j,requiresAuth:k,useHTTPS:l})})}),luminateExtend},luminateExtend.api.getAuth=function(b){var c=a.extend({useCache:!0,useHTTPS:!1},b||{});if(luminateExtend.api.getAuthLoad)if(luminateExtend.api.getAuthLoad=!1,c.useCache&&luminateExtend.global.auth.type&&luminateExtend.global.auth.token)luminateExtend.api.getAuthLoad=!0,c.callback&&c.callback();else{var e=function(a){luminateExtend.global.update(a),luminateExtend.api.getAuthLoad=!0,c.callback&&c.callback()};luminateExtend.global.supportsCORS?a.ajax({url:(c.useHTTPS?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"CRConsAPI",data:"luminateExtend="+luminateExtend.library.version+(c.nonce&&""!==c.nonce?"&"+c.nonce:"")+"&api_key="+luminateExtend.global.apiKey+"&method=getLoginUrl&response_format=json&v=1.0",xhrFields:{withCredentials:!0},dataType:"json",success:function(a){var b=a.getLoginUrlResponse,c=b.url,d=b.routing_id,f=b.JSESSIONID;d||c.indexOf("CRConsAPI;jsessionid=")===-1||(d=c.split("CRConsAPI;jsessionid=")[1].split("?")[0]),e({auth:{type:"auth",token:b.token},routingId:d?"jsessionid="+d:"",sessionCookie:f?"JSESSIONID="+f:""})}}):a.ajax({url:d(c.useHTTPS,"action=getAuth&callback=?"),dataType:"jsonp",success:e})}else{var f=function(){luminateExtend.api.getAuth(c)};setTimeout(f,1e3)}},luminateExtend.api.getAuthLoad=!0;var f=function(b){var c=a.extend({contentType:"application/x-www-form-urlencoded",data:"",requiresAuth:!1,useHTTPS:null},b||{}),f=["addressbook","advocacy","connect","cons","content","datasync","donation","email","group","orgevent","recurring","survey","teamraiser"];if(a.inArray(c.api.toLowerCase(),f)>=0&&(c.api="CR"+c.api.charAt(0).toUpperCase()+c.api.slice(1).toLowerCase()+"API",c.api=c.api.replace("Addressbook","AddressBook").replace("Datasync","DataSync").replace("Orgevent","OrgEvent")),luminateExtend.global.path.nonsecure&&luminateExtend.global.path.secure&&luminateExtend.global.apiKey&&c.api){"multipart/form-data"===c.contentType.split(";")[0]?c.contentType="multipart/form-data":c.contentType="application/x-www-form-urlencoded",c.contentType+="; charset=UTF-8",c.data="luminateExtend="+luminateExtend.library.version+(""===c.data?"":"&"+c.data),c.form&&a(c.form).length>0&&(c.data+="&"+a(c.form).eq(0).serialize()),c.data.indexOf("&api_key=")===-1&&(c.data+="&api_key="+luminateExtend.global.apiKey),luminateExtend.global.apiCommon.centerId&&c.data.indexOf("&center_id=")===-1&&(c.data+="&center_id="+luminateExtend.global.apiCommon.centerId),luminateExtend.global.apiCommon.categoryId&&c.data.indexOf("&list_category_id=")===-1&&(c.data+="&list_category_id="+luminateExtend.global.apiCommon.categoryId),c.data.indexOf("&response_format=xml")!==-1?c.data=c.data.replace(/&response_format=xml/g,"&response_format=json"):c.data.indexOf("&response_format=")===-1&&(c.data+="&response_format=json"),luminateExtend.global.apiCommon.source&&c.data.indexOf("&source=")===-1&&(c.data+="&source="+luminateExtend.global.apiCommon.source),luminateExtend.global.apiCommon.subSource&&c.data.indexOf("&sub_source=")===-1&&(c.data+="&sub_source="+luminateExtend.global.apiCommon.subSource),c.data.indexOf("&suppress_response_codes=")===-1&&(c.data+="&suppress_response_codes=true"),luminateExtend.global.locale&&c.data.indexOf("&s_locale=")===-1&&(c.data+="&s_locale="+luminateExtend.global.locale),c.data.indexOf("&v=")===-1&&(c.data+="&v=1.0");var g="http://",h=luminateExtend.global.path.nonsecure.split("http://")[1];"CRDonationAPI"===c.api||"CRTeamraiserAPI"===c.api||"CRConnectAPI"!==c.api&&("https:"===window.location.protocol&&null==c.useHTTPS||1==c.useHTTPS)?c.useHTTPS=!0:c.useHTTPS=!1,c.useHTTPS&&(g="https://",h=luminateExtend.global.path.secure.split("https://")[1]),g+=h+c.api;var i=!1,j=!1,k=!1;window.location.protocol===g.split("//")[0]&&document.domain===h.split("/")[0]?(i=!0,j=!0):luminateExtend.global.supportsCORS?j=!0:"postMessage"in window&&(k=!0);var l;j?l=function(){luminateExtend.global.routingId&&""!==luminateExtend.global.routingId&&(g+=";"+luminateExtend.global.routingId),c.requiresAuth&&c.data.indexOf("&"+luminateExtend.global.auth.type+"=")===-1&&(c.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token),luminateExtend.global.sessionCookie&&""!==luminateExtend.global.sessionCookie&&(c.data+="&"+luminateExtend.global.sessionCookie),c.data+="&ts="+(new Date).getTime(),a.ajax({url:g,data:c.data,xhrFields:{withCredentials:!0},contentType:c.contentType,dataType:"json",type:"POST",success:function(a){e(c,a)}})}:k&&(l=function(){var b=(new Date).getTime(),f="luminateApiPostMessage"+b,h=d(c.useHTTPS,"action=postMessage");luminateExtend.global.routingId&&""!==luminateExtend.global.routingId&&(g+=";"+luminateExtend.global.routingId),c.requiresAuth&&c.data.indexOf("&"+luminateExtend.global.auth.type+"=")===-1&&(c.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token),luminateExtend.global.sessionCookie&&""!==luminateExtend.global.sessionCookie&&(c.data+="&"+luminateExtend.global.sessionCookie),c.data+="&ts="+b,luminateExtend.api.request.postMessageEventHandler||(luminateExtend.api.request.postMessageEventHandler={},luminateExtend.api.request.postMessageEventHandler.handler=function(b){if(luminateExtend.global.path.nonsecure.indexOf(b.origin)!==-1||luminateExtend.global.path.secure.indexOf(b.origin)!==-1){var c=a.parseJSON(b.data),d=c.postMessageFrameId,e=a.parseJSON(decodeURIComponent(c.response));luminateExtend.api.request.postMessageEventHandler[d]&&luminateExtend.api.request.postMessageEventHandler[d](d,e)}},"undefined"!=typeof window.addEventListener?window.addEventListener("message",luminateExtend.api.request.postMessageEventHandler.handler,!1):"undefined"!=typeof window.attachEvent&&window.attachEvent("onmessage",luminateExtend.api.request.postMessageEventHandler.handler)),luminateExtend.api.request.postMessageEventHandler[f]=function(b,d){e(c,d),a("#"+b).remove(),delete luminateExtend.api.request.postMessageEventHandler[b]},a("body").append('<iframe style="position: absolute; top: 0; left: -999em;" name="'+f+'" id="'+f+'"></iframe>'),a("#"+f).bind("load",function(){var b='{"postMessageFrameId": "'+a(this).attr("id")+'", "requestUrl": "'+g+'", "requestContentType": "'+c.contentType+'", "requestData": "'+c.data+'"}',d=g.split("/site/")[0].split("/admin/")[0];document.getElementById(a(this).attr("id")).contentWindow.postMessage(b,d)}),a("#"+f).attr("src",h)}),c.requiresAuth||!j&&!i&&!luminateExtend.global.sessionCookie?luminateExtend.api.getAuth({callback:l,useHTTPS:c.useHTTPS}):l()}};luminateExtend.api.request=function(b){if(a.isArray(b)){b.reverse();var c=[];a.each(b,function(d){var e=a.extend({async:!0},this);if(e.async||d===b.length-1)c.push(e);else{var g=b[d+1];if(g.callback&&"function"!=typeof g.callback){var h=g.callback.success||a.noop;g.callback.success=function(a){h(a),f(e)}}else{var g=b[d+1],i=g.callback||a.noop;g.callback={success:function(a){i(a),f(e)},error:function(a){i(a)}}}}}),c.reverse(),a.each(c,function(){f(this)})}else f(b)},luminateExtend.sessionVars={set:function(a,b,c){var d={};c&&(d.callback=c),a&&(d.data="s_"+a+"="+(b||""),luminateExtend.utils.ping(d))}},luminateExtend.tags=function(a,b){luminateExtend.tags.parse(a,b)},luminateExtend.tags.parse=function(b,c){luminateExtend.widgets?luminateExtend.widgets(b,c):(b=b&&"all"!==b?luminateExtend.utils.ensureArray(b):["cons"],c=c||"body",a.each(b,function(b,d){if("cons"===d){var e=a(c).find(document.getElementsByTagName("luminate:cons"));if(e.length>0){var f=function(b){e.each(function(){b.getConsResponse?a(this).replaceWith(luminateExtend.utils.stringToObj(a(this).attr("field"),b.getConsResponse)):a(this).remove()})};luminateExtend.api.request({api:"cons",callback:f,data:"method=getUser",requiresAuth:!0})}}}))},luminateExtend.utils={ensureArray:function(b){return a.isArray(b)?b:b?[b]:[]},stringToObj:function(a,b){var c=b||window;if(a)for(var d=a.split("."),e=0;e<d.length;e++){if(e<d.length-1&&!c[d[e]])return{};c=c[d[e]]}return c},ping:function(b){var c=a.extend({data:null},b||{}),d="luminatePing"+(new Date).getTime();a("body").append('<img style="position: absolute; left: -999em; top: 0;" id="'+d+'" />'),a("#"+d).bind("load",function(){a(this).remove(),c.callback&&c.callback()}),a("#"+d).attr("src",("https:"===window.location.protocol?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"EstablishSession"+(luminateExtend.global.routingId&&""!==luminateExtend.global.routingId?";"+luminateExtend.global.routingId:"")+"?"+(null==c.data?"":c.data+"&")+"NEXTURL="+encodeURIComponent(("https:"===window.location.protocol?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"PixelServer"))},simpleDateFormat:function(c,d,e){if(e=e||luminateExtend.global.locale,e=b(e),d=d||(a.inArray(e,["en_CA","fr_CA","en_GB","en_AU"])>=0?"d/M/yy":"M/d/yy"),c=c||new Date,!(c instanceof Date)){var f=c.split("T")[0].split("-"),g=c.split("T").length>1?c.split("T")[1].split(".")[0].split("Z")[0].split("-")[0].split(":"):["00","00","00"];c=new Date(f[0],f[1]-1,f[2],g[0],g[1],g[2])}var h=function(a){return a=""+a,0===a.indexOf("0")&&"0"!==a?a.substring(1):a},i=function(a){return a=Number(a),isNaN(a)?"00":(a<10?"0":"")+a},j={month:i(c.getMonth()+1),date:i(c.getDate()),year:i(c.getFullYear()),day:c.getDay(),hour24:c.getHours(),hour12:c.getHours(),minutes:i(c.getMinutes()),ampm:"AM"};j.hour24>11&&(j.ampm="PM"),j.hour24=i(j.hour24),0===j.hour12&&(j.hour12=12),j.hour12>12&&(j.hour12=j.hour12-12),j.hour12=i(j.hour12);var k,l=function(a){var b=a.replace(/yy+(?=y)/g,"yy").replace(/MMM+(?=M)/g,"MMM").replace(/d+(?=d)/g,"d").replace(/EEE+(?=E)/g,"EEE").replace(/a+(?=a)/g,"").replace(/k+(?=k)/g,"k").replace(/h+(?=h)/g,"h").replace(/m+(?=m)/g,"m"),c=b.replace(/yyy/g,j.year).replace(/yy/g,j.year.substring(2)).replace(/y/g,j.year).replace(/dd/g,j.date).replace(/d/g,h(j.date)),d=function(a,b,c){for(var d=1;d<a.length;d++)if(!isNaN(a[d].substring(0,1))){var e=a[d].substring(0,2);a[d]=a[d].substring(2),isNaN(e.substring(1))&&(a[d]=e.substring(1)+a[d],e=e.substring(0,1)),e=Number(e),e>23&&(e=23);var f="+"===c?e:0-e;"kk"===b||"k"===b?(f=Number(j.hour24)+f,f>24?f-=24:f<0&&(f+=24)):(f=Number(j.hour12)+f,f>24?f-=24:f<0&&(f+=24),f>12&&(f-=12)),f=""+f,"kk"!==b&&"hh"!==b||(f=i(f)),("h"===b&&0===f||"hh"===b&&"00"===f)&&(f="12"),a[d]=f+a[d]}return a.join("")};c.indexOf("k+")!==-1&&(c=d(c.split("kk+"),"kk","+"),c=d(c.split("k+"),"k","+")),c.indexOf("k-")!==-1&&(c=d(c.split("kk-"),"kk","-"),c=d(c.split("k-"),"k","-")),c=c.replace(/kk/g,j.hour24).replace(/k/g,h(j.hour24)),c.indexOf("h+")!==-1&&(c=d(c.split("hh+"),"hh","+"),c=d(c.split("h+"),"h","+")),c.indexOf("h-")!==-1&&(c=d(c.split("hh-"),"hh","-"),c=d(c.split("h-"),"h","-")),c=c.replace(/hh/g,j.hour12<12&&j.hour12.indexOf&&0!==j.hour12.indexOf("0")?"0"+j.hour12:j.hour12).replace(/h/g,h(j.hour12)),c=c.replace(/mm/g,j.minutes).replace(/m/g,h(j.minutes)),c=c.replace(/a/g,"A");var f=["January","February","march","april","may","June","July","august","September","October","November","December"];"es_US"===e&&(f=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]),"fr_CA"===e&&(f=["janvier","f&#233;vrier","mars","avril","mai","juin","juillet","ao&#251;t","septembre","octobre","novembre","d&#233;cembre"]),c=c.replace(/MMMM/g,f[Number(j.month)-1]).replace(/MMM/g,f[Number(j.month)-1].substring(0,3)).replace(/MM/g,j.month).replace(/M/g,h(j.month)).replace(/march/g,"March").replace(/may/g,"May").replace(/Mayo/g,"mayo");var g=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return"es_US"===e&&(g=["domingo","lunes","martes","mi&eacute;rcoles","jueves","viernes","s&aacute;bado"]),"fr_CA"===e&&(g=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]),c=c.replace(/EEEE/g,g[j.day]).replace(/EEE/g,g[j.day].substring(0,3)).replace(/EE/g,g[j.day].substring(0,3)).replace(/E/g,g[j.day].substring(0,3)),c=c.replace(/A/g,j.ampm).replace(/april/g,"April").replace(/august/g,"August")};if(d.indexOf("'")!==-1){var m=d.replace(/\'+(?=\')/g,"''").split("''");if(1===m.length){m=d.split("'");for(var n=0;n<m.length;n++)n%2===0&&(m[n]=l(m[n]));return m.join("")}for(var n=0;n<m.length;n++){for(var o=m[n].split("'"),p=0;p<o.length;p++)p%2===0&&(o[p]=l(o[p]));m[n]=o.join("")}return m.join("'")}return k=l(d)}}}("undefined"==typeof jQuery&&"function"==typeof Zepto?Zepto:jQuery);;
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-backgroundblendmode-cssanimations-csscalc-csscolumns-cssfilters-cssgradients-cssmask-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvmaxunit-cssvminunit-cssvwunit-flexbox-generatedcontent-inlinesvg-multiplebgs-supports-svg-svgasimg-svgclippaths-svgfilters-touchevents-video-setclasses !*/
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,s,a;for(var l in b)if(b.hasOwnProperty(l)){if(e=[],t=b[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),x.push((o?"":"no-")+a.join("-"))}}function i(e){var t=P.className,n=Modernizr._config.classPrefix||"";if(E&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),E?P.className.baseVal=t:P.className=t)}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):E?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(t,n,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,t,n);var i=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(i){var s=i.error?"error":"log";i[s].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!n&&t.currentStyle&&t.currentStyle[r];return o}function l(e,t){return e-1===t||e===t||e+1===t}function d(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function c(e,t){if("object"==typeof e)for(var n in e)N(e,n)&&c(n,e[n]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;t="function"==typeof t?t():t,1==r.length?Modernizr[r[0]]=t:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=t),i([(t&&0!=t?"":"no-")+r.join("-")]),Modernizr._trigger(e,t)}return Modernizr}function u(){var e=t.body;return e||(e=s(E?"svg":"body"),e.fake=!0),e}function f(e,n,r,o){var i,a,l,d,c="modernizr",f=s("div"),p=u();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=o?o[r]:c+(r+1),f.appendChild(l);return i=s("style"),i.type="text/css",i.id="s"+c,(p.fake?p:f).appendChild(i),p.appendChild(f),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),f.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",d=P.style.overflow,P.style.overflow="hidden",P.appendChild(p)),a=n(f,e),p.fake?(p.parentNode.removeChild(p),P.style.overflow=d,P.offsetHeight):f.parentNode.removeChild(f),!!a}function p(e,t){return!!~(""+e).indexOf(t)}function h(e,t){return function(){return e.apply(t,arguments)}}function m(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?h(o,n||t):o);return!1}function g(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function v(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(g(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+g(t[o])+":"+r+")");return i=i.join(" or "),f("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==a(e,null,"position")})}return n}function y(e,t,o,i){function a(){c&&(delete L.style,delete L.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var l=v(e,o);if(!r(l,"undefined"))return l}for(var c,u,f,h,m,g=["modernizr","tspan","samp"];!L.style&&g.length;)c=!0,L.modElem=s(g.shift()),L.style=L.modElem.style;for(f=e.length,u=0;f>u;u++)if(h=e[u],m=L.style[h],p(h,"-")&&(h=d(h)),L.style[h]!==n){if(i||r(o,"undefined"))return a(),"pfx"==t?h:!0;try{L.style[h]=o}catch(y){}if(L.style[h]!=m)return a(),"pfx"==t?h:!0}return a(),!1}function w(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+j.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?y(a,t,o,i):(a=(e+" "+$.join(s+" ")+s).split(" "),m(a,t,n))}function T(e,t,r){return w(e,n,n,t,r)}var x=[],b=[],S={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){b.push({name:e,fn:t,options:n})},addAsyncTest:function(e){b.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr,Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var C="CSS"in e&&"supports"in e.CSS,_="supportsCSS"in e;Modernizr.addTest("supports",C||_),Modernizr.addTest("svgfilters",function(){var t=!1;try{t="SVGFEColorMatrixElement"in e&&2==SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE}catch(n){}return t});var P=t.documentElement,E="svg"===P.nodeName.toLowerCase();Modernizr.addTest("audio",function(){var e=s("audio"),t=!1;try{t=!!e.canPlayType,t&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("video",function(){var e=s("video"),t=!1;try{t=!!e.canPlayType,t&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("multiplebgs",function(){var e=s("a").style;return e.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(e.background)}),Modernizr.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var z=S._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];S._prefixes=z,Modernizr.addTest("csscalc",function(){var e="width:",t="calc(10px);",n=s("a");return n.style.cssText=e+z.join(t+e),!!n.style.length}),Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",o=0,i=z.length-1;i>o;o++)e=0===o?"to ":"",r+=t+z[o]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=t+"-webkit-"+n);var a=s("a"),l=a.style;return l.cssText=r,(""+l.backgroundImage).indexOf("gradient")>-1});var k={}.toString;Modernizr.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(k.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))});var N;!function(){var e={}.hasOwnProperty;N=r(e,"undefined")||r(e.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(t,n){return e.call(t,n)}}(),S._l={},S.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},S._trigger=function(e,t){if(this._l[e]){var n=this._l[e];setTimeout(function(){var e,r;for(e=0;e<n.length;e++)(r=n[e])(t)},0),delete this._l[e]}},Modernizr._q.push(function(){S.addTest=c}),Modernizr.addTest("svgasimg",t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var R=S.testStyles=f;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",z.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");R(r,function(e){n=9===e.offsetTop})}return n}),R('#modernizr{font:0/0 a}#modernizr:after{content:":)";visibility:hidden;font:7px/1 a}',function(e){Modernizr.addTest("generatedcontent",e.offsetHeight>=6)}),R("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),r=parseInt(a(t,null,"height"),10);Modernizr.addTest("cssvhunit",r==n)}),R("#modernizr1{width: 50vmax}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(e){var t=e.childNodes[2],n=e.childNodes[1],r=e.childNodes[0],o=parseInt((n.offsetWidth-n.clientWidth)/2,10),i=r.clientWidth/100,s=r.clientHeight/100,d=parseInt(50*Math.max(i,s),10),c=parseInt(a(t,null,"width"),10);Modernizr.addTest("cssvmaxunit",l(d,c)||l(d,c-o))},3),R("#modernizr1{width: 50vm;width:50vmin}#modernizr2{width:50px;height:50px;overflow:scroll}#modernizr3{position:fixed;top:0;left:0;bottom:0;right:0}",function(e){var t=e.childNodes[2],n=e.childNodes[1],r=e.childNodes[0],o=parseInt((n.offsetWidth-n.clientWidth)/2,10),i=r.clientWidth/100,s=r.clientHeight/100,d=parseInt(50*Math.min(i,s),10),c=parseInt(a(t,null,"width"),10);Modernizr.addTest("cssvminunit",l(d,c)||l(d,c-o))},3),R("#modernizr { width: 50vw; }",function(t){var n=parseInt(e.innerWidth/2,10),r=parseInt(a(t,null,"width"),10);Modernizr.addTest("cssvwunit",r==n)});var I="Moz O ms Webkit",j=S._config.usePrefixes?I.split(" "):[];S._cssomPrefixes=j;var B=function(t){var r,o=z.length,i=e.CSSRule;if("undefined"==typeof i)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+t;for(var s=0;o>s;s++){var a=z[s],l=a.toUpperCase()+"_"+r;if(l in i)return"@-"+a.toLowerCase()+"-"+t}return!1};S.atRule=B;var $=S._config.usePrefixes?I.toLowerCase().split(" "):[];S._domPrefixes=$;var A={elem:s("modernizr")};Modernizr._q.push(function(){delete A.elem});var L={style:A.elem.style};Modernizr._q.unshift(function(){delete L.style}),S.testAllProps=w,S.testAllProps=T,Modernizr.addTest("cssanimations",T("animationName","a",!0)),function(){Modernizr.addTest("csscolumns",function(){var e=!1,t=T("columnCount");try{e=!!t,e&&(e=new Boolean(e))}catch(n){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],r=0;r<n.length;r++)e=n[r].toLowerCase(),t=T("column"+n[r]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(t=t||T(n[r])),Modernizr.addTest("csscolumns."+e,t)}(),Modernizr.addTest("cssfilters",function(){if(Modernizr.supports)return T("filter","blur(2px)");var e=s("a");return e.style.cssText=z.join("filter:blur(2px); "),!!e.style.length&&(t.documentMode===n||t.documentMode>9)}),Modernizr.addTest("flexbox",T("flexBasis","1px",!0)),Modernizr.addTest("cssmask",T("maskRepeat","repeat-x",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&T("transform","scale(1)",!0)}),Modernizr.addTest("csstransforms3d",function(){var e=!!T("perspective","1px",!0),t=Modernizr._config.usePrefixes;if(e&&(!t||"webkitPerspective"in P.style)){var n,r="#modernizr{width:0;height:0}";Modernizr.supports?n="@supports (perspective: 1px)":(n="@media (transform-3d)",t&&(n+=",(-webkit-transform-3d)")),n+="{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}",R(r+n,function(t){e=7===t.offsetWidth&&18===t.offsetHeight})}return e}),Modernizr.addTest("csstransitions",T("transition","all",!0));var O=S.prefixed=function(e,t,n){return 0===e.indexOf("@")?B(e):(-1!=e.indexOf("-")&&(e=d(e)),t?w(e,t,n):w(e,"pfx"))};Modernizr.addTest("backgroundblendmode",O("backgroundBlendMode","text")),o(),i(x),delete S.addTest,delete S.addAsyncTest;for(var M=0;M<Modernizr._q.length;M++)Modernizr._q[M]();e.Modernizr=Modernizr}(window,document);;
/*! ScrollMagic v2.0.2 | (c) 2015 Jan Paepke (@janpaepke) | license & info: http://janpaepke.github.io/ScrollMagic */
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ScrollMagic=t()}(this,function(){"use strict";var e=function(){};e.version="2.0.2",e.Controller=function(n){var i,o,s="ScrollMagic.Controller",a={f:"FORWARD",r:"REVERSE",p:"PAUSED"},l=t.defaults,c=this,u=r.extend({},l,n),f=[],d=!1,g=0,h=a.p,p=!0,v=0,m=!0,w=function(){for(var e in u)l.hasOwnProperty(e)||delete u[e];if(u.container=r.get.elements(u.container)[0],!u.container)throw s+" init failed.";p=u.container===window||u.container===document.body||!document.body.contains(u.container),p&&(u.container=window),v=u.vertical?r.get.height(u.container):r.get.width(u.container),u.container.addEventListener("resize",x),u.container.addEventListener("scroll",x),u.refreshInterval=parseInt(u.refreshInterval)||l.refreshInterval,y()},y=function(){u.refreshInterval>0&&(o=window.setTimeout(z,u.refreshInterval))},E=function(){return u.vertical?r.get.scrollTop(u.container):r.get.scrollLeft(u.container)},S=function(e){u.vertical?p?window.scrollTo(r.get.scrollLeft(),e):u.container.scrollTop=e:p?window.scrollTo(e,r.get.scrollTop()):u.container.scrollLeft=e},b=function(){if(m&&d){g=c.scrollPos();var e=r.type.Array(d)?d:f.slice(0);h===a.r&&e.reverse(),e.forEach(function(e){e.update(!0)}),0===e.length&&u.loglevel>=3,d=!1}},F=function(){i=r.rAF(b)},x=function(e){if("resize"==e.type)v=u.vertical?r.get.height(u.container):r.get.width(u.container),h=a.p;else{var t=g;g=c.scrollPos();var n=g-t;0!==n&&(h=n>0?a.f:a.r)}d||(d=!0,F())},z=function(){if(!p&&v!=(u.vertical?r.get.height(u.container):r.get.width(u.container))){var e;try{e=new Event("resize",{bubbles:!1,cancelable:!1})}catch(t){e=document.createEvent("Event"),e.initEvent("resize",!1,!1)}u.container.dispatchEvent(e)}f.forEach(function(e){e.refresh()}),y()};this._options=u;var T=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};return this.addScene=function(t){if(r.type.Array(t))t.forEach(function(e){c.addScene(e)});else if(t instanceof e.Scene)if(t.controller()!==c)t.addTo(c);else if(f.indexOf(t)<0){f.push(t),f=T(f),t.on("shift.controller_sort",function(){f=T(f)});for(var n in u.globalSceneOptions)t[n]&&t[n].call(t,u.globalSceneOptions[n])}return c},this.removeScene=function(e){if(r.type.Array(e))e.forEach(function(e){c.removeScene(e)});else{var t=f.indexOf(e);t>-1&&(e.off("shift.controller_sort"),f.splice(t,1),e.remove())}return c},this.updateScene=function(t,n){return r.type.Array(t)?t.forEach(function(e){c.updateScene(e,n)}):n?t.update(!0):d!==!0&&t instanceof e.Scene&&(d=d||[],-1==d.indexOf(t)&&d.push(t),d=T(d),F()),c},this.update=function(e){return x({type:"resize"}),e&&b(),c},this.scrollTo=function(t){if(r.type.Number(t))S.call(u.container,t);else if(t instanceof e.Scene)t.controller()===c?c.scrollTo(t.scrollOffset()):log(2,"scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.",t);else if(r.type.Function(t))S=t;else{var n=r.get.elements(t)[0];if(n){var i=u.vertical?"top":"left",o=r.get.offset(u.container),s=r.get.offset(n);p||(o[i]-=c.scrollPos()),c.scrollTo(s[i]-o[i])}else log(2,"scrollTo(): The supplied argument is invalid. Scroll cancelled.",t)}return c},this.scrollPos=function(e){return arguments.length?(r.type.Function(e)&&(E=e),c):E.call(c)},this.info=function(e){var t={size:v,vertical:u.vertical,scrollPos:g,scrollDirection:h,container:u.container,isDocument:p};return arguments.length?void 0!==t[e]?t[e]:void 0:t},this.loglevel=function(e){return arguments.length?(u.loglevel!=e&&(u.loglevel=e),c):u.loglevel},this.enabled=function(e){return arguments.length?(m!=e&&(m=!!e,c.updateScene(f,!0)),c):m},this.destroy=function(e){window.clearTimeout(o);for(var t=f.length;t--;)f[t].destroy(e);return u.container.removeEventListener("resize",x),u.container.removeEventListener("scroll",x),r.cAF(i),null},w(),c};var t={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};e.Controller.addOption=function(e,n){t.defaults[e]=n},e.Controller.extend=function(t){var n=this;e.Controller=function(){return n.apply(this,arguments),this.$super=r.extend({},this),t.apply(this,arguments)||this},r.extend(e.Controller,n),e.Controller.prototype=n.prototype,e.Controller.prototype.constructor=e.Controller},e.Scene=function(t){var i,o,s="data-scrollmagic-pin-spacer",a=n.defaults,l=this,c=r.extend({},a,t),u="BEFORE",f=0,d={start:0,end:0},g=0,h=!0,p=function(){for(var e in c)a.hasOwnProperty(e)||delete c[e];for(var t in a)F(t);S(),l.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?w():"reverse"===e.what&&l.update())}).on("shift.internal",function(){v(),l.update()})};this.addTo=function(t){return t instanceof e.Controller&&o!=t&&(o&&o.removeScene(l),o=t,S(),m(!0),w(!0),v(),o.info("container").addEventListener("resize",y),t.addScene(l),l.trigger("add",{controller:o}),l.update()),l},this.enabled=function(e){return arguments.length?(h!=e&&(h=!!e,l.update(!0)),l):h},this.remove=function(){if(o){o.info("container").removeEventListener("resize",y);var e=o;o=void 0,e.removeScene(l),l.trigger("remove")}return l},this.destroy=function(e){return l.trigger("destroy",{reset:e}),l.remove(),l.off("*.*"),null},this.update=function(e){if(o)if(e)if(o.enabled()&&h){var t,n=o.info("scrollPos");t=c.duration>0?(n-d.start)/(d.end-d.start):n>=d.start?1:0,l.trigger("update",{startPos:d.start,endPos:d.end,scrollPos:n}),l.progress(t)}else z&&"DURING"===u&&R(!0);else o.updateScene(l,!1);return l},this.refresh=function(){return m(),w(),l},this.progress=function(e){if(arguments.length){var t=!1,n=u,r=o?o.info("scrollDirection"):"PAUSED",i=c.reverse||e>=f;if(0===c.duration?(t=f!=e,f=1>e&&i?0:1,u=0===f?"BEFORE":"DURING"):0>=e&&"BEFORE"!==u&&i?(f=0,u="BEFORE",t=!0):e>0&&1>e&&i?(f=e,u="DURING",t=!0):e>=1&&"AFTER"!==u?(f=1,u="AFTER",t=!0):"DURING"!==u||i||R(),t){var s={progress:f,state:u,scrollDirection:r},a=u!=n,d=function(e){l.trigger(e,s)};a&&"DURING"!==n&&(d("enter"),d("BEFORE"===n?"start":"end")),d("progress"),a&&"DURING"!==u&&(d("BEFORE"===u?"start":"end"),d("leave"))}return l}return f};var v=function(){d={start:g+c.offset},o&&c.triggerElement&&(d.start-=o.info("size")*c.triggerHook),d.end=d.start+c.duration},m=function(e){if(i){var t="duration";b(t,i.call(l))&&!e&&(l.trigger("change",{what:t,newval:c[t]}),l.trigger("shift",{reason:t}))}},w=function(e){var t=0,n=c.triggerElement;if(o&&n){for(var i=o.info(),a=r.get.offset(i.container),u=i.vertical?"top":"left";n.parentNode.hasAttribute(s);)n=n.parentNode;var f=r.get.offset(n);i.isDocument||(a[u]-=o.scrollPos()),t=f[u]-a[u]}var d=t!=g;g=t,d&&!e&&l.trigger("shift",{reason:"triggerElementPosition"})},y=function(){c.triggerHook>0&&l.trigger("shift",{reason:"containerResize"})},E=r.extend(n.validate,{duration:function(e){if(r.type.String(e)&&e.match(/^(\.|\d)*\d+%$/)){var t=parseFloat(e)/100;e=function(){return o?o.info("size")*t:0}}if(r.type.Function(e)){i=e;try{e=parseFloat(i())}catch(n){e=-1}}if(e=parseFloat(e),!r.type.Number(e)||0>e)throw i?(i=void 0,0):0;return e}}),S=function(e){e=arguments.length?[e]:Object.keys(E),e.forEach(function(e){var t;if(E[e])try{t=E[e](c[e])}catch(n){t=a[e]}finally{c[e]=t}})},b=function(e,t){var n=!1,r=c[e];return c[e]!=t&&(c[e]=t,S(e),n=r!=c[e]),n},F=function(e){l[e]||(l[e]=function(t){return arguments.length?("duration"===e&&(i=void 0),b(e,t)&&(l.trigger("change",{what:e,newval:c[e]}),n.shifts.indexOf(e)>-1&&l.trigger("shift",{reason:e})),l):c[e]})};this.controller=function(){return o},this.state=function(){return u},this.scrollOffset=function(){return d.start},this.triggerPosition=function(){var e=c.offset;return o&&(e+=c.triggerElement?g:o.info("size")*l.triggerHook()),e};var x={};this.on=function(e,t){return r.type.Function(t)&&(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],i=n[1];"*"!=r&&(x[r]||(x[r]=[]),x[r].push({namespace:i||"",callback:t}))})),l},this.off=function(e,t){return e?(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],i=n[1]||"",o="*"===r?Object.keys(x):[r];o.forEach(function(e){for(var n=x[e]||[],r=n.length;r--;){var o=n[r];!o||i!==o.namespace&&"*"!==i||t&&t!=o.callback||n.splice(r,1)}n.length||delete x[e]})}),l):l},this.trigger=function(t,n){if(t){var r=t.trim().split("."),i=r[0],o=r[1],s=x[i];s&&s.forEach(function(t){o&&o!==t.namespace||t.callback.call(l,new e.Event(i,t.namespace,l,n))})}return l};var z,T;l.on("shift.internal",function(e){var t="duration"===e.reason;("AFTER"===u&&t||"DURING"===u&&0===c.duration)&&R(),t&&C()}).on("progress.internal",function(){R()}).on("add.internal",function(){C()}).on("destroy.internal",function(e){l.removePin(e.reset)});var R=function(e){if(z&&o){var t=o.info();if(e||"DURING"!==u){var n={position:T.inFlow?"relative":"absolute",top:0,left:0},i=r.css(z,"position")!=n.position;T.pushFollowers?c.duration>0&&("AFTER"===u&&0===parseFloat(r.css(T.spacer,"padding-top"))?i=!0:"BEFORE"===u&&0===parseFloat(r.css(T.spacer,"padding-bottom"))&&(i=!0)):n[t.vertical?"top":"left"]=c.duration*f,r.css(z,n),i&&C()}else{"fixed"!=r.css(z,"position")&&(r.css(z,{position:"fixed"}),C());var s=r.get.offset(T.spacer,!0),a=c.reverse||0===c.duration?t.scrollPos-d.start:Math.round(f*c.duration*10)/10;s[t.vertical?"top":"left"]+=a,r.css(z,{top:s.top,left:s.left})}}},C=function(){if(z&&o&&T.inFlow){var e="DURING"===u,t=o.info("vertical"),n=T.spacer.children[0],i=r.isMarginCollapseType(r.css(T.spacer,"display")),s={};T.relSize.width||T.relSize.autoFullWidth?e?r.css(z,{width:r.get.width(T.spacer)}):r.css(z,{width:"100%"}):(s["min-width"]=r.get.width(t?z:n,!0,!0),s.width=e?s["min-width"]:"auto"),T.relSize.height?e?r.css(z,{height:r.get.height(T.spacer)-c.duration}):r.css(z,{height:"100%"}):(s["min-height"]=r.get.height(t?n:z,!0,!i),s.height=e?s["min-height"]:"auto"),T.pushFollowers&&(s["padding"+(t?"Top":"Left")]=c.duration*f,s["padding"+(t?"Bottom":"Right")]=c.duration*(1-f)),r.css(T.spacer,s)}},L=function(){o&&z&&"DURING"===u&&!o.info("isDocument")&&R()},D=function(){o&&z&&"DURING"===u&&((T.relSize.width||T.relSize.autoFullWidth)&&r.get.width(window)!=r.get.width(T.spacer.parentNode)||T.relSize.height&&r.get.height(window)!=r.get.height(T.spacer.parentNode))&&C()},N=function(e){o&&z&&"DURING"===u&&!o.info("isDocument")&&(e.preventDefault(),o.scrollTo(o.info("scrollPos")-(e[o.info("vertical")?"wheelDeltaY":"wheelDeltaX"]/3||30*-e.detail)))};this.setPin=function(e,t){var n={pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"};if(t=r.extend({},n,t),e=r.get.elements(e)[0],!e)return l;if("fixed"===r.css(e,"position"))return l;if(z){if(z===e)return l;l.removePin()}z=e;var i=z.parentNode.style.display,o=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];z.parentNode.style.display="none";var a="absolute"!=r.css(z,"position"),c=r.css(z,o.concat(["display"])),u=r.css(z,["width","height"]);z.parentNode.style.display=i,!a&&t.pushFollowers&&(t.pushFollowers=!1);var f=z.parentNode.insertBefore(document.createElement("div"),z),d=r.extend(c,{position:a?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(a||r.extend(d,r.css(z,["width","height"])),r.css(f,d),f.setAttribute(s,""),r.addClass(f,t.spacerClass),T={spacer:f,relSize:{width:"%"===u.width.slice(-1),height:"%"===u.height.slice(-1),autoFullWidth:"auto"===u.width&&a&&r.isMarginCollapseType(c.display)},pushFollowers:t.pushFollowers,inFlow:a},!z.___origStyle){z.___origStyle={};var g=z.style,h=o.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]);h.forEach(function(e){z.___origStyle[e]=g[e]||""})}return T.relSize.width&&r.css(f,{width:u.width}),T.relSize.height&&r.css(f,{height:u.height}),f.appendChild(z),r.css(z,{position:a?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(T.relSize.width||T.relSize.autoFullWidth)&&r.css(z,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",L),window.addEventListener("resize",L),window.addEventListener("resize",D),z.addEventListener("mousewheel",N),z.addEventListener("DOMMouseScroll",N),R(),l},this.removePin=function(e){if(z){if("DURING"===u&&R(!0),e||!o){var t=T.spacer.children[0];if(t.hasAttribute(s)){var n=T.spacer.style,i=["margin","marginLeft","marginRight","marginTop","marginBottom"];margins={},i.forEach(function(e){margins[e]=n[e]||""}),r.css(t,margins)}T.spacer.parentNode.insertBefore(t,T.spacer),T.spacer.parentNode.removeChild(T.spacer),z.parentNode.hasAttribute(s)||(r.css(z,z.___origStyle),delete z.___origStyle)}window.removeEventListener("scroll",L),window.removeEventListener("resize",L),window.removeEventListener("resize",D),z.removeEventListener("mousewheel",N),z.removeEventListener("DOMMouseScroll",N),z=void 0}return l};var O,A=[];return l.on("destroy.internal",function(e){l.removeClassToggle(e.reset)}),this.setClassToggle=function(e,t){var n=r.get.elements(e);return 0!==n.length&&r.type.String(t)?(A.length>0&&l.removeClassToggle(),O=t,A=n,l.on("enter.internal_class leave.internal_class",function(e){var t="enter"===e.type?r.addClass:r.removeClass;A.forEach(function(e){t(e,O)})}),l):l},this.removeClassToggle=function(e){return e&&A.forEach(function(e){r.removeClass(e,O)}),l.off("start.internal_class end.internal_class"),O=void 0,A=[],l},p(),l};var n={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!r.type.Number(e))throw 0;return e},triggerElement:function(e){if(e=e||void 0){var t=r.get.elements(e)[0];if(!t)throw 0;e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(r.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw 0;e=t[e]}return e},reverse:function(e){return!!e}},shifts:["duration","offset","triggerHook"]};e.Scene.addOption=function(e,t,r,i){e in n.defaults||(n.defaults[e]=t,n.validate[e]=r,i&&n.shifts.push(e))},e.Scene.extend=function(t){var n=this;e.Scene=function(){return n.apply(this,arguments),this.$super=r.extend({},this),t.apply(this,arguments)||this},r.extend(e.Scene,n),e.Scene.prototype=n.prototype,e.Scene.prototype.constructor=e.Scene},e.Event=function(e,t,n,r){r=r||{};for(var i in r)this[i]=r[i];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var r=e._util=function(e){var t,n={},r=function(e){return parseFloat(e)||0},i=function(t){return t.currentStyle?t.currentStyle:e.getComputedStyle(t)},o=function(t,n,o,s){if(n=n===document?e:n,n===e)s=!1;else if(!f.DomElement(n))return 0;t=t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();var a=(o?n["offset"+t]||n["outer"+t]:n["client"+t]||n["inner"+t])||0;if(o&&s){var l=i(n);a+="Height"===t?r(l.marginTop)+r(l.marginBottom):r(l.marginLeft)+r(l.marginRight)}return a},s=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};n.extend=function(e){for(e=e||{},t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&(e[n]=arguments[t][n]);return e},n.isMarginCollapseType=function(e){return["block","flex","list-item","table","-webkit-box"].indexOf(e)>-1};var a=0,l=["ms","moz","webkit","o"],c=e.requestAnimationFrame,u=e.cancelAnimationFrame;for(t=0;!c&&t<l.length;++t)c=e[l[t]+"RequestAnimationFrame"],u=e[l[t]+"CancelAnimationFrame"]||e[l[t]+"CancelRequestAnimationFrame"];c||(c=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-a)),i=e.setTimeout(function(){t(n+r)},r);return a=n+r,i}),u||(u=function(t){e.clearTimeout(t)}),n.rAF=c.bind(e),n.cAF=u.bind(e);var f=n.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};f.String=function(e){return"string"===f(e)},f.Function=function(e){return"function"===f(e)},f.Array=function(e){return Array.isArray(e)},f.Number=function(e){return!f.Array(e)&&e-parseFloat(e)+1>=0},f.DomElement=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var d=n.get={};return d.elements=function(t){var n=[];if(f.String(t))try{t=document.querySelectorAll(t)}catch(r){return n}if("nodelist"===f(t)||f.Array(t))for(var i=0,o=n.length=t.length;o>i;i++){var s=t[i];n[i]=f.DomElement(s)?s:d.elements(s)}else(f.DomElement(t)||t===document||t===e)&&(n=[t]);return n},d.scrollTop=function(t){return t&&"number"==typeof t.scrollTop?t.scrollTop:e.pageYOffset||0},d.scrollLeft=function(t){return t&&"number"==typeof t.scrollLeft?t.scrollLeft:e.pageXOffset||0},d.width=function(e,t,n){return o("width",e,t,n)},d.height=function(e,t,n){return o("height",e,t,n)},d.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=d.scrollTop(),n.left+=d.scrollLeft())}return n},n.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},n.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},n.css=function(e,t){if(f.String(t))return i(e)[s(t)];if(f.Array(t)){var n={},r=i(e);return t.forEach(function(e){n[e]=r[s(e)]}),n}for(var o in t){var a=t[o];a==parseFloat(a)&&(a+="px"),e.style[s(o)]=a}},n}(window||{});return e});;
/**
 * uisearch.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {

	'use strict';

//	EventListener | @jon_neal | //github.com/jonathantneal/EventListener
	!window.addEventListener && window.Element && (function () {
	   function addToPrototype(name, method) {
		  Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
	   }

	   var registry = [];

	   addToPrototype("addEventListener", function (type, listener) {
		  var target = this;

		  registry.unshift({
			 __listener: function (event) {
				event.currentTarget = target;
				event.pageX = event.clientX + document.documentElement.scrollLeft;
				event.pageY = event.clientY + document.documentElement.scrollTop;
				event.preventDefault = function () { event.returnValue = false };
				event.relatedTarget = event.fromElement || null;
				event.stopPropagation = function () { event.cancelBubble = true };
				event.relatedTarget = event.fromElement || null;
				event.target = event.srcElement || target;
				event.timeStamp = +new Date;

				listener.call(target, event);
			 },
			 listener: listener,
			 target: target,
			 type: type
		  });

		  this.attachEvent("on" + type, registry[0].__listener);
	   });

	   addToPrototype("removeEventListener", function (type, listener) {
		  for (var index = 0, length = registry.length; index < length; ++index) {
			 if (registry[index].target == this && registry[index].type == type && registry[index].listener == listener) {
				return this.detachEvent("on" + type, registry.splice(index, 1)[0].__listener);
			 }
		  }
	   });

	   addToPrototype("dispatchEvent", function (eventObject) {
		  try {
			 return this.fireEvent("on" + eventObject.type, eventObject);
		  } catch (error) {
			 for (var index = 0, length = registry.length; index < length; ++index) {
				if (registry[index].target == this && registry[index].type == eventObject.type) {
				   registry[index].call(this, eventObject);
				}
			 }
		  }
	   });
	})();

/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */


// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}


	// http://stackoverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	// http://www.jonathantneal.com/blog/polyfills-and-prototypes/
	!String.prototype.trim && (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	});

	function UISearch( el, options ) {
		this.el = el;
		this.inputEl = el.querySelector( 'form input.form-text' );
		this._initEvents();
	}

	UISearch.prototype = {
		_initEvents : function() {
			var self = this,
				initSearchFn = function( ev ) {
					ev.stopPropagation();
					// trim its value
					self.inputEl.value = self.inputEl.value.trim();

					if( !classie.has( self.el, 'sb-search-open' ) ) { // open it
						ev.preventDefault();
						self.open();
					}
					else if( classie.has( self.el, 'sb-search-open' ) && /^\s*$/.test( self.inputEl.value ) ) { // close it
						ev.preventDefault();
						self.close();
					}
				}
			//console.log(this.inputEl);
			this.el.addEventListener( 'click', initSearchFn );
			this.el.addEventListener( 'touchstart', initSearchFn );
			this.inputEl.addEventListener( 'click', function( ev ) { ev.stopPropagation(); });
			this.inputEl.addEventListener( 'touchstart', function( ev ) { ev.stopPropagation(); } );
		},
		open : function() {
			var self = this;
			classie.add( this.el, 'sb-search-open' );
			// focus the input
			if( !mobilecheck() ) {
				this.inputEl.focus();
			}
			// close the search input if body is clicked
			var bodyFn = function( ev ) {
				self.close();
				this.removeEventListener( 'click', bodyFn );
				this.removeEventListener( 'touchstart', bodyFn );
			};
			document.addEventListener( 'click', bodyFn );
			document.addEventListener( 'touchstart', bodyFn );
		},
		close : function() {
			this.inputEl.blur();
			classie.remove( this.el, 'sb-search-open' );
		}
	}

	// add to global namespace
	window.UISearch = UISearch;

} )( window );
;
(function ($) {
  if (!Drupal.si_baseline) {
    Drupal.si_baseline = {};
  }
  // var imageProcessed = false;
  // var nVer = navigator.appVersion;
  // var nAgt = navigator.userAgent;
  // var browserName  = navigator.appName;
  // var fullVersion  = ''+parseFloat(navigator.appVersion);
  // var majorVersion = parseInt(navigator.appVersion,10);
  // console.log(nVer);
  // console.log(nAgt);
  //alert(nVer +' ' + nAgt + ' ' +browserName + fullVersion);
  luminateExtend.init({
    apiKey: "BFE9250F55E7096A8D12C01057",
    path: {
      nonsecure: "http://go.si.edu/",
      secure: "https://support.si.edu/site/",
    },
  });

  Drupal.behaviors.siBaseline = {
    attach: function (context, settings) {
      var siBaseline,
        logo = $(".site-logo img", context),
        controller = new ScrollMagic.Controller();

      siBaseline = {
        pageInit: function () {
          // const iframe = context.querySelector("#myvisit-iframe");
          //set intrinsic height and width of image
          logo.once("logoImage", function () {
            if (
              $("html").hasClass("no-svgasimg") &&
              typeof settings["siTheme"].logo_path !== "undefined" &&
              typeof logo !== "undefined"
            ) {
              logo.attr("src", settings["siTheme"].logo_path);
            }
          });
          $("a", context).click(function (e) {
            if ($(this).hasClass("prevent-link")) {
              e.preventDefault();
              e.stopPropagation();
            }
          });

          // if (iframe) {
          //  iFrameResize({ log: true }, iframe);
          //   // iframe.iFrameResize({log: true});
          // }

          $(".root-facet-list .category", context).each(function () {
            var $this = $(this);
            $this.click(function () {
              $this.toggleClass("expand");
            });
          });
          if (
            $(
              ".l-header #block-edan-searchtab-edan-searchtab-block-search-form",
              context
            ).length != 0
          ) {
            new UISearch(
              document.getElementById(
                "block-edan-searchtab-edan-searchtab-block-search-form"
              )
            );
          }
          if ($(".page--colorbox .edan-content", context).length != 0) {
            $(".page--colorbox .edan-content a", context).each(function () {
              $(this).attr("target", "_blank");
            });
          }
          if ($(".slick__arrow").length) {
            $(".slick__arrow").parents(".slick").addClass("has-arrows");
          }
          $(".edan-search-form .form-item-edan-q", context).each(function () {
            const field = $(this).children("input"),
              searchKeys = field.val();
            if (searchKeys.length > 0) {
              field
                .parents("form")
                .removeClass("search-executed")
                .addClass("search-executed");
            }
          });
          $(".edan-search-form #edit-reset").click(function () {
            $(this).parents("form").removeClass("search-executed");
          });

          $(".edan-search-form .form-item-edan-q", context).each(function () {
            const field = $(this).children("input"),
              searchKeys = field.val();
            if (searchKeys.length > 0) {
              field
                .parents("form")
                .removeClass("search-executed")
                .addClass("search-executed");
            }
          });

          if ($(".si-marquee-wrapper", context).length != 0) {
            $(".si-marquee-wrapper").marquee({
              //speed in milliseconds of the marquee
              duration: 12000,
              //gap in pixels between the tickers
              gap: 32,
              //time in milliseconds before the marquee will start animating
              delayBeforeStart: 0,
              //'left' or 'right'
              direction: "left",
              // pauseOnHover: true,
              //true or false - should the marquee be duplicated to show an effect of continues flow
              duplicated: true,
            });
          }
          if ($(".tooltip-link", context).length != 0) {
            $(".tooltip-link", context).click(function (e) {
              e.preventDefault();
              e.stopPropagation();
            });
          }

          $("#back-to-top", context).click(function (e) {
            e.preventDefault();
            //var pos = $('header', context).position();
            $("html,body", context).animate({ scrollTop: 0 });
          });

          this.shareIcons();
          this.newsletter();
          this.sideNav();
          this.pageControls();
          this.expandText();
        },
        expandText: function () {
          if ($(".expand-text", context).length !== 0) {
            var textWrapper = $(".expand-text", context),
              textContent = $(".expand-text .group-main", context),
              expandButton = $(".expand-text .btn.expand", context);
            // console.log(textContent.height());
            if (textContent.height() > 525) {
              textWrapper.addClass("minimize");
            }

            expandButton.click(function () {
              textWrapper.removeClass("minimize");
              textWrapper.addClass("fullHeight");
              expandButton.remove();
            });
          }
        },
        pageControls: function () {
          var $offset = $(window).height();
          if ($("body.page--colorbox", context).length === 0) {
            new ScrollMagic.Scene({
              offset: $offset - 100,
              triggerHook: "onEnter",
              reverse: true,
            })
              .setClassToggle("body", "show-page-nav")
              .addTo(controller);
            if ($("footer").length != 0) {
              var footerPos = $("footer").position();
              footerPos = footerPos.top;
              new ScrollMagic.Scene({
                offset: footerPos - $offset - $("footer").height(),
                //triggerElement: '.footer',
                reverse: true,
                triggerHook: "onEnter",
              })
                .setClassToggle("body", "show-page-nav-alt")
                .addTo(controller);
            }
          }
        },
        shareIcons: function () {
          // if ($('.share-icon', context).length != 0) {
          $(".share-icon", context).click(function (e) {
            var $this = $(this);
            $this.toggleClass("active");
            e.preventDefault();
            e.stopPropagation();
            $this.attr("aria-expanded") === "false"
              ? $this.attr("aria-expanded", true)
              : $this.attr("aria-expanded", false);
            $this.siblings(".social-media").toggleClass("active");
            $this.siblings(".social-media").hasClass("active")
              ? $this.siblings(".social-media").css("visibility", "visible")
              : $this.siblings(".social-media").css("visibility", "hidden");
          });
          // }
        },
        sideNav: function () {
          if (
            $(".wrapper--superfish .menu-block-wrapper", context).length != 0
          ) {
            // Apply Superfish.
            $(
              ".wrapper--superfish .menu-block-wrapper > ul.menu",
              context
            ).once("superfish", function () {
              var list = $(this),
                options = Drupal.settings.superfish[1];
              // menuParent = $('#superfish-1 > .active-trail', context).clone();
              // if (menuParent.hasClass('menuparent')) {
              //   menuParent.children('ul').remove();
              // }
              // list.attr('id', 'side-menu').addClass('sf-menu').prepend(menuParent);
              list.attr("id", "side-menu").addClass("sf-menu");
              // Check if we are to apply the Supersubs plug-in to it.
              if (options.plugins || false) {
                if (options.plugins.supersubs || false) {
                  list.supersubs(options.plugins.supersubs);
                }
              }

              // Apply Superfish to the list.
              list.superfish({
                autoArrows: false,
                dropShadows: false,
                speed: 100,
              });

              // Check if we are to apply any other plug-in to it.
              if (options.plugins || false) {
                if (options.plugins.touchscreen || false) {
                  list.sftouchscreen(options.plugins.touchscreen);
                }
                if (options.plugins.smallscreen || false) {
                  options.plugins.smallscreen.title = "Section Menu";
                  list.sfsmallscreen(options.plugins.smallscreen);
                }
                if (options.plugins.automaticwidth || false) {
                  list.sfautomaticwidth();
                }
                if (options.plugins.supposition || false) {
                  list.supposition();
                }
                if (options.plugins.bgiframe || false) {
                  list.find("ul").bgIframe({ opacity: false });
                }
              }
            });
          }
        },
        newsletter: function () {
          $("#cons_email", context).focus(function () {
            $(this).attr("placeholder", "");
          });
          $("#si-email-signup-form", context).submit(function (event) {
            // cancels the form submission
            event.preventDefault();

            //do very rough check of submitted email address
            var emailString = $("#cons_email", context).val(),
              filter =
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if ($("input#denySubmit").val().length != 0) {
              return false;
            } else {
              if (filter.test(emailString)) {
                //Now submit the form

                var survey_submit_callback = {
                  error: function (data) {
                    $("#msg-container", context)
                      .fadeOut()
                      .html(data.errorResponse.message)
                      .addClass("error")
                      .fadeIn();
                    return false;
                  },
                  success: function (data) {
                    // console.log(data);
                    $("#cons_email", context).attr("aria-invalid", false);
                    $(".form-details", context).fadeOut();

                    $("#msg-container", context)
                      .fadeOut()
                      .removeClass("error")
                      .html("Thanks for signing up!")
                      .fadeIn();
                    $("#signup-footer-container", context).fadeOut();
                  },
                };

                luminateExtend.api.request({
                  api: "survey",
                  callback: survey_submit_callback,
                  requiresAuth: true,
                  data:
                    "method=submitSurvey&v=1.0&center_id=1042&survey_id=7760&cons_email=" +
                    emailString +
                    "&cons_email_opt_in=true",
                });
              } else {
                $("#msg-container", context)
                  .fadeOut()
                  .html("Please enter a valid email")
                  .addClass("error")
                  .fadeIn();
                // Set aria-invalid to true and re-focus the field.
                $("#cons_email", context)
                  .attr("aria-invalid", true)
                  .attr("aria-describedby", "msg-container")
                  .focus();

                return false;
              }
            }
          });
        },
      };
      siBaseline.pageInit();
    },
  };
})(jQuery);
;
