const _0x215a=['__importDefault','assign','../common-lib/dialog','I18n','path','ALL','App','statusCode','info','TLSv1_method','version','./node_modules','encodeParams','query-string','status','default','getLanguage','__esModule','stringify'];(function(_0x211e9b,_0x4133d5){const _0x215a14=function(_0x5cc033){while(--_0x5cc033){_0x211e9b['push'](_0x211e9b['shift']());}};_0x215a14(++_0x4133d5);}(_0x215a,0x126));const _0x5cc0=function(_0x211e9b,_0x4133d5){_0x211e9b=_0x211e9b-0x7e;let _0x215a14=_0x215a[_0x211e9b];return _0x215a14;};const _0x3f5263=_0x5cc0;'use strict';var __importDefault=this&&this[_0x3f5263(0x88)]||function(_0x2560ac){const _0x403882=_0x3f5263;return _0x2560ac&&_0x2560ac[_0x403882(0x86)]?_0x2560ac:{'default':_0x2560ac};};Object['defineProperty'](exports,_0x3f5263(0x86),{'value':!0x0}),exports['postData']=exports[_0x3f5263(0x81)]=void 0x0;const path_1=__importDefault(require(_0x3f5263(0x8c))),request_1=__importDefault(require('request'));module['paths']['push'](path_1[_0x3f5263(0x84)]['join'](Editor[_0x3f5263(0x8e)]['path'],_0x3f5263(0x80)));const md5_1=__importDefault(require('md5')),query_string_1=__importDefault(require(_0x3f5263(0x82))),translate_1=require('../common-lib/translate'),dialog_1=require(_0x3f5263(0x8a));let sessionExpiredWarnShown=!0x1;function encodeParams(_0x307fb3){const _0x2dc1f1=_0x3f5263,_0x123208=function(_0x563ab3){const _0x5bfbdc=_0x5cc0,_0x57a8a5={'plugin_id':'1026','lang':Editor[_0x5bfbdc(0x8b)][_0x5bfbdc(0x85)](),'client_type':0x1,'version':Editor[_0x5bfbdc(0x8e)][_0x5bfbdc(0x7f)],'cc_version':Editor[_0x5bfbdc(0x8e)]['version'],'cs_require':'3x'};return Object[_0x5bfbdc(0x89)]({},_0x563ab3,_0x57a8a5);}(_0x307fb3),_0x347b6f=query_string_1[_0x2dc1f1(0x84)][_0x2dc1f1(0x87)](_0x123208);return _0x123208['sign']=function(_0x491a4b){const _0x33d4b4=_0x2dc1f1;return md5_1[_0x33d4b4(0x84)](_0x491a4b+'&fc81d0f39ca8157f9fb6324912aa2cf3573a5a41');}(_0x347b6f),_0x123208;}function postData(_0x388683,_0x53f4e3){return new Promise((_0x3f3697,_0x44d980)=>{const _0x3a873e=_0x5cc0;try{request_1[_0x3a873e(0x84)]['post']({'url':_0x388683,'json':!0x0,'form':_0x53f4e3,'agentOptions':{'ciphers':_0x3a873e(0x8d),'secureProtocol':_0x3a873e(0x7e)}},(_0x495984,_0x85cd80,_0x2f75e0)=>{const _0x1907ea=_0x3a873e;_0x495984||0xc8!==_0x85cd80[_0x1907ea(0x8f)]?_0x44d980(_0x495984?{'err':_0x495984}:{'res':_0x85cd80,'body':_0x2f75e0}):(_0x2f75e0[_0x1907ea(0x83)]&&(0x0===_0x2f75e0[_0x1907ea(0x83)]?sessionExpiredWarnShown=!0x1:0x196===_0x2f75e0['status']&&(sessionExpiredWarnShown||(dialog_1[_0x1907ea(0x90)](translate_1['tr']('session-expired'),{'title':translate_1['tr']('info-title')}),sessionExpiredWarnShown=!0x0))),_0x3f3697(_0x2f75e0));});}catch(_0x1c6233){_0x44d980({'err':_0x1c6233});}});}exports['encodeParams']=encodeParams,exports['postData']=postData;