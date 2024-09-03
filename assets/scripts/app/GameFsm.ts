import { _decorator, Component, Node } from 'cc';
import { Fsm } from '../framework/runtime/objs/fsm/Fsm';
import { StateGameLevel } from './StateGameLevel';
import { StateGameTitle } from './StateGameTitle';

const { ccclass, property } = _decorator;

@ccclass('GameFsm')
export class GameFsm extends Fsm {
    onLoad(): void {
        this.addState(StateGameTitle);
        this.addState(StateGameLevel);
        this.init();
        this.changeStateTo(StateGameTitle);
    }
}

