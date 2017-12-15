# milsymbol-library

## Installation

To install this library, run:

```bash
$ npm install milsymbol --save
$ npm install leaflet --save
$ npm install milsymbol-library --save
```

## Consuming your library

Once you have download the two libraries, you need to add milsymbol in `.angular-cli.json`:

```typescript
...
"styles": [
  "../node_modules/leaflet/dist/leaflet.css",
],
"scripts": [
    "../node_modules/milsymbol/dist/milsymbol.js",
    "../node_modules/leaflet/dist/leaflet.js"
],
...
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { MilsymbolModule } from 'milsymbol-library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    MilsymbolModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its two components :

For Milsymbol component :

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<milsymbol sidc="SFG-UCI----D" size="40" uniqueDesignation="Hello World"></milsymbol>
```

For MapMilsymbolComponent :

In your component (typescript):
```typescript
import { MilitarySymbol } from 'milsymbol-library';
...
private symbols: MilitarySymbol[] = new Array();
...

let symbol1 : MilitarySymbol = new MilitarySymbol('SFGPUCI----GFR-', 47.47801, 3.09211, '1RGTINF');
this.symbols.push(symbol1);
```

And in your template (HTML):
```xml
<map-milsymbol [symbols]="symbols"></map-milsymbol>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Mileem](mailto:sarah@odaseontologies.com)
