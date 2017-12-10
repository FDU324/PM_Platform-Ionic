import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { GameTabPage } from '../pages/game/game-tab.component';
import { FriendTabPage } from '../pages/friend/friend-tab.component';
import { ShopTabPage } from '../pages/shop/shop-tab.component';
import { MomentTabPage } from '../pages/moment/moment-tab.component';
import { AccountTabPage } from '../pages/account/account-tab.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FriendService } from '../services/friend.service';
import { MomentService } from '../services/moment.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    GameTabPage,
    FriendTabPage,
    ShopTabPage,
    MomentTabPage,
    AccountTabPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    GameTabPage,
    FriendTabPage,
    ShopTabPage,
    MomentTabPage,
    AccountTabPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FriendService,
    MomentService,
  ]
})
export class AppModule { }
