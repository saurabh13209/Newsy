import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Storage } from '@ionic/storage'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public user_name: any;
    public ITEMS: any;
    public Bookmark_image:any;

    constructor(public menuCtrl: MenuController ,  public navCtrl: NavController, public http: HttpClient, public inAppBrowser: InAppBrowser , public IonicStorage: Storage) {

    }

    Bookmark(i , ImageUrl , TitleUrl , DescUrl , LinkUrl) {
        var ele= document.getElementsByClassName("ImageMain");
        if(ele[i].getAttribute('src')=="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAABLS0vc3Nzo6OgwMDDS0tLFxcWysrL4+PiOjo5ZWVlCQkKjo6Pw8PB/f39vb283NzdmZmY+Pj54eHgVFRUqKirl5eW+vr4dHR2VlZWCgoKurq7MzMxWVlYTExNhYWFzc3PbwxYgAAAEW0lEQVR4nO2d2XbiMBBEww5ZACdkY0KW///JGQJDYlvdlkyXWpxT95VI8sXYLluO+uqKEEIIIYQQQgghhBBCCCHk4tltN8Nqgqcabra7/Hqz+0Fe7mdZ/d4eM/vteXzL5jeaOPjtqZ7zCN45+e25yyG4dhQcDL7wgu+ugoPBJ1rQdw/u2WAFPY/B/0BPqSNvu2+QZ1Svy0SdW5zg3NvtyAvM8Mlb7UiFEpx5m52Yggw/mwO9z6djPNP5sDkw6rrfGOYV9U22mX40xsYMs2uMssQME2TZGHsEGaVxtc+3B/c0zgGYq/5XbYwhZAyZh9ro15Ax6pk73+3ogfov6BMyRv2MlvdH2vyZvkPGqBtijnWZeiTGHCM0xEJDC2iIhYYW0BALDS2gIRYaWkBDLDS0gIZYaGgBDbHQ0AIaYqGhBTTEQkMLaIiFhhbQEAsNLaAhFhpaQEMsNLSAhlhoaAENsdDQAhpioaEFNMRCQwtoiIWGFtAQCw0toCEWGlpAQyw0tICGWGhoAQ2x0NACGmKhoQU0xEJDC2iIhYYW0BALDS2gIRYaWmBj2HelvosxvO67mNyFGC5v/7W87bUbL8Pw5di2zxqyF2G4OjVepTe+AMPx72WWJ+PU5uUbNldZnie2L96wvZb7Oq2Dwg1HoXoYj2ldFG0orVWfUsuhZMOFXE7hfRHdS8GGU9FvT/RCr+UaXquC8SsCl2r4HdN0IkNcoYZx69RH1Tkq03A1iCMmxJVoOI6vhhER4go0TCuG0RniyjMUSu487YQiGV0hrjTDYEwbHI444ejsCHGFGUox7XDr+yJ8qoa4ogwXN2GD05VPukreKCGuJEMppv1OL1LSkUNcQYbSxteLNDbLgYS+hhrFGC5bNWEOtO4ipDuOoRDiSjGUYlroJCKdjsIhrhDDtAuBdklp/3EJhuMqvMX3YpdCMdMqEOJKMJRimlav5U1o0w5xBRhKMU2vdPccG+LcDUfNmlNHum+MhGP3ozmAs6Ee03TiQpyvYWdM04kKca6GMTFNJyLEeRpuuzevE+lL2p7+ws+wz31CgM4fupthSkzT6QhxXoZ/wlv12meGePQa7uzP4VMXw/SYpqOFOBdDKaalTn7+oPToYSjEtMk5BYmfhWesawfDuRAozy2bvQl3+1TfvTkMBaLmIFSi5jrcDPu9DNQgYr7KzdCqOmjXnKOb4a67j0ikJ3G+hokxTUcKcZ6G6TFNRwpxXoa9YpqOFOJ8DPvGNB0hxHkY9o9pOvIka17D9PcMoxEnyrMa9nhXNAHhSVxOw/Njmk44xOUzfLCIaTrLh8C42Qy33a0MCDzqymWYq756+0lcHkPTmKbTCnFZDK1jms5ddsO0V5gNqE+n4g0TX0M3YZ3TEBXTdObZDIExTecnxGENsTFNZ5XDEB3TdGZwQ5OnaedweBKHM8wT03S2SMNcMU1nijKsMsY0ncVNBem3z39+oihpWwghhBBCCCGEEEII+eYvV4w4fU6tiT8AAAAASUVORK5CYII="){
            ele[i].setAttribute('src',"https://www.materialui.co/materialIcons/action/bookmark_black_192x192.png");
        }else{
            ele[i].setAttribute('src',"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAABLS0vc3Nzo6OgwMDDS0tLFxcWysrL4+PiOjo5ZWVlCQkKjo6Pw8PB/f39vb283NzdmZmY+Pj54eHgVFRUqKirl5eW+vr4dHR2VlZWCgoKurq7MzMxWVlYTExNhYWFzc3PbwxYgAAAEW0lEQVR4nO2d2XbiMBBEww5ZACdkY0KW///JGQJDYlvdlkyXWpxT95VI8sXYLluO+uqKEEIIIYQQQgghhBBCCCHk4tltN8Nqgqcabra7/Hqz+0Fe7mdZ/d4eM/vteXzL5jeaOPjtqZ7zCN45+e25yyG4dhQcDL7wgu+ugoPBJ1rQdw/u2WAFPY/B/0BPqSNvu2+QZ1Svy0SdW5zg3NvtyAvM8Mlb7UiFEpx5m52Yggw/mwO9z6djPNP5sDkw6rrfGOYV9U22mX40xsYMs2uMssQME2TZGHsEGaVxtc+3B/c0zgGYq/5XbYwhZAyZh9ro15Ax6pk73+3ogfov6BMyRv2MlvdH2vyZvkPGqBtijnWZeiTGHCM0xEJDC2iIhYYW0BALDS2gIRYaWkBDLDS0gIZYaGgBDbHQ0AIaYqGhBTTEQkMLaIiFhhbQEAsNLaAhFhpaQEMsNLSAhlhoaAENsdDQAhpioaEFNMRCQwtoiIWGFtAQCw0toCEWGlpAQyw0tICGWGhoAQ2x0NACGmKhoQU0xEJDC2iIhYYW0BALDS2gIRYaWmBj2HelvosxvO67mNyFGC5v/7W87bUbL8Pw5di2zxqyF2G4OjVepTe+AMPx72WWJ+PU5uUbNldZnie2L96wvZb7Oq2Dwg1HoXoYj2ldFG0orVWfUsuhZMOFXE7hfRHdS8GGU9FvT/RCr+UaXquC8SsCl2r4HdN0IkNcoYZx69RH1Tkq03A1iCMmxJVoOI6vhhER4go0TCuG0RniyjMUSu487YQiGV0hrjTDYEwbHI444ejsCHGFGUox7XDr+yJ8qoa4ogwXN2GD05VPukreKCGuJEMppv1OL1LSkUNcQYbSxteLNDbLgYS+hhrFGC5bNWEOtO4ipDuOoRDiSjGUYlroJCKdjsIhrhDDtAuBdklp/3EJhuMqvMX3YpdCMdMqEOJKMJRimlav5U1o0w5xBRhKMU2vdPccG+LcDUfNmlNHum+MhGP3ozmAs6Ee03TiQpyvYWdM04kKca6GMTFNJyLEeRpuuzevE+lL2p7+ws+wz31CgM4fupthSkzT6QhxXoZ/wlv12meGePQa7uzP4VMXw/SYpqOFOBdDKaalTn7+oPToYSjEtMk5BYmfhWesawfDuRAozy2bvQl3+1TfvTkMBaLmIFSi5jrcDPu9DNQgYr7KzdCqOmjXnKOb4a67j0ikJ3G+hokxTUcKcZ6G6TFNRwpxXoa9YpqOFOJ8DPvGNB0hxHkY9o9pOvIka17D9PcMoxEnyrMa9nhXNAHhSVxOw/Njmk44xOUzfLCIaTrLh8C42Qy33a0MCDzqymWYq756+0lcHkPTmKbTCnFZDK1jms5ddsO0V5gNqE+n4g0TX0M3YZ3TEBXTdObZDIExTecnxGENsTFNZ5XDEB3TdGZwQ5OnaedweBKHM8wT03S2SMNcMU1nijKsMsY0ncVNBem3z39+oihpWwghhBBCCCGEEEII+eYvV4w4fU6tiT8AAAAASUVORK5CYII=");    
        }
        
        this.IonicStorage.get('DATA_VAL').then((val) =>{
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
                Image : ImageArray,
                Title : TitleArray,
                Desc : DescArray,
                Link : LinkArray
            };
            this.IonicStorage.set('DATA_VAL',JSON.stringify(json_new));
        });

        this.IonicStorage.get('DATA_VAL').then((val) => {
            console.log(val);
        });

    }

    ionViewDidLoad() {
        this.login();
    }

    UpdateBookmark(){
        console.log("Loaded");
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
            this.ITEMS = result.articles;
        })
    }

}
