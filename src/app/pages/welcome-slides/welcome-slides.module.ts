import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeSlidesPageRoutingModule } from './welcome-slides-routing.module';

import { WelcomeSlidesPage } from './welcome-slides.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        WelcomeSlidesPageRoutingModule,
    ],
    declarations: [WelcomeSlidesPage],
})
export class WelcomeSlidesPageModule {}
