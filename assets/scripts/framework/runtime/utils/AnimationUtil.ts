import { Animation, error } from "cc";

export class AnimationUtil {

    /**
     * 播放动画到指定的sprite帧，并停止
     * @param animation cc.Animation组件
     * @param frameIndex 帧索引（大于等于0的整数）
     * @param clipStateName 动画剪辑状态的名称
     */
    public static gotoAndStop(animation: Animation, frameIndex: number, clipStateName: string): void {
        if (frameIndex === undefined || isNaN(frameIndex) || frameIndex < 0) {
            error("frame 不能是 undefined、NaN、小于0");
        }
        frameIndex = frameIndex | 0; // 取整
        const animState = animation.getState(clipStateName);
        animState.stop();

        const times: number[] = animState.clip['_tracks'][0]['_channel']['_curve']['_times'];
        frameIndex = Math.min(frameIndex, times.length - 1);
        const frameTime: number = times[frameIndex];
        animState.setTime(frameTime);

        animState.sample();
    }
}