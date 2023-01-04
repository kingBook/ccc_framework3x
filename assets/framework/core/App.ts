
import { _decorator, Component, game, Enum, Vec2, log, sys, AudioSource, director } from 'cc';
import { AudioSourcePlus } from '../enginePlus/audio/AudioSourcePlus';
import { AudioManager } from './AudioManager';
import BaseBehaviour from './BaseBehaviour';
import BaseGame from './BaseGame';
import { Physics2DManager } from './Physics2DManager';
import PlayerPrefs from './PlayerPrefs';
const { ccclass, property } = _decorator;

export enum Language { AUTO, CN, EN };

@ccclass('App')
export default class App extends Component {

    /** 改变语言事件，回调函数格式：(language:Language):void */
    public static readonly CHANGED_LANGUAGE: string = "changedLanguage";
    /** 暂停或恢复事件，回调函数格式：():void */
    public static readonly PAUSE_OR_RESUME: string = "pauseOrResume";

    private static s_instance: App;
    public static get instance(): App {
        return App.s_instance;
    }

    @property({ type: Enum(Language), visible: true })
    private _language: Language = Language.AUTO;
    @property({ type: Physics2DManager, visible: true })
    private _physics2DManager: Physics2DManager | null = null;
    @property({ type: AudioManager, visible: true })
    private _audioManager: AudioManager | null = null;
    //@property({type:SceneLoader,visible:true})
    //private _sceneLoader:SceneLoader=null;
    //@property({type:SubpackageLoader,visible:true})
    //private _subpackageLoader:SubpackageLoader=null;
    @property({ type: [BaseGame], visible: true })
    private _games: BaseGame[] = [];

    private _openCount: number = 0;
    private _isPause: boolean = false;

    /** 应用的语言 CN | EN */
    public get language(): Language {
        return this._language;
    }

    public get physics2DManager(): Physics2DManager | null {
        return this._physics2DManager;
    }

    public get audioManager(): AudioManager | null {
        return this._audioManager;
    }
    /** 场景加载器 */
    /*public get sceneLoader():SceneLoader{
        return this._sceneLoader;
    }*/
    /** 分包加载器 */
    /*public get subpackageLoader():SubpackageLoader{
        return this._subpackageLoader;
    }*/

    /** 应用打开的次数 */
    public get openCount(): number {
        return this._openCount;
    }

    /** 应用是否已暂停 */
    public get isPause(): boolean {
        return this._isPause;
    }

    /** 应用内拥有的游戏实例个数 */
    public get gameCount(): number {
        return this._games.length;
    }
    

    
    /** 设置应用暂停/恢复 */
    public setPause(isPause: boolean): void {
        if (this._isPause == isPause) return;
        this._isPause = isPause;

        if (this._isPause) game.pause();
        else game.resume();

        // 发送暂停或恢复事件
        this.node.emit(App.PAUSE_OR_RESUME);
    }

    /** 返回指定索引的游戏实例 */
    public getGame<T extends BaseGame>(index: number = 0): T {
        return <T>this._games[index];
    }
    
    private addOpenCount(): void {
        const key: string = "appOpenCount";
        this._openCount = PlayerPrefs.getInt(key, 0) + 1;
        PlayerPrefs.setInt(key, this._openCount);
    }

    private initLanguage(): void {
        let isCN: boolean = sys.language == sys.Language.CHINESE;
        this._language = isCN ? Language.CN : Language.EN;
        //发送改变语言事件
        this.node.emit(App.CHANGED_LANGUAGE, this._language);
    }
    

    protected onLoad(): void {
        App.s_instance = this;
        this.addOpenCount();

        if (this._language == Language.AUTO) {
            this.initLanguage();
        }

        //标记为“常驻节点”，切换场景时不自动销毁
        director.addPersistRootNode(this.node);
    }

    protected onDestroy(): void {
        
    }
}