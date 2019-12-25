import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPageRoutingModule } from './report-routing.module';

import { ReportPage } from './report.page';
import { MyComponentsModule } from 'src/app/components/mycomponents.module';
import { GoogleMapsPage } from '../google-maps/google-maps.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyComponentsModule,
        ReportPageRoutingModule
    ],

    declarations: [ReportPage, GoogleMapsPage],
    entryComponents: [GoogleMapsPage]
})
export class ReportPageModule {}
