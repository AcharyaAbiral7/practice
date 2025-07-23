import { Handle, Position, type NodeProps, type Node as RFNode } from "@xyflow/react";
import { type NodeData } from "./osc";
import { usePlay } from "../hooks";

export default function Play({ id, data }: NodeProps<RFNode<NodeData>>) {
    const {togglePlayButton} = usePlay(id);
    return (
        <div className="bg-blue-500 rounded-lg p-4">
            <p className="text-center text-white font-semibold mb-2">Play Node</p>
            <label className="flex justify-center">
                <input type="checkbox" checked={data.play} onChange={togglePlayButton()}></input>
            </label>
            <Handle type="target" position={Position.Top}/>

        </div>
    );
}