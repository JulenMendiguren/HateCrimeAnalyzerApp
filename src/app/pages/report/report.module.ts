import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
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
        ReportPageRoutingModule
    ],
    declarations: [ReportPage]
})
export class ReportPageModule {}
