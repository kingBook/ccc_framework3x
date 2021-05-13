
import { _decorator, Component, Node, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioSourcePlus')
export class AudioSourcePlus extends AudioSource {

    onLoad(){
        super.onLoad();
    }

    /**
     * @en
     * The volume of this audio source (0.0 to 1.0).<br>
     * Note: Volume control may be ineffective on some platforms.
     * @zh
     * 音频的音量（大小范围为 0.0 到 1.0）。<br>
     * 请注意，在某些平台上，音量控制可能不起效。<br>
     */
    set volume (val:number){
        super.volume=val;
    }


}
