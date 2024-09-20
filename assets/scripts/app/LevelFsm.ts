import { _decorator } from 'cc';
import { Fsm } from "../framework/runtime/objs/fsm/Fsm";
import { StateLevelFailure } from "./StateLevelFailure";
import { StateLevelRunning } from "./StateLevelRunning";
import { StateLevelStart } from "./StateLevelStart";
import { StateLevelVictory } from "./StateLevelVictory";

const { ccclass, property } = _decorator;

@ccclass('LevelFsm')
export class LevelFsm extends Fsm {

    protected start(): void {
        this.addState(StateLevelStart);
        this.addState(StateLevelRunning);
        this.addState(StateLevelVictory);
        this.addState(StateLevelFailure);
        this.init();

        this.changeStateTo(StateLevelStart);
    }

}