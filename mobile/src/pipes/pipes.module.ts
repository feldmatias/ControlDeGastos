import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize/capitalize';
import { RoundNumberPipe } from './round-number/round-number';

@NgModule({
	declarations: [CapitalizePipe,
    RoundNumberPipe],
	imports: [],
	exports: [CapitalizePipe,
    RoundNumberPipe]
})
export class PipesModule {}
