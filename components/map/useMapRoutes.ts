import { useEffect } from "react";
import { getMap } from "./mapRef";

export function useMapRoutes(routes) {
  useEffect(() => {
    const map = getMap();
    if (!map) return;

    if (!map.getSource("routes")) {
      map.addSource("routes", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: routes,
        },
      });

      map.addLayer({
        id: "routes-layer",
        type: "line",
        source: "routes",
        paint: {
          "line-color": "#ff0000",
          "line-width": 3,
        },
      });
    } else {
      const source = map.getSource("routes");
      source?.setData({
        type: "FeatureCollection",
        features: routes,
      });
    }
  }, [routes]);
}
