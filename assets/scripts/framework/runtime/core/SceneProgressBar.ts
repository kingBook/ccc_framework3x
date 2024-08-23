import { _decorator, Component, Node, ProgressBar, Label, director, view, Vec3, clamp01, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneProgressBar')
export class SceneProgressBar extends Component {

    @property({ type: ProgressBar, visible: true })
    private _progressbar: ProgressBar;

    @property({ type: RichText, visible: true })
    private _richText: RichText;

    protected onEnable(): void {
        //当前节点不在Canvas内，每次激活重新计算大小和缩放
        this.resize();
    }

    protected update(): void {
        this.resize();
    }

    private resize(): void {
        let visibleSize = view.getVisibleSize();
        this.node.setPosition(visibleSize.width * 0.5, visibleSize.height * 0.5);
        let scale = visibleSize.width / view.getDesignResolutionSize().x;
        this.node.setScale(new Vec3(scale, scale, scale));
    }

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
}


