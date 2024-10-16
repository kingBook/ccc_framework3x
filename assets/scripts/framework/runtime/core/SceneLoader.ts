import { _decorator, Component, director } from 'cc';
import { SceneProgressBar } from './SceneProgressBar';
const { ccclass, property } = _decorator;

/** 场景加载器 */
@ccclass('SceneLoader')
export class SceneLoader extends Component {

    @property({ type: SceneProgressBar, visible: true })
    private _sceneProgressBar!: SceneProgressBar;

    private _frameCount: number = 0;
    private _isLoading: boolean = false;
    private _virtualProgress: number = 0;//假的加载进度[0,0.9]
    private _sceneName: string;

    /**
     * 通过场景名称进行加载场景。
     * @param sceneName 加载场景的名称
     * @param progressVisible 默认为 false，是否显示进度条
     * @param onLaunched 场景启动时的回调函数
     * @returns 如果出错则返回false
     */
    public load(sceneName: string, progressVisible: boolean = false, onLaunched?: Function): boolean {
        if (progressVisible) {
            this._sceneName = sceneName;
            if (this._sceneProgressBar) {
                this._sceneProgressBar.node.active = true;
                this._sceneProgressBar.setProgress(0);
                this._sceneProgressBar.setText("Loading scene " + this._sceneName + ".fire 0%...");
            }
            //初始设置虚拟进度
            this._isLoading = true;
            this._frameCount = 0;
            this._virtualProgress = 0;
        }
        //
        let isErr: boolean = director.loadScene(sceneName, () => {
            if (progressVisible) {
                if (this._sceneProgressBar) {
                    this._sceneProgressBar.node.active = false;
                }
                this._isLoading = false;//结束计算虚拟进度
            }
            if (onLaunched) onLaunched();
        });
        return isErr;
    }

    /**
     * 异步加载场景
     * @param sceneName 加载场景的名称
     * @param progressVisible 默认为 true，是否显示进度条
     * @param isLaunchOnLoaded 默认为 true，加载场景完成时是否启动场景
     * @param onProgress 加载过程中的回调函数，格式：(completedCount:number,totalCount:number,item:any):void
     * @param onLoaded 场景加载完成时的回调函数，格式：(error:Error):void
     */
    public preload(sceneName: string, progressVisible: boolean = true, isLaunchOnLoaded: boolean = true, onProgress?: (completedCount: number, totalCount: number, item: any) => void, onLoaded?: (error: Error | null) => void): void {
        if (progressVisible) {
            this._sceneName = sceneName;
            if (this._sceneProgressBar) {
                this._sceneProgressBar.node.active = true;
                this._sceneProgressBar.setProgress(0);
                this._sceneProgressBar.setText("Loading scene " + this._sceneName + ".fire 0%...");
            }
            //初始设置虚拟进度
            this._isLoading = true;
            this._frameCount = 0;
            this._virtualProgress = 0;
        }
        //
        director.preloadScene(sceneName,
            (completedCount: number, totalCount: number, item: any) => {
                if (progressVisible) {
                    let progress: number = Math.max(this._virtualProgress, completedCount / totalCount);
                    if (this._sceneProgressBar) {
                        this._sceneProgressBar.setProgress(progress);
                        this._sceneProgressBar.setText("Loading scene " + this._sceneName + ".fire " + Math.floor(progress * 100) + "%...");
                    }
                    this._virtualProgress = progress;
                }
                if (onProgress) onProgress(completedCount, totalCount, item);
            },
            (error: Error | null) => {
                if (progressVisible) {
                    if (this._sceneProgressBar) {
                        this._sceneProgressBar.node.active = false;
                    }
                    this._isLoading = false;//结束计算虚拟进度
                }
                if (isLaunchOnLoaded) director.loadScene(sceneName);//启动场景
                if (onLoaded) onLoaded(error);
            }
        );
    }

    protected update(dt: number): void {
        if (this._isLoading) {
            this._frameCount++;
            if (this._frameCount % 2 == 0) {
                this._frameCount = 0;
                this._virtualProgress = Math.min(this._virtualProgress + 0.01, 0.9);
                if (this._sceneProgressBar) {
                    this._sceneProgressBar.setProgress(this._virtualProgress);
                    this._sceneProgressBar.setText("Loading scene " + this._sceneName + ".fire " + Math.floor(this._virtualProgress * 100) + "%...");
                }
            }
        }
    }
}


