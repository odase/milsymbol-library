import { Component, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MilitarySymbol } from './military-symbol';

declare var L: any;
declare var ms: any;

@Component({
    selector: 'map-milsymbol',
    template: `<div [id]="uniqueIdMap" style="height:380px;"></div>`
})
export class MapMilsymbolComponent implements AfterViewInit, OnChanges {
    @Input() symbols: MilitarySymbol[] = new Array();
    map: any;
    uniqueIdMap: string;
    currentMarkers: any[] = new Array();

    constructor() {
        this.uniqueIdMap = 'map_' + Math.random().toString(36).substr(2, 9);
    }

    ngAfterViewInit () {
        let location = this.locationInitialization();
        this.createMap(location);
    }

    ngOnChanges(changes) {
      if(changes.symbols) {
          this.updateSymbolsOnMap();
      }
    }

    locationInitialization(): number[] {
        let locationInit = [0,0];
        if(this.symbols.length > 0) {
            let symbolInit = this.symbols[this.symbols.length-1];
            locationInit = [ symbolInit.latitude, symbolInit.longitude];
        }
        return locationInit;
    }

    createMap(location): void {
        this.map = L.map(this.uniqueIdMap).setView(location, 2);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }

    updateSymbolsOnMap(): void {
        this.cleanMap();
        for(let symbol of this.symbols) { //Create all markers from symbols and put in on the map
            this.createMarker(symbol);
        }
    }

    cleanMap(): void {
        if(this.currentMarkers.length > 0) {
            for(let currentMarker of this.currentMarkers) {
                this.map.removeLayer(currentMarker);
            }
        }
    }

    createMarker(symbol) {
        let s = new ms.Symbol(symbol.sidc, {size: symbol.size}, {uniqueDesignation: symbol.uniqueDesignation });
        let location = [ symbol.latitude, symbol.longitude];
        let icon = L.divIcon({
            className: '',
            html: s.asSVG(),
            iconAnchor: new L.Point(s.getAnchor().x, s.getAnchor().y)
        });
        let marker = L.marker(location, {icon: icon});
        this.currentMarkers.push(marker);
        marker.addTo(this.map);
    }
}
