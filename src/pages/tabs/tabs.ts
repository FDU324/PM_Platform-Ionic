import { Component } from '@angular/core';

import { GameTabPage } from '../game/game-tab.component';
import { FriendTabPage } from '../friend/friend-tab.component';
import { ShopTabPage } from '../shop/shop-tab.component';
import { MomentTabPage } from '../moment/moment-tab.component';
import { AccountTabPage } from '../account/account-tab.component';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GameTabPage;
  tab2Root = FriendTabPage;
  tab3Root = ShopTabPage;
  tab4Root = MomentTabPage;
  tab5Root = AccountTabPage;

  constructor() {

  }
}
