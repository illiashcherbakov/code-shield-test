import {Handle, Position} from "react-flow-renderer";
import React from "react";

const customNodeStyles = {
    position: 'relative',
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
    width: 200
};
const commentsStyles = {
    marginBottom: '10px',
    background: '#FFFFFF',
    color: '#000000',
}
const commentItemStyles = {
    borderBottom: '1px solid black'
}
const nodeLabelStyles = {
    marginBottom: '10px'
}
const addCommentStyles = {
    cursor: 'pointer'
}

const CustomNodeComponent:React.FC = ({data}: any) => {
    return (
        <>
            {/*// @ts-ignore*/}
            <div style={customNodeStyles}>
                <Handle type="target" position={Position.Left} style={{borderRadius: 0}}/>
                <div style={nodeLabelStyles}>{`${data.logicalId} - ${data.resourceType}`}</div>
                <div style={commentsStyles}>
                    {data.comments && data.comments.map(c => (<div key={c.msg} style={commentItemStyles}>{c.msg}</div>))}
                </div>
                <div style={addCommentStyles} onClick={data.openModal}>Add a Comment</div>

                <Handle
                    type="source"
                    position={Position.Right}
                    id="a"
                    style={{top: '50%', borderRadius: 0}}
                />
            </div>
        </>
    );
};

export default CustomNodeComponent;