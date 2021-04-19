import React, { useEffect, useState } from "react";
import ForceGraph3D from '3d-force-graph';
import { useGetResource } from "../../viewmodel/hooks/getResource";
import { getGraphData } from "../../viewmodel/providers/getGraphData";
import Popup from "../components/NodePopup";
import Node from "../../model/node";
import Link from "../../model/link";

type GraphData = {
    nodes: Node[],
    links: Link[],
}

export default function Graph(): JSX.Element {
    const resource = useGetResource(getGraphData).data as GraphData;
    const myGraph = ForceGraph3D();
    const [focusedNodeId, setFocusedNodeId] = useState(1);
    console.log(resource);

    useEffect(() => {
        function focusNode(node: any) {
            // Aim at node from outside it
            const distance = 70;
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        
            myGraph.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                node, // lookAt ({ x, y, z })
                2000  // ms transition duration
            );
        
            setFocusedNodeId(node.id);
        }
        let element = document.getElementById("graph");
        if (element) {
            myGraph(element).graphData(resource)
                            .onNodeHover(node => {
                                if (element) element.style.cursor = node ? "pointer" : "auto"
                            })
                            .onNodeClick(focusNode);
        }
        // eslint-disable-next-line
    }, [resource]);
    
    return (
        <div>
            <div id="graph" />
            <div>
                <Popup nodeId={focusedNodeId} />
            </div>
        </div>
    );
}
