import { _decorator, Camera, Canvas, Collider2D, Component, director, ERigidBody2DType, EventTouch, find, input, Input, log, MouseJoint2D, PhysicsSystem2D, RigidBody2D, Vec2, Vec3 } from 'cc';
import { NodeUtil } from '../utils/NodeUtil';
const { ccclass, property } = _decorator;

/**
 * 点击任意刚体，第一次点击创建鼠标关节，之后就可以随意拖动任意刚体
 */
@ccclass('Physics2DDebugDrag')
export class Physics2DDebugDrag extends Component {

    private _tempV3 = new Vec3();
    private _touchWorldPos: Vec2 = new Vec2();
    private _mouseJoint: MouseJoint2D;

    protected start(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    private onTouchStart(event: EventTouch): void {
        let cameraMain = director.getScene().getComponentInChildren(Canvas).cameraComponent;

        if (cameraMain) {
            let touchScreenPos = new Vec3(event.getLocation().x, event.getLocation().y, 0);
            cameraMain.screenToWorld(touchScreenPos, this._tempV3);
            this._touchWorldPos.set(this._tempV3.x, this._tempV3.y);
        } else {
            this._touchWorldPos.set(event.getLocation());
        }

        let touchedBody = this.getTouchedBody(this._touchWorldPos);
        if (touchedBody) {
            if (this._mouseJoint && this._mouseJoint.isValid) return;
            this._mouseJoint = touchedBody.node.addComponent(MouseJoint2D);
        }
    }

    private getTouchedBody(worldPos: Vec2): RigidBody2D | null {
        let colliders = PhysicsSystem2D.instance.testPoint(this._touchWorldPos);
        for (let i = 0, len = colliders.length; i < len; i++) {
            let collider = colliders[i];
            let body = collider.body;
            if (body) {
                return body;
            }
        }
        return null;
    }

    protected onDestroy(): void {

    }

}