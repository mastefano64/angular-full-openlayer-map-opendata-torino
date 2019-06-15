
export class RouteLegs {

    constructor(public index: number, public point: { lat: number, lng: number },
             public instruction: string, public legsdist: string) {}

    getLatLngAsString() {
        return this.point.lat + ',' + this.point.lng;
    }

    getLatLngAsArray() {
        return [this.point.lat, this.point.lng];
    }

    getLngLatAsString() {
        return this.point.lng + ',' + this.point.lat;
    }

    getLngLatAsArray() {
        return [this.point.lng, this.point.lat];
    }
}
