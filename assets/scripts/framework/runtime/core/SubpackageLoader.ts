import { _decorator, Component, Node, assetManager, AssetManager, director } from 'cc';
import { SceneProgressBar } from './SceneProgressBar';
const { ccclass, property } = _decorator;

@ccclass('SubpackageLoader')
export class SubpackageLoader extends Component {

    @property({ type: SceneProgressBar, visible: true })
    private _sceneProgressBar!: SceneProgressBar;

    private _isLoading: boolean = false;
    private _frameCount: number = 0;
    private _virtualProgress: number = 0;//假的加载进度[0,0.9]
    private _subpackageName!: string;

    /**
     * 加载子包
     * @param subpackageName 子包名称
     * @param progressVisible 默认为 true，是否显示进度条
     * @param isDestroyCurrentSceneChildren 默认为 true，是否删除当前逻辑场景的所有非常驻节点
     * @param completeCallback 加载完成时的回调函数，格式：(error:Error,bundle:cc.AssetManager.Bundle):void
     */
    public loadSubpackage(subpackageName: string, progressVisible: boolean = true, isDestroyCurrentSceneChildren: boolean = true, completeCallback?: (error: Error, bundle: AssetManager.Bundle) => void): void {
        if (isDestroyCurrentSceneChildren) this.destroyCurrentLogicSceneChildren(false);
        if (progressVisible) {
            this._subpackageName = subpackageName;
            if (this._sceneProgressBar) {
                this._sceneProgressBar.node.active = true;
                this._sceneProgressBar.setProgress(0);
                this._sceneProgressBar.setText("Loading subpackage " + subpackageName + " 0%...");
            }
            //初始设置虚拟进度
            this._isLoading = true;
            this._frameCount = 0;
            this._virtualProgress = 0;
        }
        assetManager.loadBundle(subpackageName, (err: Error, bundle: AssetManager.Bundle) => {
            if (progressVisible) {
                if (this._sceneProgressBar) {
                    this._sceneProgressBar.node.active = false;
                }
                this._isLoading = false;//结束计算虚拟进度
            }
            if (completeCallback) completeCallback(err, bundle);
        });
    }

    protected update(dt: number): void {
        if (this._isLoading) {
            this._frameCount++;
            if (this._frameCount % 2 == 0) {
                this._frameCount = 0;
                this._virtualProgress = Math.min(this._virtualProgress + 0.01, 0.9);
                if (this._sceneProgressBar) {
                    this._sceneProgressBar.setProgress(this._virtualProgress);
                    this._sceneProgressBar.setText("Loading subpackage " + this._subpackageName + " " + Math.floor(this._virtualProgress * 100) + "%...");
                }
            }
        }
    }

    private destroyCurrentLogicSceneChildren(isDestroyPersistRootNode: boolean) {
        let scene = director.getScene();
        if (scene) {
            let children = scene.children;
            let i = children.length;
            while (--i >= 0) {
                let child = children[i];
                if (!isDestroyPersistRootNode && director.isPersistRootNode(child)) continue;
                child.destroy();
            }
        }
    }
}


