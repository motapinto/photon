import React, { useEffect } from "react";
import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { useGetResource } from "../../viewmodel/hooks/getResource";
import { getGraphData } from "../../viewmodel/providers/getGraphData";

type GraphData = {
    nodes: [],
    links: [],
}
let myGraph: ForceGraph3DInstance;

function focusNode(node: any) {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

    myGraph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000  // ms transition duration
    );
}

export default function Graph(): JSX.Element {
    const resource = useGetResource(getGraphData).data as GraphData;
    myGraph = ForceGraph3D();

    useEffect(() => {
        let element = document.getElementById("graph");
        if (element) {
            myGraph(element).graphData(resource)
                            .onNodeHover(node => {
                                if (element) element.style.cursor = node ? "pointer" : "auto"
                            })
                            .onNodeClick(focusNode);
        }
    }, [resource]);

    return (
        <div id="graph">
            This is the graph page.
        </div>
    );
}
