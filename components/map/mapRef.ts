import maplibregl from "maplibre-gl";

let map: maplibregl.Map | null = null;

export const setMap = (instance: maplibregl.Map) => {
    map = instance;
};

export const getMap = () => map;
