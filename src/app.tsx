import React from 'react';
import { ReactFlow, Background } from '@xyflow/react';
import { useStore, type Store } from './store';
import { shallow } from 'zustand/shallow';
import Osc from './nodes/osc';
import Gain from './nodes/gain';
import Play from './nodes/play';


const selector = (store: Store) => ({
    nodes: store.nodes,
    edges: store.edges,
    onNodesChange: store.onNodesChange,
    onEdgesChange: store.onEdgesChange,
    addEdge: store.addEdge,
    removeNodes: store.removeNodes 
});

const nodeTypes = {
    oscillator: Osc,
    gain: Gain,
    play: Play
}

export default function App() {
    const store = useStore(selector, shallow);
    return (
        <ReactFlow
            nodes={store.nodes}
            edges={store.edges}
            nodeTypes={nodeTypes}
            onNodesChange={store.onNodesChange}
            onEdgesChange={store.onEdgesChange}
            onNodesDelete={store.removeNodes}
            onConnect={store.addEdge}
            defaultViewport={{ x: window.innerWidth / 2, y: window.innerHeight / 2, zoom: 1 }}
        >
            <Background />
        </ReactFlow>
    );
}
