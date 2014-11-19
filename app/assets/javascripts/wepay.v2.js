var WePay=WePay||{};WePay.call_queue=[];WePay.OAuth2=WePay.OAuth2||{};WePay.OAuth2.authorize=function(params){if(typeof params=='undefined'||typeof params.keyCode!='undefined'||typeof params.currentTarget!='undefined'){params=WePay.oauth2_params;}
var check=WePay.check_params(params,WePay.OAuth2.expected_params);if(check.error){if(typeof params.callback=='function'){return params.callback(check);}else{throw check.error_description;}}
var scope=params.scope.join(','),redirect_uri=WePay.domain+'/api/oauth2_complete/';if(params['redirect_uri']){redirect_uri=params['redirect_uri'];}
var url=WePay.domain+'/v2/oauth2/authorize?client_id='+params.client_id+'&scope='+scope+'&redirect_uri='+redirect_uri;if(typeof params.user_name=='string'){url+='&user_name='+params.user_name;}
if(typeof params.user_email=='string'){url+='&user_email='+params.user_email;}
if(typeof params.state=='string'||typeof params.state=='number'){url+='&state='+params.state;}
if(typeof params.user_country=='string'){url+='&user_country='+params.user_country;}
if(WePay.OAuth2.ie_conditional_redirect()){return window.location.replace(url);}
url+='&popup=1';var dims='height=625,width=800';if(typeof params.top=='number'){dims+=',top='+params.top;}
if(typeof params.left=="number"){dims+=',left='+params.left;}
if(WePay.oauth2_popup&&typeof WePay.oauth2_popup=='object'&&!WePay.oauth2_popup.closed&&WePay.oauth2_popup_url&&WePay.oauth2_popup_url==encodeURI(url)){return WePay.oauth2_popup.focus();}
WePay.oauth2_popup=window.open(url,'wepay_oauth2_popup',dims);WePay.oauth2_popup_url=encodeURI(url);if(!WePay.oauth2_popup||WePay.oauth2_popup.closed||typeof WePay.oauth2_popup.closed=='undefined'){top.location.replace(url);}
if(typeof params.callback=='function'){WePay.oauth2_callback=params.callback;WePay.listenOnce('oauth2_complete',function(data){if(data.hasOwnProperty('redirect_uri')){window.location.replace(data.redirect_uri);WePay.oauth2_popup.close();}
WePay.oauth2_callback(data);});}}
WePay.OAuth2.ie_conditional_redirect=function(){var hack=document.createElement('div');hack.innerHTML='<!'+'--[if lt IE 10]>x<![endif]-->';return hack.innerHTML=='x';}
WePay.OAuth2.ie10_conditional_redirect=function(){var ie10=Function('/*@cc_on return document.documentMode===10@*/')();if(ie10){document.documentElement.className+=' ie10';return true;}
return false;}
WePay.OAuth2.button_init=function(element,params){if(!WePay.css){if(WePay.domainStatic){WePay.setup_button_css();}else{if(document.addEventListener){document.addEventListener("DOMContentLoaded",WePay.setup_button_css,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",WePay.setup_button_css,false);}}}
WePay.OAuth2_button=element;var button_class=WePay.OAuth2_button.getAttribute('class');button_class=button_class?button_class+' wepay-widget-button wepay-green':'wepay-widget-button wepay-green';WePay.OAuth2_button.setAttribute('class',button_class);WePay.oauth2_params=params;if(window.addEventListener){WePay.OAuth2_button.addEventListener("click",WePay.OAuth2.authorize,false);}else if(window.attachEvent){WePay.OAuth2_button.attachEvent("onclick",WePay.OAuth2.authorize,false);}}
WePay.OAuth2.expected_params={'client_id':true,'redirect_uri':true,'scope':true,'state':false,'user_name':false,'user_email':false,'user_country':false,'callback':true,'top':false,'left':false}
WePay.setup_messenger=function(){if(!WePay.messenger&&WePay.endpoint){WePay.messenger=document.createElement('iframe');WePay.messenger.loaded=false;WePay.messenger.id="WePay-Messenger";WePay.messenger.src=WePay.endpoint+"/api/messenger";WePay.messenger.setAttribute("style","display:none; width:1px; height:1px;");document.body.appendChild(WePay.messenger);}}
WePay.set_endpoint=function(domain){switch(domain){case"stage":WePay.endpoint="https://stage.wepayapi.com";WePay.domain="https://stage.wepay.com";WePay.domainStatic='https://stage.wepay.com';break;case"static":case"production":WePay.endpoint="https://wepayapi.com";WePay.domain="https://www.wepay.com";WePay.domainStatic='https://static.wepay.com';break;case"vm":WePay.endpoint="http://vm.wepay.com";WePay.domain="http://vm.wepay.com";WePay.domainStatic='http://vm.wepay.com';break;default:return{"error":"invalid_request","error_description":"that is an invalid domain: please use stage or production"};}
if(!WePay.messenger){WePay.setup_messenger();}}
WePay.find_endpoint=function(){var domain=WePay.this_script.getAttribute('src').replace('http://','').replace('https://','').split(/[/?#]/)[0].replace('.wepay.com','').replace('www','production');if(typeof WePay.endpoint=="undefined"){WePay.set_endpoint(domain);}}
WePay.get_script=function(){var scripts=document.getElementsByTagName('script');WePay.this_script=scripts[scripts.length-1];}
WePay.get_script();if(document.addEventListener){document.addEventListener("DOMContentLoaded",WePay.find_endpoint,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",WePay.find_endpoint,false);}
WePay.setup_button_css=function(){var widget_css='/css/widgets.v2.css';if(typeof WePay.minify=='undefined')
widget_css='/min'+widget_css;WePay.css=document.createElement("link");WePay.css.setAttribute('type','text/css');WePay.css.setAttribute('media','screen');WePay.css.setAttribute('rel','stylesheet');WePay.css.setAttribute('href',WePay.domainStatic+widget_css);document.getElementsByTagName('head')[0].appendChild(WePay.css);}
WePay.check_params=function(params,expected_params){for(required in expected_params){if(typeof expected_params[required]=="object"){if(typeof params[required]=="object"){var val=WePay.check_params(params[required],expected_params[required]);if(val!==true){return val;}}else{return{error:"invalid_request",error_description:"The "+required+" parameter expects an object: "+(typeof params[required])+" provided."}}}else if(typeof expected_params[required]=="boolean"){if(expected_params[required]&&!params[required]){return{error:"invalid_request",error_description:"The "+required+" parameter is required."}}}}
for(param in params){if(typeof expected_params[param]=="undefined"){return{error:"invalid_request",error_description:"The "+param+" parameter is unexpected."}}}
return true;}
WePay.listen=WePay.listen||function(event_name,response_function){WePay.callback_events=WePay.callback_events||{};WePay.callback_events[event_name]=WePay.callback_events[event_name]||[];WePay.callback_events[event_name].push(response_function);}
WePay.listenOnce=WePay.listenOnce||function(event_name,response_function){WePay.callback_events=WePay.callback_events||{};WePay.callback_events[event_name]=[];WePay.callback_events[event_name].push(response_function);}
WePay.trigger=WePay.trigger||function(event_name,data){var callbacks=WePay.callback_events[event_name];if(callbacks){for(var i=0;i<callbacks.length;i++){var callback=callbacks[i];callback(data);}}}
WePay.receiveMessage=WePay.receiveMessage||function(e){try{var data=WePay.JSON.parse(e.data);}catch(e){}
if(data){WePay.trigger(data.wepay_message_type,data);}};WePay.listen("api_call_response",function(data){var callback=data.callback_function_name;WePay.trigger(callback,data.response);});WePay.listen("messenger_loaded",function(data){WePay.messenger.loaded=true;for(var i=0;i<WePay.call_queue.length;i++){var call=WePay.call_queue[i];WePay.call(call.path,call.parameters,call.callback_name);}
WePay.call_queue=[];});if(!WePay.listening){if(window.addEventListener){window.addEventListener("message",WePay.receiveMessage,false);}else if(window.attachEvent){window.attachEvent("onmessage",WePay.receiveMessage,false);}
WePay.listening=true;}
WePay.call=function(call_path,arguments,callback_function_name){var data={"wepay_message_type":"api_call","wepay_call_path":call_path,"call_parameters":arguments,"callback_function_name":callback_function_name};WePay.messenger.contentWindow.postMessage(WePay.JSON.stringify(data),"*");}
WePay.credit_card=WePay.credit_card||{};WePay.credit_card.expected_params={'client_id':true,'user_name':true,'email':true,'reference_id':false,'cc_number':true,'cvv':true,'expiration_month':true,'expiration_year':true,'address':{'address1':false,'address2':false,'city':false,'state':false,'region':false,'zip':false,'postcode':false,'country':false}}
WePay.credit_card.create=function(params,callback){var check=WePay.check_params(params,WePay.credit_card.expected_params);if(check.error){return check;}
var name='wepay_callback_'+(new Date()).getTime()+"_"+Math.floor(Math.random()*1000);WePay.listen(name,callback);if(WePay.messenger&&WePay.messenger.loaded){WePay.call("/v2/credit_card/create",params,name);}else{WePay.call_queue.push({"path":"/v2/credit_card/create","parameters":params,"callback_name":name});}
return true;}
WePay.validate=function(param,value){switch(param){case"client_id":if(typeof value!="Number"||value%1!=0){return{"error":"invalid_parameter","error_description":"client_id must be a numeric value"};}
break;case"user_name":if(!value.match(/^.+\s+.+$/)){return{"error":"invalid_parameter","error_description":"First and last name required"};}
break;case"email":if(!value.match(/^.+@.+$/)||value.match(/^.+\s+.+$/)){return{"error":"invalid_parameter","error_description":"First and last name required"};}
break;case"cc_number":if(!value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)||!WePay.credit_card.luhn(value)){return{"error":"invalid_parameter","error_description":"Credit card number is invalid"};}
break;case"cvv":if(!value.match(/^\d{3,4}$/)){return{"error":"invalid_parameter","error_description":"CVV is invalid"};}
break;case"expiration_month":if(!value.match(/^\d{1,2}$/)||value>12||value<1){return{"error":"invalid_parameter","error_description":"Expiration month is invalid"};}
break;case"expiration_year":if(!value.match(/^\d{4}$/)){return{"error":"invalid_parameter","error_description":"Expiration year is invalid"};}
if(value<=(new Date()).getFullYear()){return{"error":"invalid_parameter","error_description":"Expiration year must be "+(new Date()).getFullYear()+" or greater"};}
break;}
return{"passed":true,"error":false,"error_description":false};}
WePay.credit_card.luhn=function(value){var checksum=0;for(var i=value.length-1;i>=0;i-=2){checksum+=parseInt(value.charAt(i),10);}
for(var i=value.length-2;i>=0;i-=2){var iVal=parseInt(value.charAt(i),10)*2;checksum+=iVal>=10?iVal-9:iVal;}
return(checksum%10==0);}
if(typeof JSON==='object'&&JSON.stringify){WePay.JSON={};WePay.JSON.stringify=JSON.stringify;WePay.JSON.parse=JSON.parse;}else{WePay.JSON={};WePay.JSON.parse=function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+src+')');}else{throw new SyntaxError('Error parsing JSON, source is not valid.');}}
WePay.JSON.stringify=function(o){if(o===null){return'null';}
var type=typeof o;if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return''+o;}
if(type==='string'){return WePay.JSON.quote_string(o);}
if(type==='object'){if(typeof o.toJSON==='function'){return WePay.JSON.stringify(o.toJSON());}
if(o.constructor===Date){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push(WePay.JSON.stringify(o[i])||'null');}
return'['+ret.join(',')+']';}
var name,val,pairs=[];for(var k in o){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=WePay.JSON.quote_string(k);}else{continue;}
type=typeof o[k];if(type==='function'||type==='undefined'){continue;}
val=WePay.JSON.stringify(o[k]);pairs.push(name+':'+val);}
return'{'+pairs.join(',')+'}';}};WePay.JSON.quote_string=function(string){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};if(string.match(escapeable)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+string+'"';};}