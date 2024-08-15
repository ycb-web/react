import Style from "ol/style/Style.js";
import Circle from "ol/style/Circle.js";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Point from "ol/geom/Point.js";
import * as olSource from "ol/source";
import VectorLayer from "ol/layer/Vector.js";

import * as ol from "ol";
import { set } from "ol/transform";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { get } from "ol/proj";
import MousePosition from "ol/control/MousePosition.js";
import { createStringXY } from "ol/coordinate.js";
const tk = "48446eb90e1456090be86f44197cfffe";
const layerTypeMap = {
  vector: ["vec", "cva"], // [矢量底图, 矢量注记]
  image: ["img", "cia"], // [影像底图, 影像注记]
  terrain: ["ter", "cta"], // [地形晕渲, 地形注记]
};
const findLayerById = (map: ol.Map, id: string) => {
  return map
    .getLayers()
    .getArray()
    .find((layer) => layer.get("id") === id);
};
export const useDrawTile = (
  map: ol.Map,
  currentLayerType: keyof typeof layerTypeMap
) => {
  const 天地图_底图 =
    `http://t0.tianditu.gov.cn/${layerTypeMap[currentLayerType][0]}_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${layerTypeMap[currentLayerType][0]}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=` +
    tk;
  const 天地图_标注 =
    `http://t0.tianditu.gov.cn/${layerTypeMap[currentLayerType][1]}_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${layerTypeMap[currentLayerType][1]}&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=` +
    tk;
  const 底图 = new TileLayer({
    source: new XYZ({
      url: 天地图_底图,
      projection: get("EPSG:4326")!,
      wrapX: true,
    }),
  });
  底图.set("id", "底图");
  const 标注 = new TileLayer({
    source: new XYZ({
      url: 天地图_标注,
      projection: get("EPSG:4326")!,
      wrapX: true,
    }),
  });
  标注.set("id", "标注");

  // 清除原有底图和标注
  const 底图layer = findLayerById(map, "底图");
  if (底图layer) {
    console.log("removeLayer", "底图layer", 底图layer);
    map.removeLayer(底图layer);
  }
  const 标注layer = findLayerById(map, "标注");
  if (标注layer) {
    console.log("removeLayer", "标注layer", 标注layer);
    map.removeLayer(标注layer);
  }

  // map.getLayers().insertAt(0, 底图);
  // map.getLayers().insertAt(1, 标注);

  map.addLayer(底图);
  map.addLayer(标注);
  console.log("getLayers", map.getLayers());
};

export const useDrawMarker = () => {
  /* 1、构建要素  =geometry+style+attr */
  /* .在编程语言中就读 的 */
  const point = new ol.Feature({
    name: "marker",
    geometry: new Point([104.912777, 34.730746]),
  });
  point.setId(1000);
  let style = new Style({
    //形状
    image: new Circle({
      /* radius 设置半径 */
      radius: 30,
      fill: new Fill({
        color: "#ffcc33",
      }),
      stroke: new Stroke({
        color: "#333",
        width: 5,
      }),
    }),
  });
  point.setStyle(style);
  console.log(point);
  /* 2、将要素添加到source */
  let source = new olSource.Vector({
    features: [point],
  });
  // console.log(source)  addFeature  addFeatures
  /* 3、将source设置layer */
  let layer = new VectorLayer({
    source,
  });
  layer.set("id", "marker");
  return {
    drawMarker: (
      map: ol.Map,
      setMap: React.Dispatch<React.SetStateAction<ol.Map | null>>
    ) => {
      if (!findLayerById(map, "marker")) {
        /* 4、将layer添加map */
        map.addLayer(layer);
        setMap(map);
        console.log("map", map);
      }
    },
    clearMarker: (
      map: ol.Map,
      setMap: React.Dispatch<React.SetStateAction<ol.Map | null>>
    ) => {
      map.removeLayer(layer);
      setMap(map);
      console.log("map", map);
    },
  };
};

export const useControl = () => {
  var mousePositionControl = new MousePosition({
    //坐标格式
    coordinateFormat: (coordinate: any) => {
      return `lat: ${coordinate[1].toFixed(2)}°, lng: ${coordinate[0].toFixed(
        2
      )}°`;
    },
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: get("EPSG:4326")!,
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: "custom-mouse-position",
    //显示鼠标位置信息的目标容器
    target: document.getElementById("mouse-position")!,
  });
  return { mousePositionControl };
};
