import { _decorator } from 'cc';
import { State } from "./State";

const { ccclass, property } = _decorator;

/** 默认状态（任意有限状态机默认进入的状态） */
@ccclass("StateDefault")
export class StateDefault extends State {


}