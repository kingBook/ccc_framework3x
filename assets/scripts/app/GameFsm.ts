import { _decorator, Component, Node } from 'cc';
import { Fsm } from '../framework/runtime/objs/fsm/Fsm';
import { StateGameLevel } from './StateGameLevel';
import { StateGameTitle } from './StateGameTitle';

const { ccclass, property } = _decorator;

/** Game 的有限状态机 */
@ccclass('GameFsm')
export class GameFsm extends Fsm {
    
    protected start(): void {
        this.addState(StateGameTitle);
        this.addState(StateGameLevel);
        this.init();
        this.changeStateTo(StateGameTitle);
    }
}


