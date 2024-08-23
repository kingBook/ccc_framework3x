import { Fsm } from "./Fsm";

export interface IState {

    onStateEnter(fsm: Fsm): void;

    onStateUpdate(fsm: Fsm): void;

    onStateLateUpdate(fsm: Fsm): void;

    onStateExit(fsm: Fsm): void;
}