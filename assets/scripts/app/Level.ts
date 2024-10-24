import { _decorator, Component, Node } from 'cc';
import { LevelFsm } from './LevelFsm';
import { NodeUtil } from '../framework/runtime/utils/NodeUtil';
const { ccclass, property } = _decorator;

@ccclass('Level')
export class Level extends Component {

    private static s_instance: Level;
    private _fsm: LevelFsm;
    
    public static get instance(): Level { return Level.s_instance }
    public get fsm(): LevelFsm { return this._fsm; }
    
    protected onLoad(): void {
        Level.s_instance = this;
        this._fsm = NodeUtil.addNodeComponent(LevelFsm, this.node);
    }
    
    protected onDestroy(): void {
        Level.s_instance = null;
    }

   
}


