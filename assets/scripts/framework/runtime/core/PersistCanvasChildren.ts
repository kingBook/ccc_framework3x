import { _decorator, Canvas, Component, director, Director, Node, Scene } from "cc";
const { ccclass, property } = _decorator;

/** 保持指定的 Canvas 子节点，在加载新的场景时不销毁，将子节点移入新的场景的 Canvas 下（注意：挂载该脚本的节点为常驻节点，即在载入新场景时，不能被销毁） */
@ccclass('PersistCanvasChildren')
export class PersistCanvasChildren extends Component {

    @property({ type: Node, visible: true })
    private _canvasChildren: Node[] = [];
    private _canvas: Canvas;
    
    private setCanvas(value:Canvas):void{
        this._canvas=value;
        if(this._canvas){
            director.addPersistRootNode(this._canvas.node);
        }
    }

    protected start(): void {
       this.setCanvas(director.getScene().getComponentInChildren(Canvas));
        
        director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLaunch, this);
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.afterSceneLaunch, this); // 不要在 onLoad 函数侦听，否则当前脚本所在的场景启动时，也执行
    }

    private beforeSceneLaunch(): void {
        // 需要保留的节点，清除父级，加入常驻节点列表
        let i = this._canvasChildren.length;
        while (--i >= 0) {
            let node = this._canvasChildren[i];
            if (!node || !node.isValid) {
                this._canvasChildren.splice(i, 1);
                continue;
            }
            node.parent=null;
            director.addPersistRootNode(node);
        }
        
        // 销毁 canvas
        director.removePersistRootNode(this._canvas.node);
        this._canvas.node.destroy();
    }

    private afterSceneLaunch(): void {
        this.setCanvas(director.getScene().getComponentInChildren(Canvas));

        // 需要保留的节点，从常驻节点列表中移除，添加到新的的 canvas 下
        let i = this._canvasChildren.length;
        while (--i >= 0) {
            let node = this._canvasChildren[i];
            if (!node || !node.isValid) {
                this._canvasChildren.splice(i, 1);
                continue;
            }
            director.removePersistRootNode(node);
            node.setParent(this._canvas.node);
        }
    }

    public onDestroy(): void {
        director.off(Director.EVENT_BEFORE_SCENE_LAUNCH, this.beforeSceneLaunch, this);
        director.off(Director.EVENT_AFTER_SCENE_LAUNCH, this.afterSceneLaunch, this);
    }

}