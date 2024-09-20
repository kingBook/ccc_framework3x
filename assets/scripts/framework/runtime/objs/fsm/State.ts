import { _decorator, Component } from 'cc';
import { Fsm } from "./Fsm";
import { IState } from "./IState";

const { ccclass, property } = _decorator;

/** 状态基类 */
@ccclass("State")
export abstract class State extends Component implements IState {

    public onStateEnter(fsm: Fsm): void {
    }

    public onStateUpdate(fsm: Fsm): void {
    }
    
    public onStateLateUpdate(fsm: Fsm): void {
    }
    
    public onStateExit(fsm: Fsm): void {
    }

}