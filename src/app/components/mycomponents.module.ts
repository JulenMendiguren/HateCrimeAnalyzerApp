import { NgModule } from "@angular/core";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { TemplateTextboxComponent } from "./template-textbox/template-textbox.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplateNumberComponent } from "./template-number/template-number.component";
import { TemplateLikertComponent } from "./template-likert/template-likert.component";
import { TemplateDatetimeComponent } from "./template-datetime/template-datetime.component";
import { TemplateRadioComponent } from "./template-radio/template-radio.component";
import { TemplateYesnoComponent } from "./template-yesno/template-yesno.component";
import { TemplateMultiselectComponent } from "./template-multiselect/template-multiselect.component";

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [
        GoogleMapsComponent,
        TemplateTextboxComponent,
        TemplateNumberComponent,
        TemplateLikertComponent,
        TemplateDatetimeComponent,
        TemplateRadioComponent,
        TemplateYesnoComponent,
        TemplateMultiselectComponent
    ],
    exports: [
        GoogleMapsComponent,
        TemplateTextboxComponent,
        TemplateNumberComponent,
        TemplateLikertComponent,
        TemplateDatetimeComponent,
        TemplateRadioComponent,
        TemplateYesnoComponent,
        TemplateMultiselectComponent
    ]
})
export class MyComponentsModule {}
