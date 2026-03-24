import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";
import Select from "ol/interaction/Select";
import type { SelectEvent } from "ol/interaction/Select";
import { click } from "ol/events/condition";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import SimpleGeometry from "ol/geom/SimpleGeometry";
import chroma from "chroma-js";
import type { KantonFeatureCollection } from "../../types.ts";
import Feature from "ol/Feature";

interface OpenlayersMapProps {
  featureCollection: KantonFeatureCollection;
  selectedFeatureID: number | undefined;
  setSelectedFeatureID: (id: number | undefined) => void;
}

function OpenlayersMap({
  featureCollection,
  selectedFeatureID,
  setSelectedFeatureID,
}: OpenlayersMapProps) {
  // set intial state
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments -- default uses `any`; explicit Feature provides stricter typing
  const featureLayerRef = useRef<VectorLayer<VectorSource<Feature>>>(null);
  const selectInteractionRef = useRef<Select>(null);

  // create state ref that can be accessed in callbacks
  const mapRef = useRef<Map>(null);

  // initialize map on first render
  useEffect(() => {
    // if map already initialised, exit function
    if (mapRef.current) return;
    // load data and add styles for features
    const maxFlaeche = Math.max(
      ...featureCollection.features.map((f) => f.properties.kantonsflaeche),
    );
    const minFlaeche = Math.min(
      ...featureCollection.features.map((f) => f.properties.kantonsflaeche),
    );
    const colourScale = chroma.scale("Blues").domain([minFlaeche, maxFlaeche]);
    const geoJson = new GeoJSON();
    const kantone = geoJson.readFeatures(featureCollection, { featureProjection: "EPSG:3857" });
    kantone.forEach((f) => {
      f.setStyle(
        new Style({
          fill: new Fill({ color: colourScale(Number(f.get("kantonsflaeche"))).hex() }),
          stroke: new Stroke({ color: "lightgrey", width: 0.2 }),
        }),
      );
    });

    const initFeatureLayer = new VectorLayer({ source: new VectorSource({ features: kantone }) });
    featureLayerRef.current = initFeatureLayer;
    mapRef.current = new Map({
      target: "openlayers-container",
      layers: [initFeatureLayer],
      view: new View({
        projection: "EPSG:3857",
        center: [0, 0],
        zoom: 4,
        extent: [600_000, 5_650_000, 1_200_000, 6_150_000],
      }),
    });
    // zoom to data
    const initSource = initFeatureLayer.getSource();
    const initExtent = initSource?.getExtent();
    if (initExtent) {
      mapRef.current.getView().fit(initExtent, {
        padding: [20, 20, 20, 20],
        duration: 600,
      });
    }
    // add interaction, specify "click" instead of default "singleclick" because
    // the latter introduces 250ms delay to check for doubleclick
    const selectInteraction = new Select({
      condition: click,
      style: (feature) => {
        return new Style({
          fill: new Fill({
            color: colourScale(Number(feature.get("kantonsflaeche"))).hex(),
          }),
          stroke: new Stroke({ color: "cornflowerblue", width: 3 }),
          zIndex: 100,
        });
      },
    });
    selectInteraction.on("select", function (e: SelectEvent) {
      const selected = e.selected[0];
      if (selected) {
        console.log(
          `Selected feature: ${String(selected.getId())}, ${String(selected.get("name"))}`,
        );
        setSelectedFeatureID(Number(selected.getId()));
      } else {
        setSelectedFeatureID(undefined);
      }
    });
    mapRef.current.addInteraction(selectInteraction);
    selectInteractionRef.current = selectInteraction;
  }, [featureCollection, selectedFeatureID, setSelectedFeatureID]);

  // set selected feature on map
  useEffect(() => {
    // check for initialisation
    if (!selectInteractionRef.current || !featureLayerRef.current || !mapRef.current) return;
    // clear selected features, otherwise it will add selected feature to existing ones
    // this should not be necessary since the "multi" property of the select interaction is false by default...
    selectInteractionRef.current.getFeatures().clear();
    const source = featureLayerRef.current.getSource();
    if (!source) return;
    // get selected feature
    const selectedFeature = source.getFeatures().find((f) => f.getId() === selectedFeatureID);
    if (selectedFeature) {
      selectInteractionRef.current.getFeatures().push(selectedFeature);
      const geometry = selectedFeature.getGeometry();
      if (geometry instanceof SimpleGeometry) {
        mapRef.current.getView().fit(geometry, {
          padding: [100, 100, 100, 100],
          duration: 600,
        });
      }
    } else if (featureCollection.features.length) {
      // if source has features
      const extent = source.getExtent();
      if (extent) {
        mapRef.current.getView().fit(extent, {
          padding: [100, 100, 100, 100],
          duration: 600,
        });
      }
    }
  }, [selectInteractionRef, selectedFeatureID, featureLayerRef, featureCollection]);

  return <div id="openlayers-container" />;
}

export default OpenlayersMap;

/*
  // Tile Layers
  const osmsource = new OSM();
  const osmlayer = new TileLayer({
    source: osmsource
  })
  // Google Maps Terrain
  const tileLayerGoogle = new TileLayer({
    source: new XYZ({ url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}', })
  })
  //Laden des WMTS von geo.admin.ch > Hintergrungkarte in der Applikation
  const swisstopoWMTSLayer = 'ch.swisstopo.pixelkarte-grau'; // Swisstopo WMTS Layername

  const wmtsLayer = new TileLayer({
    //extent: extent,
    source: new TileWMS({
      url: 'https://wms.geo.admin.ch/',
      crossOrigin: 'anonymous',
      attributions: '© <a href="http://www.geo.admin.ch/internet/geoportal/' +
        'en/home.html">SWISSIMAGE / geo.admin.ch</a>',
      projection: 'EPSG:3857',
      params: {
        'LAYERS': swisstopoWMTSLayer,
        'FORMAT': 'image/jpeg'
      },
      // serverType: 'mapserver'
    })
  });
*/
