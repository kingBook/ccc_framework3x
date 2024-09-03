import { _decorator, Component, Node } from 'cc';
import { Fsm } from '../framework/runtime/objs/fsm/Fsm';
import { State } from '../framework/runtime/objs/fsm/State';

const { ccclass, property } = _decorator;

@ccclass('StateGameLevel')
export class StateGameLevel extends State {
    
    public onStateEnter(fsm: Fsm): void {
        console.log("StateGameLevel::onStateEnter();");
        
    }
}