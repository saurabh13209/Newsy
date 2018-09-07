import { Component, Input } from '@angular/core';
import { Platform, NavController, MenuController, AlertController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage'
import { BookmarkPage } from '../../pages/bookmark/bookmark';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AboutPage } from '../about/about';
import { SettingPage } from '../setting/setting';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public user_name: any;
    public ITEMS: any;
    public Bookmark_image: any;
    public SearchBox: any;
    public COUNTRY: any = "in";
    public CAT: any = "general";
    public RefreshMaker: any;

    constructor(private platform: Platform, private Social: SocialSharing, private AlertCtrl: AlertController, private ActionCtrl: ActionSheetController, public menuCtrl: MenuController, public navCtrl: NavController, public http: HttpClient, public inAppBrowser: InAppBrowser, public IonicStorage: Storage) {
        console.log("kicme");
    }



    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.RefreshMaker = refresher;
        this.login();
    }

    getSearchRes(ev: any) {
        const val = ev.target.value;
        if (val && val.trim() != '') {
            this.MainLink = "https://newsapi.org/v2/everything?q=" + val + "&apiKey=2719918152a7463492d900316ee90bf1"
            this.login();
        } else {
            this.MainLink = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1";
            this.login();
        }
    }

    ShareIt(Title, Image, Url) {
        this.Social.shareViaWhatsApp(Title, Image, Url);
    }

    AboutPageMaker() {
        this.navCtrl.push(AboutPage);
    }

    FilterAdder() {
        let Action = this.ActionCtrl.create({
            title: "Filters",
            buttons: [
                {
                    text: 'Country',
                    handler: () => {
                        let A = this.AlertCtrl.create();
                        A.setTitle("Country");
                        A.addInput({
                            type: 'radio',
                            label: 'United Arab Emirates',
                            value: 'ae',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Argentina',
                            value: 'ar',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Austria',
                            value: 'at',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Australia',
                            value: 'au',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Belgium',
                            value: 'be',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Bulgaria',
                            value: 'bg',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Brazil',
                            value: 'br',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Canada',
                            value: 'ca',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Switzerland',
                            value: 'ch',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'China',
                            value: 'ch',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Colombia',
                            value: 'co',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Cuba',
                            value: 'cu',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Czechia',
                            value: 'cz',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Germany',
                            value: 'de',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Egypt',
                            value: 'eg',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'France',
                            value: 'fr',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'United Kingdom',
                            value: 'gb',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Greece',
                            value: 'gr',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Hong Kong',
                            value: 'hk',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Hungary',
                            value: 'hu',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Indonesia',
                            value: 'id',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Ireland',
                            value: 'ie',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Israel',
                            value: 'il',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'India',
                            value: 'in',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Italy',
                            value: 'it',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Japan',
                            value: 'jp',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Korea',
                            value: 'kr',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Lithuania',
                            value: 'lt',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Latvia',
                            value: 'lv',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Morocco',
                            value: 'ma',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Mexico',
                            value: 'mx',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Malaysia',
                            value: 'my',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Nigeria',
                            value: 'ng',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Netherlands',
                            value: 'nl',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Norway',
                            value: 'no',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'New Zealand',
                            value: 'nz',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Philippines',
                            value: 'ph',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Latvia',
                            value: 'pl',
                            checked: false
                        });
                        A.addButton({
                            text: "Save",
                            handler: data => {
                                console.log(data);
                                this.COUNTRY = data;
                                this.MainLink = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1"; this.login();
                                this.login();

                            }
                        });
                        A.present();
                    }
                },
                {
                    text: 'category',
                    handler: () => {
                        let A = this.AlertCtrl.create();
                        A.setTitle("category");
                        A.addInput({
                            type: 'radio',
                            label: 'Business',
                            value: 'business',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Entertainment',
                            value: 'entertainment',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'General',
                            value: 'general',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Health',
                            value: 'health',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Science',
                            value: 'science',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Sports',
                            value: 'sports',
                            checked: false
                        });
                        A.addInput({
                            type: 'radio',
                            label: 'Technology',
                            value: 'technology',
                            checked: false
                        });
                        A.addButton({
                            text: "Save",
                            handler: data => {
                                this.CAT = data;
                                this.MainLink = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1";
                                this.login();
                            }
                        });
                        A.present();
                    }
                }
            ]
        });
        Action.present();
    }

    HomePageMaker() {
        this.navCtrl.push(HomePage);
    }

    BookmarkPageMaker() {
        this.navCtrl.push(BookmarkPage);
    }

    Bookmark(i, ImageUrl, TitleUrl, DescUrl, LinkUrl) {
        var ele = document.getElementsByClassName("ImageMain");
        console.log('x' + ele[i].getAttribute('src') + 'x');
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
    ionViewWillEnter() {

        this.IonicStorage.get('Cnt').then((val) => {
            this.COUNTRY = val;

            this.IonicStorage.get('Cat').then((val) => {
                this.CAT = val;
                if (this.CAT) {
                    this.MainLink = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1";
                    this.login();
                } else {
                    this.COUNTRY = 'in';
                    this.CAT = 'general';
                    this.MainLink = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1";
                    this.login();
                }
            })
        });
    }

    ionViewDidLoad() {

        this.IonicStorage.get('Cnt').then((val) => {
            this.COUNTRY = val;

            this.IonicStorage.get('Cat').then((val) => {
                this.CAT = val;
                if (this.CAT) {
                    this.MainLink = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1";
                    this.login();
                } else {
                    this.COUNTRY = 'in';
                    this.CAT = 'general';
                    this.MainLink = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1";
                    this.login();
                }
            })
        });

    }

    SettingPageMaker() {
        this.navCtrl.push(SettingPage);
    }


    click_main(link: any) {
        const option: InAppBrowserOptions = {
            zoom: 'no',
            hideurlbar: 'yes',
            hardwareback: 'yes'
        };
        this.inAppBrowser.create(link, '_Self', option).show;
    }

    public MainLink: any = "https://newsapi.org/v2/top-headlines?country=" + this.COUNTRY + "&category=" + this.CAT + "&apiKey=2719918152a7463492d900316ee90bf1";

    login() {
        let data: Observable<any>;
        console.log(this.MainLink);
        data = this.http.get(this.MainLink);
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
                    try {
                        this.RefreshMaker.complete();
                    } catch (e) {

                    }
                    main_array.push(temp);
                }

            });

            this.ITEMS = main_array;
        });

    }

}
