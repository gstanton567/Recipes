import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingService } from './services/shopping.service';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAnalyticsModule, ScreenTrackingService } from '@angular/fire/compat/analytics'
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideFirestore(() => getFirestore()), 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ShoppingService, ScreenTrackingService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
