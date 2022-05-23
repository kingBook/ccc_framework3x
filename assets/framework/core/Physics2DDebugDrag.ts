import { _decorator, Component, Node } from 'cc';
import BaseBehaviour from './BaseBehaviour';
const { ccclass, property } = _decorator;

@ccclass('Physics2DDebugDrag')
export class Physics2DDebugDrag extends BaseBehaviour {
    
    protected start():void{
        super.start();
    }
}

