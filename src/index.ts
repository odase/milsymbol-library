import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilsymbolComponent } from './milsymbol.component';
import { MapMilsymbolComponent } from './map-milsymbol.component';

export * from './milsymbol.component';
export { MilitarySymbol } from './military-symbol';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MilsymbolComponent,
    MapMilsymbolComponent
  ],
  exports: [
    MilsymbolComponent,
    MapMilsymbolComponent
  ]
})
export class MilsymbolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MilsymbolModule,
      providers: []
    };
  }
}
