import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage'
import { HomePage } from '../home/home';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  constructor(private Social: SocialSharing ,  public menuCtrl: MenuController, public navCtrl: NavController, public http: HttpClient, public inAppBrowser: InAppBrowser, public IonicStorage: Storage) {

  }

  public user_name: any;
  public ImageItem: any;
  public TitleItem: any;
  public Bookmark_image: any;

  DeBookmark(TitleUrl) {

    this.IonicStorage.get('DATA_VAL').then((val) => {
      var json_get = JSON.parse(val);
      var ImageArray = json_get.Image;
      var TitleArray = json_get.Title;
      var DescArray = json_get.Desc;
      var LinkArray = json_get.Link;
      for(var i=0 ; i<ImageArray.length ; i++){
        if(TitleArray[i] == TitleUrl){
          ImageArray.splice(i,1);
          TitleArray.splice(i,1);
          DescArray.splice(i,1);
          LinkArray.splice(i,1);
        }
      }
      var json_new = {
        Image: ImageArray,
        Title: TitleArray,
        Desc: DescArray,
        Link: LinkArray
      };
      this.IonicStorage.set('DATA_VAL', JSON.stringify(json_new));
      this.login();
    });
  }
  ionViewDidLoad() {
    this.login();
  }


  click_main(link: any) {
    const option: InAppBrowserOptions = {
      zoom: 'no',
      hideurlbar: 'yes',
      hardwareback: 'yes'
    };
    this.inAppBrowser.create(link, '_Self', option).show;
  }

  ShareIt(Title , Image ,     Url){
    this.Social.shareViaWhatsApp(Title,Image,Url);
}


  login() {
    this.ImageItem = [];
    this.IonicStorage.get('DATA_VAL').then((val) => {
      var json_get = JSON.parse(val);
      var main_array = [];
      for(var i=0 ; i<json_get.Title.length ; i++){
        var temp = {
          "Image" : json_get.Image[i],
          "Title" : json_get.Title[i],
          "Desc" : json_get.Desc[i],
          "Link" : json_get.Link[i]
        };
        main_array.push(temp);
      }
      this.ImageItem = main_array;
    });

  }

}
