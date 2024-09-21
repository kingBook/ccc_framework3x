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

    public static getComponentInParent<T extends Component>(node: Node, componentType: new () => T): T | null {
        let result = null;
        let parent = node;
        while (parent) {
            result = parent.getComponent(componentType);
            if (result) break;
            parent = parent.parent;
        }
        return result;
    }

    public static getComponentsInParent<T extends Component>(node: Node, componentType: new () => T): T[] {
        let result = new Array<T>();
        let parent = node;
        while (parent) {
            let comps = parent.getComponents(componentType) as T[];
            if (comps) {
                result = result.concat(comps);
            }
            parent = parent.parent;
        }
        return result;
    }
}


