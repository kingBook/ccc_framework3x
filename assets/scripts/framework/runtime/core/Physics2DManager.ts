import { _decorator, Component, Node, Vec2, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
import { Physics2DDebugDrag } from './Physics2DDebugDrag';
import { NodeUtil } from '../utils/NodeUtil';
const { ccclass, property } = _decorator;

/** 物理2D管理器 */
@ccclass('Physics2DManager')
export class Physics2DManager extends Component {

    @property({ displayName: "Gravity", visible: true })
    private _gravity: Vec2 = new Vec2(0, -320);
    @property({ displayName: "Debug Draw", visible: true })
    private _enableDebugDraw: boolean = true;
    @property({ displayName: "Debug Drag", visible: true })
    private _enableDebugDrag: boolean = true;
    
    
    
    private initPhysics2D(): void {
        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.gravity = this._gravity; // 必须在激活物理系统之后设置
        if(this._enableDebugDraw){
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Joint | 
                                                      EPhysics2DDrawFlags.Shape;
        }
        if(this._enableDebugDrag){
            NodeUtil.addNodeComponent(Physics2DDebugDrag,this.node);
        }
    }
    
    protected onLoad():void {
        this.initPhysics2D();
    }
}

