import React, { useEffect, useState } from "react";
import Resource from "../../model/resource";

async function getResourceAndUpdate<T>(
    getResource: () => Promise<T>,
    setState: React.Dispatch<React.SetStateAction<Resource<T>>>,
): Promise<void> {
    try {
        const resource = await getResource();
        setState(new Resource(resource));
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`An error has occurred: ${err.message}`);
        setState(new Resource<T>(undefined, true));
    }
}

export function useGetResource<T>(getResource: () => Promise<T>, dependencies: any[]): Resource<T> {
    const promise = new Resource<T>();
    const [state, setState] = useState(promise);
    
    useEffect(() => {
        console.log("Backend");
        getResourceAndUpdate(getResource, setState);
        // eslint-disable-next-line
    }, dependencies);
    return state;
}
