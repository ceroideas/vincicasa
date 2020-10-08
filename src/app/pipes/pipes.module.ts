import { NgModule } from '@angular/core';
import { VerificarPipe } from './verificar.pipe';
import { FechasPipe } from './fechas.pipe';
import { DisabledPipe } from './disabled.pipe';

@NgModule({
	declarations: [VerificarPipe, FechasPipe, DisabledPipe],
	imports: [],
	exports: [VerificarPipe, FechasPipe, DisabledPipe]
})
export class PipesModule {}
