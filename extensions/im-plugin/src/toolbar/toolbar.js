const _0x3b27=['_onUpdateToolbar','-btn','openPanelBtn','newMsgCount','updateToolbar','innerText','send','template','__esModule','-toolbar','methods','close','toolbar','showToolbar','generateStyle','classList','style','isVip','ready','default','-vip-btn',':update-toolbar','remove','msgCounter','-hide','call','./style-generator','title','add','-non-vip-btn-single-digit-msgs','path','get-saved-toolbar-info','save-toolbar-info','setAttribute','Message','buttonTitle','-non-vip-btn-double-digits-msgs','removeEventListener','toString','defineProperty','join','-msg-counter','utf8'];(function(_0x4d1dcc,_0x1eddcd){const _0x3b27b7=function(_0x3bc902){while(--_0x3bc902){_0x4d1dcc['push'](_0x4d1dcc['shift']());}};_0x3b27b7(++_0x1eddcd);}(_0x3b27,0x1c4));const _0x3bc9=function(_0x4d1dcc,_0x1eddcd){_0x4d1dcc=_0x4d1dcc-0x142;let _0x3b27b7=_0x3b27[_0x4d1dcc];return _0x3b27b7;};const _0x331c3f=_0x3bc9;'use strict';var __importDefault=this&&this['__importDefault']||function(_0xba6237){const _0x112ee3=_0x3bc9;return _0xba6237&&_0xba6237[_0x112ee3(0x15f)]?_0xba6237:{'default':_0xba6237};};Object[_0x331c3f(0x153)](exports,_0x331c3f(0x15f),{'value':!0x0}),exports[_0x331c3f(0x162)]=exports[_0x331c3f(0x169)]=exports[_0x331c3f(0x161)]=exports['$']=exports['style']=exports[_0x331c3f(0x15e)]=void 0x0;const fs_1=__importDefault(require('fs')),path_1=__importDefault(require(_0x331c3f(0x14a))),style_generator_1=require(_0x331c3f(0x146)),namespace_1=require('../constant/namespace'),template=fs_1['default']['readFileSync'](path_1[_0x331c3f(0x16a)][_0x331c3f(0x154)](__dirname,'./toolbar.html'),_0x331c3f(0x156));exports[_0x331c3f(0x15e)]=template;const style=style_generator_1[_0x331c3f(0x165)]();exports[_0x331c3f(0x167)]=style;const selector={'toolbar':'.'+namespace_1['ns']+_0x331c3f(0x160),'openPanelBtn':'.'+namespace_1['ns']+_0x331c3f(0x158),'msgCounter':'.'+namespace_1['ns']+_0x331c3f(0x155)};exports['$']=selector;const methods={'updateToolbar'(_0x72cb6={}){const _0x35d42d=_0x331c3f;void 0x0!==_0x72cb6[_0x35d42d(0x164)]&&setElementVisibility(this['$'][_0x35d42d(0x163)],_0x72cb6['showToolbar']),void 0x0!==_0x72cb6['buttonTitle']&&this['$']['openPanelBtn'][_0x35d42d(0x14d)](_0x35d42d(0x147),_0x72cb6[_0x35d42d(0x14f)]),void 0x0!==_0x72cb6[_0x35d42d(0x168)]&&(_0x72cb6[_0x35d42d(0x168)]?(this['$'][_0x35d42d(0x159)]['classList'][_0x35d42d(0x142)](namespace_1['ns']+'-non-vip-btn'),this['$'][_0x35d42d(0x159)][_0x35d42d(0x166)]['add'](namespace_1['ns']+_0x35d42d(0x16b))):(this['$'][_0x35d42d(0x159)][_0x35d42d(0x166)][_0x35d42d(0x142)](namespace_1['ns']+'-vip-btn'),this['$'][_0x35d42d(0x159)][_0x35d42d(0x166)]['add'](namespace_1['ns']+'-non-vip-btn')));const _0x325fa8=_0x72cb6[_0x35d42d(0x15a)];void 0x0!==_0x325fa8&&(this['$'][_0x35d42d(0x163)][_0x35d42d(0x166)][_0x35d42d(0x142)](namespace_1['ns']+_0x35d42d(0x149)),this['$']['toolbar']['classList']['remove'](namespace_1['ns']+_0x35d42d(0x150)),0x0===_0x325fa8?(setElementVisibility(this['$']['msgCounter'],!0x1),this['$']['msgCounter'][_0x35d42d(0x15c)]='0'):(setElementVisibility(this['$'][_0x35d42d(0x143)],!0x0),this['$'][_0x35d42d(0x143)][_0x35d42d(0x15c)]=_0x325fa8>0x63?'99':_0x325fa8[_0x35d42d(0x152)](),_0x72cb6['isVip']||(_0x325fa8>=0xa?this['$']['toolbar'][_0x35d42d(0x166)][_0x35d42d(0x148)](namespace_1['ns']+'-non-vip-btn-double-digits-msgs'):this['$'][_0x35d42d(0x163)][_0x35d42d(0x166)][_0x35d42d(0x148)](namespace_1['ns']+'-non-vip-btn-single-digit-msgs'))));const _0x4e4cd2={'showToolbar':getElementVisibility(this['$'][_0x35d42d(0x163)]),'isVip':this['$'][_0x35d42d(0x159)][_0x35d42d(0x166)]['contains'](namespace_1['ns']+_0x35d42d(0x16b)),'newMsgCount':parseInt(this['$'][_0x35d42d(0x143)][_0x35d42d(0x15c)])||0x0};Editor['Message']['send'](namespace_1['ns'],_0x35d42d(0x14c),_0x4e4cd2);}};async function ready(){const _0x3f5138=_0x331c3f;this[_0x3f5138(0x157)]=_0xabb4d2=>{const _0x3d9c8a=_0x3f5138;methods[_0x3d9c8a(0x15b)][_0x3d9c8a(0x145)](this,_0xabb4d2);},Editor[_0x3f5138(0x14e)]['addBroadcastListener'](namespace_1['ns']+':update-toolbar',this[_0x3f5138(0x157)]),this['$'][_0x3f5138(0x159)]['addEventListener']('click',onClickShowPanel);const _0x99c973=await Editor['Message']['request'](namespace_1['ns'],_0x3f5138(0x14b));_0x99c973&&this[_0x3f5138(0x157)](_0x99c973);}function close(){const _0x98fd04=_0x331c3f;Editor[_0x98fd04(0x14e)]['removeBroadcastListener'](namespace_1['ns']+_0x98fd04(0x16c),this['_onUpdateToolbar']),this['$'][_0x98fd04(0x159)][_0x98fd04(0x151)]('click',onClickShowPanel);}function setElementVisibility(_0x36b7c9,_0x406a9e){const _0x4360a8=_0x331c3f;_0x406a9e?_0x36b7c9['classList']['remove'](namespace_1['ns']+_0x4360a8(0x144)):_0x36b7c9[_0x4360a8(0x166)][_0x4360a8(0x148)](namespace_1['ns']+_0x4360a8(0x144));}function getElementVisibility(_0x1181c0){return!_0x1181c0['classList']['contains'](namespace_1['ns']+'-hide');}function onClickShowPanel(){const _0x5e69f3=_0x331c3f;Editor[_0x5e69f3(0x14e)][_0x5e69f3(0x15d)](namespace_1['ns'],'show-panel');}exports[_0x331c3f(0x161)]=methods,exports[_0x331c3f(0x169)]=ready,exports[_0x331c3f(0x162)]=close;