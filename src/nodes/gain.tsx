import { Handle, type NodeProps, type Node as RFNode, Position } from "@xyflow/react";
import { type NodeData } from "./osc";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import { type Store } from "../store";
import type React from "react";
const selector = (id: string) => (store: Store) => ({
    setGain: (e: React.ChangeEvent<HTMLInputElement>) => store.updateNode(id, { gain: +e.target.value }),
});



export default function Gain({ id, data }: NodeProps<RFNode<NodeData>>) {
    const store = useStore(selector(id), shallow);
    return (
        <div className="bg-red-500 rounded-lg p-4">
            <p className="text-center text-white font-semibold mb-2">Gain Node</p>

            <label className= "flex display-center gap-4">
                <span className="font-semibold">Gain</span>
                <input
                    className="nodrag"
                    type="range"
                    min="0"
                    max="100"
                    value={data.gain}
                    readOnly
                    onChange={store.setGain}
                />

                <span className="font-semibold">{data.gain}%</span>
            </label>
            <Handle type = "source" position={Position.Bottom}/>
            <Handle type = "target" position={Position.Top}/>
        </div>
    );
}