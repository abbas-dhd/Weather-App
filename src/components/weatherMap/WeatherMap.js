import {
    ImageOverlay,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";
import { lon2tile, lat2tile } from "../../helpers/latlangToTile";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const MapImageOverlay = (props) => {
    const map = useMap();

    return (
        <ImageOverlay
            bounds={map.getBounds()}
            url={`https://tile.openweathermap.org/map/${props.overlayType}/${props.zoom}/${props.x}/${props.y}.png?appid=911180d8058f1bd89a55b56be4c070d1`}
        ></ImageOverlay>
    );
};

const WeatherMap = (props) => {
    const zoom = 9;
    const x = lon2tile(props.lon, zoom);
    const y = lat2tile(props.lat, zoom);

    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        });
    }, []);

    return (
        <MapContainer
            center={[props.lat, props.lon]}
            zoom={zoom}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            style={{ height: "400px", width: "400px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // url={`https://a.tile.openstreetmap.org/${zoom}/${x}/${y}.png`}
            />
            <MapImageOverlay
                x={x}
                y={y}
                zoom={zoom}
                overlayType={props.overlayType}
            />
            <Marker position={[props.lat, props.lon]}>
                <Popup>Your location</Popup>
            </Marker>
        </MapContainer>
    );
};

export default WeatherMap;
