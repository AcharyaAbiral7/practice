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
    gain: number;
    play: boolean;
}

export default function Osc({ id, data }: NodeProps<RFNode<NodeData>>) {
    const store = useStore(selector(id), shallow);
    return (
        <div>
            <div>
                <p>Oscillator Node</p>

                <label>
                    <span>Frequency</span>
                    <input
                        className="nodrag"
                        type="range"
                        min="10"
                        max="1000"
                        value={data.frequency}
                        readOnly
                        onChange={store.setFrequency}
                    />

                    <span>{data.frequency}Hz</span>
                </label>

                <label>
                    <span>Waveform</span>
                    <select className="nodrag" value={data.type} onChange={store.setType}>
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