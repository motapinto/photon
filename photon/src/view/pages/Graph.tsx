import React, { useEffect } from "react";
import ForceGraph3D from '3d-force-graph';
import { useGetResource } from "../../viewmodel/hooks/getResource";
import { getGraphData } from "../../viewmodel/providers/getGraphData";

export default function Graph(): JSX.Element {
    useEffect(() => {
        let myGraph = ForceGraph3D();
        let element = document.getElementById("graph");
        //const resource = useGetResource(getGraphData);
        const initData = {
            nodes: [ {id: 0 } ],
            links: []
        };
        console.log(element);
        if (element != null) 
            myGraph(element).graphData(initData);
    });

    return (
        <div id="graph">
            This is the graph page.
        </div>
    );
}
