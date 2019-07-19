import { ReactiveFormsModule } from '@angular/forms';
import { DetailsShareModule } from './products/details/details-share/details-share.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';

import { IonicStorageModule } from '@ionic/storage';
import { DetailsModalComponent } from './products/details/details-modal/details-modal.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SetUserModalComponent } from './users/set-user-modal/set-user-modal.component';
import { SetTableModalComponent } from './tables/set-table-modal/set-table-modal.component';
import { SetProductComponent } from './products/set-product/set-product.component';
import { ShowTablesModalComponent } from './tables/show-tables-modal/show-tables-modal.component';
import { DiscountModalComponent } from './order/discount-modal/discount-modal.component';
import { CommentModalComponent } from './tables/comment-modal/comment-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsModalComponent,
    ProgressBarComponent,
    SetUserModalComponent,
    SetTableModalComponent,
    SetProductComponent,
    ShowTablesModalComponent,
    DiscountModalComponent,
    CommentModalComponent
  ],
  entryComponents: [
    DetailsModalComponent,
    SetUserModalComponent,
    SetTableModalComponent,
    SetProductComponent,
    ShowTablesModalComponent,
    DiscountModalComponent,
    CommentModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DetailsShareModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    StatusBar,
    SplashScreen,
    CookieService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
