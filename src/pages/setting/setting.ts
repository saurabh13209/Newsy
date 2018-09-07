import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  public GetCnt: any;
  public GetCat: any;

  constructor(private IonicStorage: Storage, private AlertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.SetTask();
  }

  SetTask() {


    this.IonicStorage.get('Cnt').then((val) => {
      if (val == undefined) {
        document.getElementById("CountrySel").innerHTML = "Select Country";
      } else {
        switch (val) {
          case "ae":
            val = "United Arab Emirates"
            break;
          case "at":
            val = "Austria"
            break;
          case "ar":
            val = "Argentina"
            break;
          case "au":
            val = "Australia"
            break;
          case "be":
            val = "Belgium"
            break;
          case "bg":
            val = "Bulgaria"
            break;
          case "br":
            val = "Brazil"
            break;
          case "ca":
            val = "Canada"
            break;
          case "cs":
            val = "Switzerland"
            break;
          case "ch":
            val = "China"
            break;
          case "co":
            val = "Colombia"
            break;
          case "cu":
            val = "Cuba"
            break;
          case "cz":
            val = "Czechia"
            break;
          case "de":
            val = "Germany"
            break;
          case "eg":
            val = "Egypt"
            break;
          case "fr":
            val = "france"
            break;

          case "gb":
            val = "United Kingdom"
            break;
          case "gr":
            val = "Greece"
            break;
          case "hk":
            val = "Hong Kong"
            break;
          case "hu":
            val = "Hungary"
            break;
          case "id":
            val = "Indonesia"
            break;
          case "ie":
            val = "Indonesia"
            break;
          case "il":
            val = "Israel"
            break;
          case "in":
            val = "India"
            break;
          case "it":
            val = "Italy"
            break;
          case "jp":
            val = "Japan"
            break;
          case "kr":
            val = "Korea"
            break;
          case "lt":
            val = "Lithuania"
            break;
          case "ma":
            val = "morocco"
            break;
          case "mx":
            val = "Mexico"
            break;
          case "my":
            val = "Malaysia"
            break;
          case "ng":
            val = "Nigeria"
            break;

          case "nl":
            val = "Netherlands"
            break;
          case "no":
            val = "Norway"
            break;
          case "nz":
            val = "new Zealand"
            break;
          case "ph":
            val = "philippines"
            break;
          case "pl":
            val = "Latvia"
            break;
        }
        document.getElementById("CountrySel").innerHTML = val;
      }
    });

    this.IonicStorage.get('Cat').then((val) => {
      if (val == undefined) {
        document.getElementById("CategorySel").innerHTML = "Select Country";
      } else {
        document.getElementById("CategorySel").innerHTML = val;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  SetCountry() {
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
      value: 'cs',
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
        this.IonicStorage.set('Cnt', data).then(()=>{
          this.SetTask();
      
        });
      }
    });
    A.present();
  }

  SetCategory() {
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
        this.IonicStorage.set("Cat", data).then(()=>{
          this.SetTask();
        });
      }
    });
    A.present();
  }


}
