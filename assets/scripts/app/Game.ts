import { _decorator, AssetManager } from "cc";
import { State } from "../framework/runtime/objs/fsm/State";
import { NodeUtil } from "../framework/runtime/utils/NodeUtil";
import { App } from "./App";
import { GameFsm } from "./GameFsm";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends State {
    
    private _fsm: GameFsm;

    public get fsm(): GameFsm { return this._fsm; }

    public onStateEnter(): void {
        this._fsm = NodeUtil.addNodeComponent(GameFsm, this.node);
        
        App.instance.subpackageLoader.loadSubpackage("bundleLevel1",true,false, (error:Error,bundle:AssetManager.Bundle):void=>{
            App.instance.sceneLoader.load("bundleLevel1/level_1");
            
        });
    }
    

}