
import { _decorator } from 'cc';
import { Fsm } from '../framework/runtime/objs/fsm/Fsm';
import { State } from '../framework/runtime/objs/fsm/State';
import { StateLevelRunning } from './StateLevelRunning';
import { LevelFsm } from './LevelFsm';
const { ccclass, property } = _decorator;

@ccclass('StateLevelStart')
export class StateLevelStart extends State {

    private _fsm: LevelFsm;

    public onStateEnter(fsm: Fsm): void {
        this._fsm = <LevelFsm>fsm;


        this._fsm.changeStateTo(StateLevelRunning);
    }

    public onStateExit(fsm: Fsm): void {

    }

}