import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

//@ccclass('NodeUtil')
export class NodeUtil extends Component {
    
    public static addNodeComponent<T extends Component>(t: new () => T, bind: Node): T {
        let node = new Node();
        node.name = t.prototype.constructor.name;
        bind.addChild(node);
        let comp = node.addComponent(t);
        return comp;
    }
}


