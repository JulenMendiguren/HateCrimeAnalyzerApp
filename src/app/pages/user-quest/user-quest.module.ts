import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserQuestPageRoutingModule } from './user-quest-routing.module';

import { UserQuestPage } from './user-quest.page';
import { MyComponentsModule } from 'src/app/components/mycomponents.module';
import { GoogleMapsPage } from '../google-maps/google-maps.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        MyComponentsModule,
        TranslateModule,
        UserQuestPageRoutingModule
    ],
    declarations: [UserQuestPage]
})
export class UserQuestPageModule {}
