import { _decorator, Component, AudioClip, Node, Vec3, director, clamp01 } from 'cc';
import { AudioSourcePlus } from '../enginePlus/audio/AudioSourcePlus';
import PlayerPrefs from './PlayerPrefs';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {

    private static getLocalMusicMute(): boolean {
        return PlayerPrefs.getInt("AudioManager_musicMute", 0) > 0;
    }

    private static setLocalMusicMute(value: boolean): void {
        PlayerPrefs.setInt("AudioManager_musicMute", value ? 1 : 0);
    }

    private static getLocalEffectsMute(): boolean {
        return PlayerPrefs.getInt("AudioManager_effectsMute", 0) > 0;
    }

    private static setLocalEffectsMute(value: boolean): void {
        PlayerPrefs.setInt("AudioManager_effectsMute", value ? 1 : 0);
    }

    private static getLocalMusicVolumeScale(): number {
        return PlayerPrefs.getFloat("AudioManager_musicVolumeScale", AudioSourcePlus.musicVolumeScale);
    }

    private static setLocalMusicVolumeScale(value: number): void {
        PlayerPrefs.setFloat("AudioManager_musicVolumeScale", clamp01(value));
    }

    private static getLocalEffectsVolumeScale(): number {
        return PlayerPrefs.getFloat("AudioManager_effectsVolumeScale", AudioSourcePlus.effectsVolumeScale);
    }

    private static setLocalEffectsVolumeScale(value: number): void {
        PlayerPrefs.setFloat("AudioManager_effectsVolumeScale", clamp01(value));
    }



    public get musicMute(): boolean {
        return AudioSourcePlus.musicMute;
    }

    public get effectsMute(): boolean {
        return AudioSourcePlus.effectsMute;
    }

    public get musicVolumeScale(): number {
        return AudioSourcePlus.musicVolumeScale;
    }

    public get effectsVolumeScale(): number {
        return AudioSourcePlus.effectsVolumeScale;
    }


    public setMusicMute(value: boolean): void {
        AudioSourcePlus.musicMute = value;
    }

    public setEffectsMute(value: boolean): void {
        AudioSourcePlus.effectsMute = value;
    }

    public setMusicVolumeScale(value: number): void {
        AudioSourcePlus.musicVolumeScale = value;
    }

    public setEffectsVolumeScale(value: number): void {
        AudioSourcePlus.effectsVolumeScale = value;
    }


    public playMusic(clip: AudioClip | null, worldPosition: Vec3, volume: number): AudioSourcePlus | null {
        if (!clip) return null;
        let node = new Node("Play music at point (AudioManager)");
        node.setWorldPosition(worldPosition);
        director.getScene()?.addChild(node);

        let audioSource = node.addComponent(AudioSourcePlus);
        audioSource.volume = volume;
        audioSource.loop = true;
        audioSource.clip = clip;
        audioSource.playOnAwake = true;
        audioSource.play();

        return audioSource;
    }

    public playEffect(clip: AudioClip | null, worldPosition: Vec3, volume: number): AudioSourcePlus | null {
        if (!clip) return null;
        let node = new Node("Play effect at point (AudioManager)");
        node.setWorldPosition(worldPosition);
        director.getScene()?.addChild(node);

        let audioSource = node.addComponent(AudioSourcePlus);
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

    protected onLoad(): void {
        this.setMusicMute(AudioManager.getLocalMusicMute());
        this.setEffectsMute(AudioManager.getLocalEffectsMute());

        this.setMusicVolumeScale(AudioManager.getLocalMusicVolumeScale());
        this.setEffectsVolumeScale(AudioManager.getLocalEffectsVolumeScale());
    }

}

