import { _decorator, log } from 'cc';
import { BaseGame } from "../framework/core/BaseGame";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends BaseGame {

    protected onLoad(): void {
        //log(cc["EventListener"]);
    }

    protected start(): void {

    }

}