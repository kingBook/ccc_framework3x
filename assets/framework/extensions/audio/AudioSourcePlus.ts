
import { _decorator, Component, Node, AudioSource, clamp} from 'cc';
//import { ccclass, help, menu, tooltip, type, range, serializable } from 'cc.decorator';
const { ccclass, property} = _decorator;

@ccclass('AudioSourcePlus')
export class AudioSourcePlus extends AudioSource {

    private static _globalVolumeScale = 1;

    static set globalVolume(val: number) {
        AudioSourcePlus._globalVolumeScale = val;
    }

    static get globalVolume() {
        return AudioSourcePlus._globalVolumeScale;
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
    @range([0.0, 1.0])
    @tooltip('i18n:audio.volume')
    set volume(val: number) {
        if (Number.isNaN(val)) { console.warn('illegal audio volume!'); return; }
        val = clamp(val, 0, 1);
        if (this._player) {
            this._player.volume = val * AudioSourcePlus._globalVolumeScale;
        }
        this._volume = val;
    }

    protected _syncStates() {
        let self: any = this;
        if (!self._player) { return; }
        self._player.seek(self._cachedCurrentTime).then(() => {
            if (self._player) {
                self._player.loop = self._loop;
                self._player.volume = self._volume * AudioSourcePlus._globalVolumeScale;
                self._operationsBeforeLoading.forEach((opName: any) => { self[opName]?.(); });
                self._operationsBeforeLoading.length = 0;
            }
        }).catch((e: any) => { });
    }

}
