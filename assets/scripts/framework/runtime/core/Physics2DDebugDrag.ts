import { _decorator, Camera, Collider2D, Component, director, EventTouch, input, Input, PhysicsSystem2D, Vec2, Vec3 } from 'cc';
import { Physics2DMouseJoint } from '../extensions/physics2D/Physics2DMouseJoint';
const { ccclass, property } = _decorator;

@ccclass('Physics2DDebugDrag')
export class Physics2DDebugDrag extends Component {

	private _tempV3 = new Vec3();
	private _touchWorldPos: Vec2 = new Vec2();
	private _mouseJoint: Physics2DMouseJoint;
	private _cameraMain: Camera;

	protected start(): void {
		this._cameraMain = director.getScene().renderScene.cameras[0].node.getComponent(Camera);
		input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
		input.on(Input.EventType.TOUCH_MOVE, this.onTouchMoved, this);
		input.on(Input.EventType.TOUCH_END, this.onTouchEnded, this);
		input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnded, this);
	}

	private onTouchStart(event: EventTouch): boolean {
		if (this._cameraMain) {
			let touchScreenPos = new Vec3(event.getLocation().x, event.getLocation().y, 0);
			this._cameraMain.screenToWorld(touchScreenPos, this._tempV3);
			this._touchWorldPos.set(this._tempV3.x, this._tempV3.y);
		} else {
			this._touchWorldPos.set(event.getLocation());
		}
		let collider: Collider2D = PhysicsSystem2D.instance.testPoint(this._touchWorldPos)[0];
		if (collider) {
			/*this._mouseJoint = this.node.addComponent(Physics2DMouseJoint);
			this._mouseJoint.isManual = true;
			this._mouseJoint.target = this._touchWorldPos;
			this._mouseJoint.connectedBody = collider.body;
			this._mouseJoint.apply();*/
		}
		//此处必须返回true（表示接触到了节点）,否则TOUCH_MOVE,TOUCH_END,TOUCH_CANCEL不触发。
		return true;
	}

	private onTouchMoved(event: EventTouch): void {
		if (this._mouseJoint) {
			if (this._cameraMain) {
				let touchScreenPos = new Vec3(event.getLocation().x, event.getLocation().y, 0);
				this._cameraMain.screenToWorld(touchScreenPos, this._tempV3);
				this._touchWorldPos.set(this._tempV3.x, this._tempV3.y);
			} else {
				this._touchWorldPos.set(event.getLocation());
			}
			//this._mouseJoint.target = this._touchWorldPos;
		}
	}

	private onTouchEnded(event: EventTouch): void {
		if (this._mouseJoint) {
			this._mouseJoint.destroy();
			this._mouseJoint = null;
		}
	}

	protected onDestroy(): void {
		super.onDestroy();
	}

}