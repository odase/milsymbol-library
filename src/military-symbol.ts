export class MilitarySymbol {
    sidc: string;
    size: number = 20;
    uniqueDesignation: string = '';
    latitude: number;
    longitude: number;

    constructor(sidc: string,  latitude: number, longitude: number, uniqueDesignation?:string, size?: number) {
        this.sidc = sidc;
        this.latitude = latitude;
        this.longitude = longitude;
        if(size) {
            this.size = size;
        }
        if(uniqueDesignation) {
            this.uniqueDesignation = uniqueDesignation;
        }
    }
}
