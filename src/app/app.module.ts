import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

/**
 * Native Modules
 */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';


/**
 * Components
 */
/*
  Basic Part
 */
import { MyApp } from './app.component';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signUp/signUp';
import { TabsPage } from '../pages/tabs/tabs';
/*
  Game Part
*/
import { GameTabPage } from '../pages/game/game-tab.component';
import { SearchGamePage } from '../pages/game/search-game/search-game.component';
/*
  Friend Part
*/
import { FriendTabPage } from '../pages/friend/friend-tab.component';
import { FriendChatPage } from '../pages/friend/friend-chat.component';
import { FriendAddPage } from '../pages/friend/friend-add.component';
import { FriendRequestPage } from '../pages/friend/friend-request.component';
/*
  Shop Part
*/
import { ShopTabPage } from '../pages/shop/shop-tab.component';
import { ItemPage } from '../pages/shop/item/item.component';
/*
  Moment Part
*/
import { MomentTabPage } from '../pages/moment/moment-tab.component';
/*
  Account Part
*/
import { AccountTabPage } from '../pages/account/account-tab.component';
import { AccountInfoModify } from '../pages/account/account-info-modify.component';

/**
 * Services & Pipe
 */
import { FriendService } from '../services/friend.service';
import { MomentService } from '../services/moment.service';
import { AccountService } from '../services/account.service';
import { SocketService } from '../services/socket.service';
import { ImgService } from '../services/img.service';
import { GameService } from '../services/game.service';
import { ShopService } from '../services/shop.service';
import { MyDatePipe } from './my-date.pipe';

@NgModule({
  declarations: [
    MyApp,
    MyDatePipe,
    StartPage,
    LoginPage,
    SignUpPage,
    TabsPage,
    GameTabPage,
    FriendTabPage,
    FriendChatPage,
    FriendAddPage,
    FriendRequestPage,
    ShopTabPage,
    MomentTabPage,
    AccountTabPage,
    AccountInfoModify,
    ItemPage,
    SearchGamePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    FriendChatPage,
    FriendAddPage,
    FriendRequestPage,
    ShopTabPage,
    MomentTabPage,
    AccountTabPage,
    AccountInfoModify,
    ItemPage,
    SearchGamePage
  ],
  providers: [
    Camera,
    FileTransfer,
    ImagePicker,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FriendService,
    MomentService,
    AccountService,
    ImgService,
    SocketService,
    GameService,
    ShopService,
  ]
})
export class AppModule {
}
