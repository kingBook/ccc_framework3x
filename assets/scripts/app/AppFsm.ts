import { _decorator, Component, Node } from 'cc';
import { Fsm } from '../framework/runtime/objs/fsm/Fsm';
import { Game } from './Game';

const { ccclass, property } = _decorator;

/** 整个 App 的有限状态机 */
@ccclass('AppFsm')
export class AppFsm extends Fsm {
    
    protected start(): void {
        this.addState(Game);
        this.init();
        this.changeStateTo(Game);
    }
}


