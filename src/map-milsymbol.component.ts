import { Component, Input, AfterViewInit } from '@angular/core';
import { MilitarySymbol } from './military-symbol';

declare var L: any;
declare var ms: any;

@Component({
    selector: 'map-milsymbol',
    template: `<div [id]="uniqueIdMap" style="height:380px;"></div>`
})
export class MapMilsymbolComponent implements AfterViewInit {
    @Input() symbols: MilitarySymbol[] = new Array();
    map: any;
    uniqueIdMap: string;

    constructor() {
        this.uniqueIdMap = 'map_' + Math.random().toString(36).substr(2, 9);
    }

    ngAfterViewInit () {
        //Initialization of location
        let locationInit = [0,0];
        if(this.symbols.length > 0) {
            let symbolInit = this.symbols[this.symbols.length-1];
            locationInit = [ symbolInit.latitude, symbolInit.longitude];
        }
        //Create map
        this.map = L.map(this.uniqueIdMap).setView(locationInit, 2);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        //Create all symbols and put in on the map
        for(let symbol of this.symbols) {
            let s = new ms.Symbol(symbol.sidc, {size: symbol.size}, {uniqueDesignation: symbol.uniqueDesignation });
            let location = [ symbol.latitude, symbol.longitude];
            let icon = L.divIcon({
                className: '',
                html: s.asSVG(),
                iconAnchor: new L.Point(s.getAnchor().x, s.getAnchor().y)
            });
            L.marker(location, {icon: icon}).addTo(this.map);
        }

        this.map.invalidateSize();
    }


}
