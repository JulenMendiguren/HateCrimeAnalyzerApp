import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
    canDeactivate: () => any;
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmExitGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';

// import { ComponentNameComponent } from './filename.component';

// // Consider using this interface for all CanDeactivate guards,
// // and have your components implement this interface, too.
// //
// //   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
// //
// // export interface CanComponentDeactivate {
// // canDeactivate: () => any;
// // }

// @Injectable({providedIn: 'root'})
// export class NameGuard implements CanDeactivate<ComponentNameComponent> {
//     canDeactivate(
//         component: ComponentNameComponent,
//         currentRoute: ActivatedRouteSnapshot,
//         currentState: RouterStateSnapshot
//     ): Observable<boolean>|Promise<boolean>|boolean {
//         return false;
//     }
// }
