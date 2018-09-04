import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage'
import { BookmarkPage } from '../../pages/bookmark/bookmark';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public user_name: any;
    public ITEMS: any;
    public Bookmark_image: any;

    constructor(public menuCtrl: MenuController, public navCtrl: NavController, public http: HttpClient, public inAppBrowser: InAppBrowser, public IonicStorage: Storage) {

    }

    HomePageMaker() {
    }

    BookmarkPageMaker() {
        this.navCtrl.push(BookmarkPage);
    }

    Bookmark(i, ImageUrl, TitleUrl, DescUrl, LinkUrl) {
        var ele = document.getElementsByClassName("ImageMain");
        console.log('x'+ele[i].getAttribute('src')+'x');
        if (ele[i].getAttribute('src') == " ../../assets/imgs/bookmark_white.png ") {
            ele[i].setAttribute('src', " ../../assets/imgs/bookmark_black.png ");
            this.BookmarkFunc(ImageUrl, TitleUrl, DescUrl, LinkUrl);
        } else {
            ele[i].setAttribute('src', " ../../assets/imgs/bookmark_white.png ");
            this.DeBookmark(TitleUrl);
        }

    }

    BookmarkFunc(ImageUrl, TitleUrl, DescUrl, LinkUrl) {
        this.IonicStorage.get('DATA_VAL').then((val) => {
            var json_get = JSON.parse(val);
            var ImageArray = json_get.Image;
            var TitleArray = json_get.Title;
            var DescArray = json_get.Desc;
            var LinkArray = json_get.Link;
            ImageArray.push(ImageUrl);
            TitleArray.push(TitleUrl);
            DescArray.push(DescUrl);
            LinkArray.push(LinkUrl);
            var json_new = {
                Image: ImageArray,
                Title: TitleArray,
                Desc: DescArray,
                Link: LinkArray
            };
            this.IonicStorage.set('DATA_VAL', JSON.stringify(json_new));
        });

    }

    DeBookmark(TitleUrl) {

        this.IonicStorage.get('DATA_VAL').then((val) => {
            var json_get = JSON.parse(val);
            var ImageArray = json_get.Image;
            var TitleArray = json_get.Title;
            var DescArray = json_get.Desc;
            var LinkArray = json_get.Link;
            for (var i = 0; i < ImageArray.length; i++) {
                if (TitleArray[i] == TitleUrl) {
                    ImageArray.splice(i, 1);
                    TitleArray.splice(i, 1);
                    DescArray.splice(i, 1);
                    LinkArray.splice(i, 1);
                }
            }
            var json_new = {
                Image: ImageArray,
                Title: TitleArray,
                Desc: DescArray,
                Link: LinkArray
            };
            this.IonicStorage.set('DATA_VAL', JSON.stringify(json_new));
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



    login() {
        let data: Observable<any>;
        data = this.http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2719918152a7463492d900316ee90bf1');
        data.subscribe(result => {
            var json_get = result.articles;
            var main_array = [];
            this.IonicStorage.get('DATA_VAL').then((val) => {
                var json_save = JSON.parse(val);
                json_save = json_save.Title;

                for (var i = 0; i < json_get.length; i++) {
                    var isNew = true;
                    for (var j = 0; j < json_save.length; j++) {
                        if (json_save[j] == json_get[i].title) {
                            isNew = false;
                        }
                    }

                    if (isNew) {
                        var temp = {
                            "Image": json_get[i].urlToImage,
                            "Title": json_get[i].title,
                            "Desc": json_get[i].description,
                            "Link": json_get[i].url,
                            "BookImage": "../../assets/imgs/bookmark_white.png"
                        };
                    } else {
                        var temp = {
                            "Image": json_get[i].urlToImage,
                            "Title": json_get[i].title,
                            "Desc": json_get[i].description,
                            "Link": json_get[i].url,
                            "BookImage": "../../assets/imgs/bookmark_black.png"
                        };
                    }
                    main_array.push(temp);
                }

            });

            this.ITEMS = main_array;
        });

    }

}
