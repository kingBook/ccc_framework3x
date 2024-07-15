
import { _decorator, Component, Node, log, AudioClip, Vec3, director,AudioSource } from 'cc';
import { App } from '../framework/core/App';
import { AudioSourcePlus } from '../framework/enginePlus/audio/AudioSourcePlus';
const { ccclass, property } = _decorator;

@ccclass('Test_001')
export class Test_001 extends Component {
    
    @property({type:AudioClip})
    public clip:AudioClip|null=null;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    
    private _count: number = 0;

    start() {
        let audioSourcePlus=this.node.getComponent(AudioSourcePlus);
        this.node.on(Node.EventType.MOUSE_DOWN, (event: any) => {
            /*this._count++;
            if (this._count % 2 === 0) {
                AudioSourcePlus.musicMute=true;
                log(AudioSourcePlus.musicMute);
            }else{
                AudioSourcePlus.musicMute=false;
                log(AudioSourcePlus.musicMute);
            }*/
            
           this.playEffect(this.clip,Vec3.ZERO,1);
           // App.instance.audioManager?.setEffectsMute(true);
        });
    }
    
    private playEffect(clip: AudioClip | null, worldPosition: Vec3, volume: number): AudioSource | null {
        if (!clip) return null;
        let node = new Node("Play effect at point (AudioManager)");
        node.setWorldPosition(worldPosition);
        director.getScene()?.addChild(node);

        let audioSource = node.addComponent(AudioSource);
        audioSource.volume = volume;
        audioSource.loop = false;
        audioSource.clip = clip;
        audioSource.playOnAwake = true;
        audioSource.play();

        audioSource.scheduleOnce(() => {
            node.destroy();
        }, audioSource.duration);
        return audioSource;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }


}
