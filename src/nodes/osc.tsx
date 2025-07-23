import { type NodeProps, type Node as RFNode, Handle, Position } from "@xyflow/react"
import { shallow } from 'zustand/shallow';
import { useStore, type Store } from '../store';

const selector = (id: string) => (store: Store) => ({
    setFrequency: (e: React.ChangeEvent<HTMLInputElement>) => store.updateNode(id, { frequency: +e.target.value }),
    setType: (e: React.ChangeEvent<HTMLSelectElement>) => store.updateNode(id, { type: e.target.value as NodeData['type'] })
});

export type NodeData = {
    frequency: number;
    type: 'sine' | 'square' | 'traingular' | 'sawtooth';
    label: string;
    gain: number;
    play: boolean;
}

export default function Osc({ id, data }: NodeProps<RFNode<NodeData>>) {
    const store = useStore(selector(id), shallow);
    return (
        <div className = "bg-green-400 rounded-lg p-4">
            <div>
                <p className="text-center text-white font-semibold mb-2">Oscillator Node</p>

                <label className = "flex display-center gap-4">
                    <span className="font-semibold">Frequency</span>
                    <input
                        className="nodrag"
                        type="range"
                        min="10"
                        max="1000"
                        value={data.frequency}
                        readOnly
                        onChange={store.setFrequency}
                        />

                    <span className="font-semibold">{data.frequency}Hz</span>
                </label>

                <label className="flex justify-center gap-4 mt-2">
                    <span className="font-semibold">Waveform</span>
                    <select className="nodrag font-semibold border rounded-lg" value={data.type} onChange={store.setType}>
                        <option value="sine">sine</option>
                        <option value="triangle">triangle</option>
                        <option value="sawtooth">sawtooth</option>
                        <option value="square">square</option>
                    </select>
                </label>
            </div>

            <Handle type="source" position={Position.Bottom} />
        </div>

    );
}