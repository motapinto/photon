import React, { useEffect } from "react";
import ForceGraph3D from '3d-force-graph';
import { useGetResource } from "../../viewmodel/hooks/getResource";
import { getGraphData } from "../../viewmodel/providers/getGraphData";

type GraphData = {
    nodes: [],
    links: [],
}

export default function Graph(): JSX.Element {
    const resource = useGetResource(getGraphData).data as GraphData;

    useEffect(() => {
        const myGraph = ForceGraph3D();
        let element = document.getElementById("graph");
        if (element != null) 
            myGraph(element).graphData(resource);
    }, [resource]);

    return (
        <div id="graph">
            This is the graph page.
        </div>
    );
}
