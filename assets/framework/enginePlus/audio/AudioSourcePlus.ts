
import { _decorator, AudioSource, clamp, director, isValid } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioSourcePlus')
export class AudioSourcePlus extends AudioSource {

    private static _musicVolumeScale = 1;
    private static _effectsVolumeScale = 1;
    private static _musicMute = false;
    private static _effectsMute = false;

    static set musicVolumeScale(val: number) {
        AudioSourcePlus._musicVolumeScale = val;

        let currentScene = director.getScene();
        if (currentScene) {
            let audioSources = currentScene.getComponentsInChildren(AudioSourcePlus);
            if (audioSources) {
                for (let i = 0, l = audioSources.length; i < l; i++) {
                    let audioSource = audioSources[i];
                    if (!audioSource || !isValid(audioSource, true)) continue;
                    if (!audioSource.loop) continue;
                    if (!audioSource._player) continue;
                    audioSource._player.volume = AudioSourcePlus.musicMute ? 0 : audioSource.volume * AudioSourcePlus.musicVolumeScale;
                }
            }
        }
    }
    
    static get musicVolumeScale() {
        return AudioSourcePlus._musicVolumeScale;
    }

    static set effectsVolumeScale(val: number) {
        AudioSourcePlus._effectsVolumeScale = val;

        let currentScene = director.getScene();
        if (currentScene) {
            let audioSources = currentScene.getComponentsInChildren(AudioSourcePlus);
            if (audioSources) {
                for (let i = 0, l = audioSources.length; i < l; i++) {
                    let audioSource = audioSources[i];
                    if (!audioSource || !isValid(audioSource, true)) continue;
                    if (audioSource.loop) continue;
                    if (!audioSource._player) continue;
                    audioSource._player.volume = AudioSourcePlus.effectsMute ? 0 : audioSource.volume * AudioSourcePlus.effectsVolumeScale;
                }
            }
        }
    }
    
    static get effectsVolumeScale() {
        return this._effectsVolumeScale;
    }

    static set musicMute(val: boolean) {
        AudioSourcePlus._musicMute = val;

        let currentScene = director.getScene();
        if (currentScene) {
            let audioSources = currentScene.getComponentsInChildren(AudioSourcePlus);
            if (audioSources) {
                for (let i = 0, l = audioSources.length; i < l; i++) {
                    let audioSource = audioSources[i];
                    if(!audioSource || !isValid(audioSource,true)) continue;
                    if(!audioSource.loop) continue;
                    if (!audioSource._player) continue;
                    audioSource._player.volume = AudioSourcePlus.musicMute ? 0 : audioSource.volume * AudioSourcePlus.musicVolumeScale;
                }
            }
        }
    }

    static get musicMute() {
        return this._musicMute;
    }

    static set effectsMute(val: boolean) {
        AudioSourcePlus._effectsMute = val;

        let currentScene = director.getScene();
        if (currentScene) {
            let audioSources = currentScene.getComponentsInChildren(AudioSourcePlus);
            if (audioSources) {
                for (let i = 0, l = audioSources.length; i < l; i++) {
                    let audioSource = audioSources[i];
                    if(!audioSource || !isValid(audioSource,true)) continue;
                    if(audioSource.loop) continue;
                    if (!audioSource._player) continue;
                    audioSource._player.volume = AudioSourcePlus.effectsMute ? 0 : audioSource.volume * AudioSourcePlus.effectsVolumeScale;
                }
            }
        }
    }

    static get effectsMute() {
        return this._effectsMute;
    }

    onLoad() {
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
    set volume(val: number) {
        if (Number.isNaN(val)) { console.warn('illegal audio volume!'); return; }
        val = clamp(val, 0, 1);
        this._volume = val;
        
        if (this._player) {
            if(this._loop){
                this._player.volume = AudioSourcePlus.musicMute ? 0 : val * AudioSourcePlus.musicVolumeScale;
            }else{
                this._player.volume = AudioSourcePlus.effectsMute ? 0 : val * AudioSourcePlus.effectsVolumeScale;
            }
        }
    }

    @property({ override: true })
    get volume() {
        return this._volume;
    }

    protected _syncStates() {
        let self: any = this;
        if (!self._player) { return; }
        self._player.seek(self._cachedCurrentTime).then(() => {
            if (self._player) {
                self._player.loop = self._loop;
                
                if(self._loop){
                    self._player.volume = AudioSourcePlus.musicMute ? 0 : self._volume * AudioSourcePlus.musicVolumeScale;
                }else{
                    self._player.volume = AudioSourcePlus.effectsMute ? 0 : self._volume * AudioSourcePlus.effectsVolumeScale;
                }
                
                self._operationsBeforeLoading.forEach((opName: any) => { self[opName]?.(); });
                self._operationsBeforeLoading.length = 0;
            }
        }).catch(() => { });
    }

}
