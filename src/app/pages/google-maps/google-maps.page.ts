import { Component, OnInit, Input } from '@angular/core';
import {
    ModalController,
    LoadingController,
    ToastController,
    Platform,
} from '@ionic/angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    Environment,
    LocationService,
    LatLng,
} from '@ionic-native/google-maps';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.page.html',
    styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {
    @Input() markerCoordsString: string;
    map: GoogleMap;
    mapCoords: LatLng;
    markerCoords: LatLng;
    marker: Marker;
    loading: any;

    constructor(
        private modalController: ModalController,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private translate: TranslateService,
        private platform: Platform
    ) {}

    async ngOnInit() {
        await this.platform.ready();
        await this.presentLoading();
        await this.loadCoordinates();
        this.loading.dismiss();
    }

    loadCoordinates() {
        return new Promise((resolve, reject) => {
            // Si existe una última posición del marker.
            if (this.markerCoordsString) {
                const splitCoords = this.markerCoordsString.split(',');
                this.mapCoords = new LatLng(
                    Number(splitCoords[0]),
                    Number(splitCoords[1])
                );

                this.loadMap().then(() => {
                    this.markerCoords = this.mapCoords;
                    if (this.marker) {
                        this.marker.setPosition(this.markerCoords);
                    } else {
                        this.createMarker();
                    }
                    resolve('LoadCoordinates terminado');
                });
            } else {
                console.log('No hay old pos');
                LocationService.getMyLocation().then((loc) => {
                    this.mapCoords = loc.latLng;
                    this.loadMap().then(() => {
                        resolve('LoadCoordinates terminado');
                    });
                });
            }
        });
    }

    loadMap() {
        return new Promise((resolve, reject) => {
            // This code is necessary for browser
            Environment.setEnv({
                API_KEY_FOR_BROWSER_RELEASE:
                    'AIzaSyDIX2vGHejj97MjhQHR4djCY3GlFI-4fTg',
                API_KEY_FOR_BROWSER_DEBUG:
                    'AIzaSyDIX2vGHejj97MjhQHR4djCY3GlFI-4fTg',
            });

            const mapOptions: GoogleMapOptions = {
                camera: {
                    target: this.mapCoords,
                    zoom: 18,
                    tilt: 30,
                },
            };

            this.map = GoogleMaps.create('map_canvas', mapOptions);

            this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((latlng) => {
                this.markerCoords = latlng[0];
                if (this.marker) {
                    this.marker.setPosition(this.markerCoords);
                } else {
                    this.createMarker();
                }
            });
            resolve('LoadMap terminado');
        });
    }

    createMarker() {
        this.marker = this.map.addMarkerSync({
            icon: 'red',
            position: this.markerCoords,
        });
    }

    async closeMap() {
        if (this.markerCoords) {
            this.markerCoordsString =
                this.markerCoords.lat + ',' + this.markerCoords.lng;
            this.presentToastPositionSaved();
        }

        await this.modalController.dismiss(this.markerCoordsString);
    }

    async presentLoading() {
        const message = this.translate.instant('geolocation.loading');
        this.loading = await this.loadingController.create({
            message,
        });
        await this.loading.present();
    }

    async presentToastPositionSaved() {
        this.translate
            .get('geolocation.saved_position')
            .subscribe(async (msg: string) => {
                const toast = await this.toastController.create({
                    message: msg,
                    duration: 3000,
                });
                toast.present();
            });
    }
}
