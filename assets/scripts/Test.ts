
import { _decorator, Component, Node, log } from 'cc';
import { AudioSourcePlus } from '../framework/enginePlus/audio/AudioSourcePlus';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    
    private _count: number = 0;

    start() {
        let audioSourcePlus=this.node.getComponent(AudioSourcePlus);
        this.node.on(Node.EventType.MOUSE_DOWN, (event: any) => {
            this._count++;
            if (this._count % 2 === 0) {
                AudioSourcePlus.globalMute=true;
                log(true);
            }else{
                AudioSourcePlus.globalMute=false;
                log(false);
            }
        });
    }

    // update (deltaTime: number) {
    //     // [4]
    // }


}
