import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

declare var ms: any;

@Component({
  selector: 'milsymbol',
  template: `<div id="milsymbol"></div>`
})
export class MilsymbolComponent implements OnInit {
    @Input() sidc: string = <string>null;
    @Input() size: number = <number>null;
    @Input() uniqueDesignation: string = <string>null;
    symbol: any;
    canvasElement:  HTMLCanvasElement;

    ngOnInit() {
        this.symbol = new ms.Symbol(this.sidc, {size: this.size}, {uniqueDesignation: this.uniqueDesignation});
        this.canvasElement = this.symbol.asCanvas();
        let milsymbolElement = document.getElementById("milsymbol");
        milsymbolElement.appendChild(this.canvasElement);
    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.canvasElement) {
            if(changes.size) {
                this.symbol.setOptions({size: changes.size.currentValue});
                this.size = changes.size.currentValue;
            }
            if(changes.sidc) {
                this.symbol.setOptions(changes.sidc.currentValue);
                this.sidc = changes.sidc.currentValue;
            }
            if(changes.uniqueDesignation) {
                this.symbol.setOptions({uniqueDesignation: changes.uniqueDesignation.currentValue});
                this.uniqueDesignation = changes.uniqueDesignation.currentValue;
            }
            this.updateCanvas();
        }
    }

    getSize() {
        return this.size;
    }

    setSize(size: any) {
        this.size = size;
    }

    getSIDC() {
        return this.sidc;
    }

    setSIDC(sidc: string) {
        this.sidc = sidc;
    }

    getUniqueDesignation() {
        return this.uniqueDesignation;
    }

    setUniqueDesignation(designation: string) {
        this.uniqueDesignation = designation;
    }

    updateCanvas() {
        let tmp = this.canvasElement;
        let milsymbolElement = document.getElementById("milsymbol");
        milsymbolElement.removeChild(tmp);
        this.canvasElement = this.symbol.asCanvas();
        milsymbolElement.appendChild(this.canvasElement);
    }
}
