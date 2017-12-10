import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {CityPickerModule} from "ionic2-city-picker";

/**
 * Native Modules
 */
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import {ImagePicker} from '@ionic-native/image-picker';
import {FileTransfer} from '@ionic-native/file-transfer';


/**
 * Components
 */
/*
  Basic Part
 */
import {MyApp} from './app.component';
import {StartPage} from '../pages/start/start';
import {LoginPage} from '../pages/login/login';
import {SignUpPage} from '../pages/signUp/signUp';
import {TabsPage} from '../pages/tabs/tabs';
/*
  Game Part
*/
import {GameTabPage} from '../pages/game/game-tab.component';
/*
  Friend Part
*/
import {FriendTabPage} from '../pages/friend/friend-tab.component';
/*
  Shop Part
*/
import {ShopTabPage} from '../pages/shop/shop-tab.component';
/*
  Moment Part
*/
import {MomentTabPage} from '../pages/moment/moment-tab.component';
/*
  Account Part
*/
import {AccountTabPage} from '../pages/account/account-tab.component';

/**
 * Services
 */
import {FriendService} from '../services/friend.service';
import {MomentService} from '../services/moment.service';
import {AccountService} from '../services/account.service';
import {SocketService} from '../services/socket.service';
import {ImgService} from '../services/img.service';

@NgModule({
    declarations: [
        MyApp,
        StartPage,
        LoginPage,
        SignUpPage,
        TabsPage,
        GameTabPage,
        FriendTabPage,
        ShopTabPage,
        MomentTabPage,
        AccountTabPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        CityPickerModule,
        HttpClientModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        StartPage,
        LoginPage,
        SignUpPage,
        TabsPage,
        GameTabPage,
        FriendTabPage,
        ShopTabPage,
        MomentTabPage,
        AccountTabPage,
    ],
    providers: [
        Camera,
        FileTransfer,
        ImagePicker,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        FriendService,
        MomentService,
        AccountService,
        ImgService,
        SocketService,
    ]
})
export class AppModule {
}
