import {Component} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

@Component({
    selector: 'image-viewer',
    template: `
        <ion-content (click)="leave()" style="background: black">
            <div style="height:100% ; width:100%;display:flex;justify-content:center;align-items:center;">
                <img [src]="image" style="width:100%">
            </div>
        </ion-content>
    `,
})


export class ImageViewer {
    image: string;

    constructor(public appCtrl: App, public navParams: NavParams) {
        this.image = navParams.get('image');
    }

    leave() {
        this.appCtrl.getRootNav().pop();
    }


}
