import { NgModule } from '@angular/core';
import { VerificarPipe } from './verificar.pipe';
import { FechasPipe } from './fechas.pipe';

@NgModule({
	declarations: [VerificarPipe, FechasPipe],
	imports: [],
	exports: [VerificarPipe, FechasPipe]
})
export class PipesModule {}
