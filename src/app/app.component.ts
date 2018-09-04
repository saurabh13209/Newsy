import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public IonicStorage: Storage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });


    IonicStorage.get("DATA_VAL").then((val) => {
      if (val === null) {
        var json_main = {
          Image: [],
          Title: [],
          Desc: [],
          Link: []
        }
         IonicStorage.set('DATA_VAL',JSON.stringify(json_main));
      }
    });
  }

}

