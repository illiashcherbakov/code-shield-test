import React, {useState, useEffect} from 'react';
import './App.css';
import graphJson from './graph.json';
import ReactFlow from 'react-flow-renderer';
import {firestore} from './firebase';
import AddCommentModal from "./components/AddCommentModal";
import CustomNodeComponent from "./components/CustomNodeComponent";

const nodeTypes = {
    special: CustomNodeComponent,
};

type Comment = {
    id: string,
    msg: string
}
type ElementNode = {
    id: string,
    type: string,
    position: {x: number, y: number},
    data: object
}
type ElementLink = {
    id: string,
    label: string,
    source: string,
    target: string
}

function App() {
    const [comments, setComments] = useState<[Comment] | any[]>([]);
    const [commentedNodeId, setCommentedNodeId] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [elements, setElements] = useState<[ElementNode|ElementLink] | any[]>([]);

    const getComments = async () => {
        const res = await firestore.collection('comments').get();
        const comments = res.docs.map(doc => doc.data());
        setComments(comments as [Comment]);
    }
    const addComments = async (msg: string) => {
        await firestore.collection('comments').add({
            id: commentedNodeId,
            msg: msg
        });
        getComments();
        setModalOpen(false);
    }
    const openModal = (nodeId: string) => () => {
        setCommentedNodeId(nodeId);
        setModalOpen(true);
    }

    useEffect(() => {
        getComments();
    }, [])

    useEffect(() => {
        const step = 200;
        const elms: [ElementNode|ElementLink] | any[] = [...graphJson.nodes.map((node, i) => {
            const correspondingComments = comments.filter(c => c.id === node.id);
            return {
                id: node.id,
                type: 'special',
                position: {x: 100 + (step * i), y: i % 2 ? 200 : 10},
                data: {...node, comments: correspondingComments, openModal: openModal(node.id)},
            }
        }), ...graphJson.links.map(link => ({
            id: link.id,
            label: link.referenceType,
            source: link.source,
            target: link.target
        }))]

        setElements(elms);
    }, [comments])

    return (
        <div className="App">
            <AddCommentModal closeModal={() => setModalOpen(false)} isModalOpen={isModalOpen} onSubmit={addComments} />
            <div style={{height: 900}}>
                <ReactFlow elements={elements} nodeTypes={nodeTypes}/>
            </div>

        </div>
    );
}

export default App;
