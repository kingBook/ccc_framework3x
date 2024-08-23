import { _decorator, AssetManager } from 'cc';
import { State } from '../../framework/runtime/objs/fsm/State';
import { GameGlobalVariables } from './GameGlobalVariables';
import { GameFsm } from './GameFsm';
import { NodeUtil } from '../../framework/runtime/utils/NodeUtil';
import { App } from '../app/App';
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends State {
    
    private _global: GameGlobalVariables;
    private _fsm: GameFsm;

    public get global(): GameGlobalVariables { return this._global; }
    public get fsm(): GameFsm { return this._fsm; }

    public onStateEnter(): void {
        this._global = NodeUtil.addNodeComponent(GameGlobalVariables, this.node);
        this._fsm = NodeUtil.addNodeComponent(GameFsm, this.node);
        
        App.instance.subpackageLoader.loadSubpackage("bundleLevel1",true,false, (error:Error,bundle:AssetManager.Bundle):void=>{
            App.instance.sceneLoader.load("bundleLevel1/level_1");
            
        });
    }
    

}