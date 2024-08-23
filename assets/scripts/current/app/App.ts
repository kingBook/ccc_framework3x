
import { _decorator, Component, game, Enum, sys, director } from 'cc';
import { Physics2DManager } from '../../framework/runtime/core/Physics2DManager';
import { AudioManager } from '../../framework/runtime/core/AudioManager';
import { SceneLoader } from '../../framework/runtime/core/SceneLoader';
import { BaseGame } from '../../framework/runtime/core/BaseGame';
import { PlayerPrefs } from '../../framework/runtime/core/PlayerPrefs';
import { AppFsm } from './AppFsm';
import { NodeUtil } from '../../framework/runtime/utils/NodeUtil';
import { AppGlobalVariables } from './AppGlobalVariables';
import { SubpackageLoader } from '../../framework/runtime/core/SubpackageLoader';
const { ccclass, property } = _decorator;

export enum Language { AUTO, CN, EN };

@ccclass('App')
export class App extends Component {

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
    private _physics2DManager: Physics2DManager;
    @property({ type: AudioManager, visible: true })
    private _audioManager: AudioManager;
    @property({ type: SceneLoader, visible: true })
    private _sceneLoader: SceneLoader;
    @property({ type: SubpackageLoader, visible: true })
    private _subpackageLoader: SubpackageLoader;
    private _openCount: number = 0;
    private _isPause: boolean = false;
    private _fsm: AppFsm;
    private _global: AppGlobalVariables;

    /** 应用的语言 CN | EN */
    public get language(): Language { return this._language; }
    public get physics2DManager(): Physics2DManager { return this._physics2DManager; }
    public get audioManager(): AudioManager { return this._audioManager; }
    /** 场景加载器 */
    public get sceneLoader(): SceneLoader { return this._sceneLoader; }
    /** 子包加载器 */
    public get subpackageLoader(): SubpackageLoader { return this._subpackageLoader; }
    /** 应用打开的次数 */
    public get openCount(): number { return this._openCount; }
    /** 应用是否已暂停 */
    public get isPause(): boolean { return this._isPause; }
    public get fsm(): AppFsm { return this._fsm; }
    public get global(): AppGlobalVariables { return this._global; }


    /** 设置应用暂停/恢复 */
    public setPause(isPause: boolean): void {
        if (this._isPause == isPause) return;
        this._isPause = isPause;

        if (this._isPause) game.pause();
        else game.resume();

        // 发送暂停或恢复事件
        this.node.emit(App.PAUSE_OR_RESUME);
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
        this._fsm = NodeUtil.addNodeComponent(AppFsm, this.node);
        this._global = NodeUtil.addNodeComponent(AppGlobalVariables, this.node);

        this.addOpenCount();

        if (this._language == Language.AUTO) {
            this.initLanguage();
        }

        //标记为“常驻节点”，切换场景时不自动销毁
        director.addPersistRootNode(this.node);
    }

    protected onDestroy(): void {
        App.s_instance = undefined;
    }
}