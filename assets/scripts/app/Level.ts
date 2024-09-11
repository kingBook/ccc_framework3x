import { _decorator, Component, Node } from 'cc';
import { LevelFsm } from './LevelFsm';
import { NodeUtil } from '../framework/runtime/utils/NodeUtil';
const { ccclass, property } = _decorator;

@ccclass('Level')
export class Level extends Component {

    private _fsm: LevelFsm;

    public get fsm(): LevelFsm { return this._fsm; }
    
    protected onLoad(): void {
        this._fsm = NodeUtil.addNodeComponent(LevelFsm, this.node);
    }

   
}


