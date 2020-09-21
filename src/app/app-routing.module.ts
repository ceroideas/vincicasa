import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'manual',
    loadChildren: () => import('./manual/manual.module').then( m => m.ManualPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'mnumeros',
    loadChildren: () => import('./mnumeros/mnumeros.module').then( m => m.MnumerosPageModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'combinazione',
    loadChildren: () => import('./combinazione/combinazione.module').then( m => m.CombinazionePageModule)
  },
  {
    path: 'seleccion',
    loadChildren: () => import('./seleccion/seleccion.module').then( m => m.SeleccionPageModule)
  },
  {
    path: 'dona',
    loadChildren: () => import('./dona/dona.module').then( m => m.DonaPageModule)
  },
  {
    path: 'seleccion2',
    loadChildren: () => import('./seleccion2/seleccion2.module').then( m => m.Seleccion2PageModule)
  },
  {
    path: 'verifica',
    loadChildren: () => import('./verifica/verifica.module').then( m => m.VerificaPageModule)
  },
  {
    path: 'archivo',
    loadChildren: () => import('./archivo/archivo.module').then( m => m.ArchivoPageModule)
  },
  {
    path: 'retardati',
    loadChildren: () => import('./retardati/retardati.module').then( m => m.RetardatiPageModule)
  },
  {
    path: 'frequenti',
    loadChildren: () => import('./frequenti/frequenti.module').then( m => m.FrequentiPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'selezionis',
    loadChildren: () => import('./selezionis/selezionis.module').then( m => m.SelezionisPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
