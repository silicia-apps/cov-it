import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { FivExpandableModule } from '@fivethree/core';
import { AppCardComponent } from '../../components/card/card.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    NgxChartsModule,
    FivExpandableModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, AppCardComponent]
})
export class HomePageModule {}
