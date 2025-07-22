import type { NodeProps, Node as RFNode } from "@xyflow/react";
import { type NodeData } from "./osc";
import { useStore, type Store } from "../store";
import { shallow } from 'zustand/shallow';
const selector = (id: string) => (store: Store) => ({
    tooglePlay: (e: React.ChangeEvent<HTMLInputElement>) => store.updateNode(id, { play: e.target.checked })
});
export default function Play({ id, data }: NodeProps<RFNode<NodeData>>) {
    const store = useStore(selector(id), shallow);
    return (
        <div>
            <p>Play Node</p>
            <label>
                <input type="checkbox" checked={data.play} onChange={store.tooglePlay}></input>
            </label>

        </div>
    );
}