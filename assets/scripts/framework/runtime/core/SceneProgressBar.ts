import { _decorator, Component, Node, ProgressBar, Label, director, view, Vec3, clamp01, RichText, Scene, Canvas, NodeEventType, Event } from 'cc';
const { ccclass, property } = _decorator;

/** 显示在屏幕中间的进度条（用于显示加载场景、子包的进度） */
@ccclass('SceneProgressBar')
export class SceneProgressBar extends Component {

    @property({ type: ProgressBar, visible: true })
    private _progressbar: ProgressBar;

    @property({ type: RichText, visible: true })
    private _richText: RichText;

    /**
     * 设置显示的进度
     * @param value 范围：[0,1]
     */
    public setProgress(value: number): void {
        if (this._progressbar) {
            this._progressbar.progress = clamp01(value);
        }
    }

    /**
     * 设置进度条上的文本
     * @param textString 显示的字符串
     */
    public setText(textString: string): void {
        if (this._richText) {
            this._richText.string = textString;
        }
    }

    private setToTop(): void {
        this.node.setSiblingIndex(this.node.parent.children.length - 1);
    }

    private onActiveInHierachyChanged(event: Node): void {
        if (this.node.active) {
            this.setToTop();
        }
    }

    protected onLoad(): void {
        this.node.on(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this.onActiveInHierachyChanged, this);
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.ACTIVE_IN_HIERARCHY_CHANGED, this.onActiveInHierachyChanged, this);
    }
}


