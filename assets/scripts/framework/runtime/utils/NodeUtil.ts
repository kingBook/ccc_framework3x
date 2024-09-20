import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/** 节点工具类 */
//@ccclass('NodeUtil')
export class NodeUtil extends Component {
    
    /**
     * 在 bind 节点下创建一个新的节点，并挂载 t 组件
     * @param t 挂载的组件
     * @param bind 将在此节点下创建一个新的节点，并挂载 t 组件
     * @returns 
     */
    public static addNodeComponent<T extends Component>(t: new () => T, bind: Node): T {
        let node = new Node();
        node.name = t.prototype.constructor.name;
        bind.addChild(node);
        let comp = node.addComponent(t);
        return comp;
    }
}


