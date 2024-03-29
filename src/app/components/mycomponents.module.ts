import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateTextboxComponent } from './template-textbox/template-textbox.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TemplateNumberComponent } from './template-number/template-number.component';
import { TemplateLikertComponent } from './template-likert/template-likert.component';
import { TemplateDatetimeComponent } from './template-datetime/template-datetime.component';
import { TemplateRadioComponent } from './template-radio/template-radio.component';
import { TemplateYesnoComponent } from './template-yesno/template-yesno.component';
import { TemplateMultiselectComponent } from './template-multiselect/template-multiselect.component';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleMapsPage } from '../pages/google-maps/google-maps.page';
import { TemplateColectiveComponent } from './template-colective/template-colective.component';

@NgModule({
    imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
    declarations: [
        TemplateTextboxComponent,
        TemplateNumberComponent,
        TemplateLikertComponent,
        TemplateDatetimeComponent,
        TemplateRadioComponent,
        TemplateYesnoComponent,
        TemplateMultiselectComponent,
        TemplateColectiveComponent,
        GoogleMapsPage,
    ],
    exports: [
        TemplateTextboxComponent,
        TemplateNumberComponent,
        TemplateLikertComponent,
        TemplateDatetimeComponent,
        TemplateRadioComponent,
        TemplateYesnoComponent,
        TemplateMultiselectComponent,
        TemplateColectiveComponent,
    ],
    entryComponents: [GoogleMapsPage],
})
export class MyComponentsModule {}
