// returns X tile from given longitude
export function lon2tile(lon, zoom) {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
}
// returns Y tile from given latitude
export function lat2tile(lat, zoom) {
    return Math.floor(
        ((1 -
            Math.log(
                Math.tan((lat * Math.PI) / 180) +
                    1 / Math.cos((lat * Math.PI) / 180)
            ) /
                Math.PI) /
            2) *
            Math.pow(2, zoom)
    );
}
