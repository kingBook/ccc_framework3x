import { _decorator, AssetManager } from "cc";
import { State } from "../framework/runtime/objs/fsm/State";
import { NodeUtil } from "../framework/runtime/utils/NodeUtil";
import { App } from "./App";
import { GameFsm } from "./GameFsm";
import { Fsm } from "../framework/runtime/objs/fsm/Fsm";

const { ccclass, property } = _decorator;

/** 游戏类 (整个应用多个游戏中的一个, 该类为 AppFsm 的一个状态) */
@ccclass("Game")
export class Game extends State {

    private static s_instance: Game;
    private _fsm: GameFsm;

    public static get instance(): Game { return Game.s_instance; }
    public get fsm(): GameFsm { return this._fsm; }

    public onStateEnter(fsm: Fsm): void {
        Game.s_instance = this;
        this._fsm = NodeUtil.addNodeComponent(GameFsm, this.node);

        App.instance.subpackageLoader.loadSubpackage("level1", true, (error: Error, bundle: AssetManager.Bundle): void => {
            App.instance.sceneLoader.load("level1/level_1");

        });
    }

    public onStateExit(fsm: Fsm): void {
        Game.s_instance = null;
    }


}