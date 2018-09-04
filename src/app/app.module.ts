import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { BookmarkPage } from '../pages/bookmark/bookmark' 
import { SocialSharing } from '@ionic-native/social-sharing';
import { AboutPage } from '../pages/about/about'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookmarkPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookmarkPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing,
    InAppBrowser
  ]
})
export class AppModule {}
