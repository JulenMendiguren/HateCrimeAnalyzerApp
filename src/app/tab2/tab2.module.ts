import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { testUserAgent } from "@ionic/core/dist/types/utils/platform";
import { MyComponentsModule } from "../components/mycomponents.module";
import { GoogleMapsPage } from "../pages/google-maps/google-maps.page";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,

        MyComponentsModule,
        RouterModule.forChild([{ path: "", component: Tab2Page }])
    ],
    declarations: [Tab2Page, GoogleMapsPage],
    entryComponents: [GoogleMapsPage]
})
export class Tab2PageModule {}
