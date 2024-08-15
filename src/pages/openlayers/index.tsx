import { useEffect, useState } from "react";
import "./index.css";
import "ol/ol.css";
import * as ol from "ol";
import OSM from "ol/source/OSM.js";
import XYZ from "ol/source/XYZ.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import * as Control from "ol/control.js";
import { useDrawMarker, useDrawTile, useControl } from "./hooks";
import { Button, Radio } from "antd";
import { fromLonLat, get } from "ol/proj";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
const CustomOverlayContent = ({ text }: { text: string }) => {
  return (
    <div
      className="custom-overlay-content"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "10px",
        borderRadius: "4px",
      }}
    >
      <p>{text}</p>
      <Button type="primary" id="custom-overlay-close">
        关闭
      </Button>
    </div>
  );
};
export default function OpenLayersMapFunction() {
  // 天地图key
  const tk = "48446eb90e1456090be86f44197cfffe";
  const layerTypeMap = {
    vector: ["vec", "cva"], // [矢量底图, 矢量注记]
    image: ["img", "cia"], // [影像底图, 影像注记]
    terrain: ["ter", "cta"], // [地形晕渲, 地形注记]
  };

  const getOverlayElemment = (text: string) => {
    const element = document.createElement("div");
    const root = createRoot(element);
    root.render(<CustomOverlayContent text={text} />);
    return element;
  };

  const [currentLayerType, setCurrentLayerType] =
    useState<keyof typeof layerTypeMap>("vector"); // 默认底图类型

  // 加载天地图
  useEffect(() => {
    if (map) useDrawTile(map, currentLayerType);
    return () => {};
  }, [currentLayerType]);
  const [map, setMap] = useState<ol.Map | null>(null);
  useEffect(() => {
    const map = new Map({
      // layers: [底图, 标注], // 直接在配置上加载
      target: "openLayers", // 地图容器
      view: new View({
        projection: get("EPSG:4326")!, //使用这个坐标系
        center: [104.912777, 34.730746], //地图中心坐标
        zoom: 6, // 默认缩放比例
        minZoom: 2, // 缩放最小级别 2
        maxZoom: 20, // 缩放最大级别 20
      }),
      //加载控件到地图容器中
      controls: Control.defaults({
        //地图中默认控件
        /* @type {ol.control.Attribution} */
        attributionOptions: {
          //地图数据源信息控件是否可收缩,默认为true
          collapsible: true,
        },
      }).extend([useControl().mousePositionControl]), //加载鼠标位置控件
    });
    useDrawTile(map, currentLayerType);
    // 监听鼠标移动事件，鼠标移动到feature区域时变为手形
    map.on("pointermove", function (e) {
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.hasFeatureAtPixel(pixel);
      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });
    const markerOverlay = new ol.Overlay({
      element: getOverlayElemment("Hello World"),
      //当前窗口可见
      autoPan: true,
      //Popup放置的位置
      positioning: "bottom-center",
      //是否应该停止事件传播到地图窗口
      stopEvent: false,
    });
    map.addOverlay(markerOverlay);
    map.on("click", function (evt) {
      //判断当前单击处是否有要素，捕获到要素时弹出popup
      var feature = map.forEachFeatureAtPixel(
        evt.pixel,
        function (feature, layer) {
          return feature;
        }
      );
      if (feature) {
        console.log("click feature", feature);
        if (markerOverlay.getPosition() == undefined) {
          //设置popup的位置
          // content.innerHTML = name;
          // @ts-ignore
          let getGeometry = feature.getGeometry()!.flatCoordinates as [
            number,
            number
          ];
          markerOverlay.setPosition(getGeometry);
          const closer = document.getElementById("custom-overlay-close")!;
          closer.onclick = function () {
            //未定义popup位置
            markerOverlay.setPosition(undefined);
            //失去焦点
            closer.blur();
            return false;
          };
        }
      }
    });

    setMap(map);
  }, []);

  // 创建图层
  const { drawMarker, clearMarker } = useDrawMarker();

  return (
    <div className="map-container">
      <div className="map-utils">
        {/* 底图 */}
        <Radio.Group
          size="small"
          buttonStyle="solid"
          value={currentLayerType}
          onChange={(e) => setCurrentLayerType(e.target.value)}
          style={{ margin: "10px 0" }}
        >
          <Radio.Button value="vector">矢量</Radio.Button>
          <Radio.Button value="image">影像</Radio.Button>
          <Radio.Button value="terrain">地形</Radio.Button>
        </Radio.Group>
        {/* marker */}
        <Radio.Group buttonStyle="solid" size="small" value={null}>
          <Radio.Button
            onClick={() => {
              drawMarker(map!, setMap);
            }}
          >
            点
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              clearMarker(map!, setMap);
            }}
          >
            clear
          </Radio.Button>
        </Radio.Group>
      </div>
      <div id="openLayers">
        <div id="mouse-position"></div>
      </div>
    </div>
  );
}
