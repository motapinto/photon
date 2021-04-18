import React, { useEffect, useState } from "react";
import ForceGraph3D from '3d-force-graph';
import { useGetResource } from "../../viewmodel/hooks/getResource";
import { getGraphData } from "../../viewmodel/providers/getGraphData";

type GraphData = {
    nodes: [],
    links: [],
}

export default function Graph(): JSX.Element {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setIsRendered(!isRendered);
    }, [isRendered]);

    let myGraph = ForceGraph3D();
    let element = document.getElementById("graph");
    console.log(useGetResource(getGraphData).data?.nodes);
    const resource = useGetResource(getGraphData).data as GraphData;
    if (element != null) 
        myGraph(element).graphData(resource);

    return (
        <div id="graph">
            This is the graph page.
        </div>
    );
}
