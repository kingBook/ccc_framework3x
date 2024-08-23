import { _decorator, log, view } from 'cc';
import { BaseGame } from '../../framework/runtime/core/BaseGame';
import { State } from '../../framework/runtime/objs/fsm/State';
import { Fsm } from '../../framework/runtime/objs/fsm/Fsm';
import { GameGlobalVariables } from './GameGlobalVariables';
import { GameFsm } from './GameFsm';
import { NodeUtil } from '../../framework/runtime/utils/NodeUtil';
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends State {
    
    private _global!: GameGlobalVariables;
    private _fsm!: GameFsm;

    public get global(): GameGlobalVariables { return this._global; }
    public get fsm(): GameFsm { return this._fsm; }

    public onStateEnter(): void {
        this._global = NodeUtil.addNodeComponent(GameGlobalVariables, this.node);
        this._fsm = NodeUtil.addNodeComponent(GameFsm, this.node);
        
    }
    

}