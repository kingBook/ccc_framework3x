
import { _decorator, Component, game, Enum, Vec2, log, sys, AudioSource } from 'cc';
import { AudioSourcePlus } from '../enginePlus/audio/AudioSourcePlus';
import BaseBehaviour from './BaseBehaviour';
import BaseGame from './BaseGame';
import PlayerPrefs from './PlayerPrefs';
const { ccclass, property } = _decorator;

export enum Language { AUTO, CN, EN };

@ccclass('App')
export default class App extends BaseBehaviour {

    /** 改变语言事件，回调函数格式：(language:Language):void */
    public static readonly CHANGE_LANGUAGE: string = "changeLanguage";
    /** 暂停或恢复事件，回调函数格式：():void */
    public static readonly PAUSE_OR_RESUME: string = "pauseOrResume";

    private static s_instance: App;
    public static get instance(): App {
        return App.s_instance;
    }

    /** 设置静音 */
    public static setMute(value: boolean): void {
        AudioSourcePlus.musicMute = value;
        AudioSourcePlus.effectsMute = value;
    }

    private static onSetEnablePhysics2D(oldValue: boolean): void {
        log(oldValue);
    }

    @property({ type: Enum(Language), visible: true })
    private _language: Language = Language.AUTO;
    //@property({type:SceneLoader,visible:true})
    //private _sceneLoader:SceneLoader=null;
    //@property({type:SubpackageLoader,visible:true})
    //private _subpackageLoader:SubpackageLoader=null;
    //@property({type:DebugDraw,visible:true})
    //private _debugDraw:DebugDraw=null;
    @property({ visible: true })
    private _enablePhysics2D: boolean = true;
    @property({ displayName: "　　　Gravity", visible() { return true; } })
    private _gravity2D: Vec2 = new Vec2(0, -320);
    @property({ displayName: "　　　Debug Draw", visible() { return true; } })
    private _enablePhysics2DDebugDraw: boolean = true;
    @property({ displayName: "　　　Debug Drag", visible() { return true; } })
    private _enablePhysicsDebugDrag: boolean = true;
    @property({ range: [0, 1], slide: true, visible: true, tooltip: "背景音乐音量" })
    private _musicVolume: number = 1;
    @property({ range: [0, 1], slide: true, visible: true, tooltip: "音效音量" })
    private _effectsVolume: number = 1;
    @property({ type: [BaseGame], visible: true })
    private _games: BaseGame[] = [];

    private _openCount: number = 0;
    private _isPause: boolean = false;

    /** 应用的语言 CN | EN */
    public get language(): Language {
        return this._language;
    }
    /** 场景加载器 */
    /*public get sceneLoader():SceneLoader{
        return this._sceneLoader;
    }*/
    /** 分包加载器 */
    /*public get subpackageLoader():SubpackageLoader{
        return this._subpackageLoader;
    }*/
    /** 调试绘画 */
    /*public get debugDraw():DebugDraw{
        return this._debugDraw;
    }*/
    /** 应用打开的次数 */
    public get openCount(): number {
        return this._openCount;
    }
    /** 应用是否已暂停 */
    public get isPause(): boolean {
        return this._isPause;
    }
    /** 应用是否静音 */
    /*public get isMute():boolean{
        return cc.audioEngine.getMusicVolume()==0 && cc.audioEngine.getEffectsVolume()==0;
    }*/
    /** 背景音乐音量 */
    public get musicVolume(): number {
        return this._musicVolume;
    }
    /** 音效音量 */
    public get effectsVolume(): number {
        return this._effectsVolume;
    }
    /** 应用内拥有的游戏实例个数 */
    public get gameCount(): number {
        return this._games.length;
    }

    protected onLoad(): void {
        super.onDestroy();
        App.s_instance = this;
        this.addOpenCount();
        //this.audioEngineExtension();

        if (this._language == Language.AUTO) {
            this.initLanguage();
        }
        if (this._enablePhysics2D) {
            this.initPhysics2D();
        }
        //标记为“常驻节点”，切换场景时不自动销毁
        game.addPersistRootNode(this.node);
    }

    private addOpenCount(): void {
        const key: string = "applicationOpenCount";
        this._openCount = PlayerPrefs.getInt(key, 0) + 1;
        PlayerPrefs.setInt(key, this._openCount);
    }

    /** 声音引擎扩展 */
    /*private audioEngineExtension():void{
        let self=this;
        cc.audioEngine.setMusicVolume(self._musicVolume);
        cc.audioEngine.setEffectsVolume(self._effectsVolume);
        //重定义cc.audioEngine.setMusicVolume方法，调节音量时也设置App._musicVolume
        let setMusicVolumeFunc=cc.audioEngine.setMusicVolume.bind(cc.audioEngine);
        cc.audioEngine.setMusicVolume=(volume:number)=>{
            setMusicVolumeFunc(volume);
            self._musicVolume=volume;
        };
        //重定义cc.audioEngine.setMusicVolume方法，调节音量时也设置App._musicVolume
        let setEffectsVolumeFunc=cc.audioEngine.setEffectsVolume.bind(cc.audioEngine);
        cc.audioEngine.setEffectsVolume=(volume:number)=>{
            setEffectsVolumeFunc(volume);
            self._effectsVolume=volume;
        };
    }*/

    private initPhysics2D(): void {
        /*let physicsManager:cc.PhysicsManager=cc.director.getPhysicsManager();
        physicsManager.enabled=true;
        physicsManager.gravity=this._gravity2D;//必须在physicsManager.enabled=true;之后设置
        if(this._enablePhysics2DDebugDraw){
            physicsManager.debugDrawFlags=cc.PhysicsManager.DrawBits.e_jointBit|
                                          cc.PhysicsManager.DrawBits.e_shapeBit;
        }
        if(this._enablePhysicsDebugDrag){
            let physicsDebugDragNode=new cc.Node(PhysicsDebugDrag.name);
            physicsDebugDragNode.addComponent(PhysicsDebugDrag);
            physicsDebugDragNode.parent=this.node;
        }*/
    }

    private initLanguage(): void {
        let isCN: boolean = sys.language == sys.LANGUAGE_CHINESE;
        this._language = isCN ? Language.CN : Language.EN;
        //发送改变语言事件
        this.node.emit(App.CHANGE_LANGUAGE, this._language);
    }

    /** 设置应用暂停/恢复 */
    public setPause(isPause: boolean): void {
        /*if(this._isPause==isPause)return;
        this._isPause=isPause;
        
        if(this._isPause)cc.game.pause();
        else cc.game.resume();
        //发送暂停或恢复事件
        this.node.emit(App.PAUSE_OR_RESUME);*/
    }

    /** 返回指定索引的游戏实例 */
    public getGame<T extends BaseGame>(index: number = 0): T {
        return <T>this._games[index];
    }

    protected onDestroy(): void {
        super.onDestroy();
    }
}