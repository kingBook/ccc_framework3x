
import { _decorator, Component, Node, log, AudioClip, Vec3 } from 'cc';
import { AudioSourcePlus } from '../../framework/runtime/enginePlus/audio/AudioSourcePlus';
import { App } from '../app/App';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    
    @property({type:AudioClip})
    public clip:AudioClip;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    
    private _count: number = 0;

    start() {
        let audioSourcePlus=this.node.getComponent(AudioSourcePlus);
        this.node.on(Node.EventType.TOUCH_START, (event: any) => {
            /*this._count++;
            if (this._count % 2 === 0) {
                AudioSourcePlus.musicMute=true;
                log(AudioSourcePlus.musicMute);
            }else{
                AudioSourcePlus.musicMute=false;
                log(AudioSourcePlus.musicMute);
            }*/
            
            App.instance.audioManager?.playEffect(this.clip,Vec3.ZERO,1);
           // App.instance.audioManager?.setEffectsMute(true);
        });
    }

    // update (deltaTime: number) {
    //     // [4]
    // }


}
