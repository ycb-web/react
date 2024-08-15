import React, { useEffect, useState } from "react";
import { FC } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
export const LeafletFC: FC = () => {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([51.505, -0.09]).addTo(map);
    marker.bindPopup("A pretty CSS3 popup.<br>Easily customizable.");

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
};
export default LeafletFC;
