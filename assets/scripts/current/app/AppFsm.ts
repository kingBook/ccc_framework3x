import { _decorator, Component, Node } from 'cc';
import { Fsm } from '../../framework/runtime/objs/fsm/Fsm';
import { Game } from '../game/Game';
const { ccclass, property } = _decorator;

@ccclass('AppFsm')
export class AppFsm extends Fsm {
    
    protected onLoad(): void {
        this.addState(Game);
        this.init();
        this.changeStateTo(Game);
    }
}


