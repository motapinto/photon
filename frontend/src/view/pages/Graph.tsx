import React, { useEffect, useState } from "react";
import ForceGraph3D from "3d-force-graph";
import { useGetResource } from "../../viewmodel/hooks/getResource";
import { getGraphData } from "../../viewmodel/providers/getGraphData";
import Popup from "../components/NodePopup";
import Node from "../../model/node";
import Link from "../../model/link";
import MainScreen from "./templates/MainScreen";
import FilteringMenu from "../components/FilteringMenu";

type GraphData = {
    nodes: Node[],
    links: Link[],
}

export default function Graph(): JSX.Element {
    const resource = useGetResource(getGraphData).data as GraphData;
    const myGraph = ForceGraph3D();
    const [focusedNode, setFocusedNode] = useState(undefined);

    useEffect(() => {
        function focusNode(node: any) {
            // Display popup
            const popup = document.getElementById("popup");
            if (popup) popup.setAttribute("style", "display: block");

            // Aim at node from outside it
            const distance = 170;
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        
            myGraph.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                node, // lookAt ({ x, y, z })
                2000  // ms transition duration
            );
        
            setFocusedNode(node);
        }
        function defocusNode() {
            setFocusedNode(undefined);
        }
        let element = document.getElementById("graph");
        if (element) {
            myGraph(element).onNodeHover((node: any) => {
                                if (element) element.style.cursor = node ? "pointer" : "auto"
                            })
                            .onNodeClick(focusNode)
                            .nodeAutoColorBy("label")
                            .onBackgroundClick(defocusNode)
                            .graphData(resource);
            // @ts-ignore
            myGraph.d3Force('link')?.distance(200);
        }
        // eslint-disable-next-line
    }, [resource]);

    const popup = focusedNode === undefined ? (
        <div />
    ) :
    (
        <div>
            <Popup node={focusedNode} />
        </div>
    );
    
    return (
        <MainScreen>
            <FilteringMenu />
            <div id="graph" />
            {popup}
        </MainScreen>
    );
}
