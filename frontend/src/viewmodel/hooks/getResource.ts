import React, { useEffect, useState } from "react";
import Resource from "../../model/resource";

async function getResourceAndUpdate<T>(
    getResource: () => Promise<T>,
    setState: React.Dispatch<React.SetStateAction<Resource<T>>>,
): Promise<void> {
    try {
        const resource = await getResource();
        setState(new Resource(resource));
    } catch (reason) {
        // eslint-disable-next-line no-console
        console.error(`An error has occurred: ${reason}`);
        setState(new Resource<T>(undefined, true));
    }
}

export function useGetResource<T>(getResource: () => Promise<T>): Resource<T> {
    const promise = new Resource<T>();
    const [state, setState] = useState(promise);
    useEffect(() => {
        getResourceAndUpdate(getResource, setState);
    }, [getResource]);
    return state;
}
