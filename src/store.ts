import {
    type Node as RFNode, type Edge, type OnEdgesChange, type OnNodesChange,
    type Connection, applyNodeChanges, applyEdgeChanges
} from "@xyflow/react"
import { createWithEqualityFn } from 'zustand/traditional';
import { nanoid }
    from 'nanoid';
import {type NodeData } from "./nodes/osc";
import { connect, disconnect, removeAudioNode, updateAudioNode } from "./audio";
export type Store = {
    nodes: RFNode[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addEdge:
    (connection: Connection) => void;
    updateNode: (id: string, data: Partial<NodeData>) => void;
    removeNodes: (nodes:Array<RFNode>)=>void;
    removeEdges: (edges:Array<Edge>)=>void;
};

export const useStore = createWithEqualityFn<Store>((set, get) => (
    {
        // nodes: [],
        nodes: [
            { id: 'a', data: { label: 'oscillator', type: 'sine', frequency: 500 }, type: 'oscillator', position: { x: 0, y: 0 } },
            { id: 'b', data: { label: 'gain', gain:50 }, type:'gain', position: { x: 50, y: 50 } },
            {
                id: 'c',
                data: { label: 'output', play:false }, type:'play', position: { x: -50, y: 100 }
            }
        ],
        edges: [],
        onNodesChange(changes) {
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        onEdgesChange(changes) {
            set({
                edges: applyEdgeChanges(changes,
                    get().edges),
            });
        },
        addEdge(connection) {
            const id = nanoid(6);
            connect(connection.source, connection.target);
            const
                edge: Edge = { id, ...connection };
            set({
                edges: [edge, ...get().edges]
            });
        },
        updateNode(id, data) {
            updateAudioNode(id, data);
            set({
                nodes: get().nodes.map(
                    node => node.id === id ? 
                    { ...node, data: { ...node.data, ...data } } : node)
            });
        },
        removeNodes(nodes) {
            for (const {id} of nodes) {
                removeAudioNode(id);        
            }
        },
        removeEdges(edges) {
            for(const edge of edges) {
                disconnect(edge.source, edge.target);
            }
        }

    }
))