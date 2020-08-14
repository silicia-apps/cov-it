import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { registerLocaleData } from '@angular/common';
import it from '@angular/common/locales/it';
import en from '@angular/common/locales/en';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private translateService: TranslateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then((platform) => {
      registerLocaleData(it);
      registerLocaleData(en);
      this.translateService.setDefaultLang('en');
      this.translateService.use(this.translateService.getBrowserLang());
    });
  }
}
