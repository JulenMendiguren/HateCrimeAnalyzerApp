import { Component, OnInit, Input } from '@angular/core';
import {
    ModalController,
    LoadingController,
    ToastController
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
    LatLng
} from '@ionic-native/google-maps';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-google-maps',
    templateUrl: './google-maps.page.html',
    styleUrls: ['./google-maps.page.scss']
})
export class GoogleMapsPage implements OnInit {
    @Input() markerCoordsString: string;
    map: GoogleMap;
    mapCoords: LatLng;
    markerCoords: LatLng;
    marker: Marker;

    constructor(
        private modalController: ModalController,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.presentLoading();
    }

    loadCoordinates() {
        return new Promise((resolve, reject) => {
            // Si existe una última posición del marker.
            if (this.markerCoordsString) {
                console.log('Hay old pos');
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
                    console.log('LoadCoordinates terminado');
                    resolve('LoadCoordinates terminado');
                });
            } else {
                console.log('No hay old pos');
                LocationService.getMyLocation().then(loc => {
                    this.mapCoords = loc.latLng;
                    this.loadMap().then(() => {
                        console.log('LoadCoordinates terminado');
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
                    'AIzaSyDXrqgEtyMJVBaBuxInwZXR4CQDraSK1ZA',
                API_KEY_FOR_BROWSER_DEBUG:
                    'AIzaSyDXrqgEtyMJVBaBuxInwZXR4CQDraSK1ZA'
            });

            const mapOptions: GoogleMapOptions = {
                camera: {
                    target: this.mapCoords,
                    zoom: 18,
                    tilt: 30
                }
            };

            this.map = GoogleMaps.create('map_canvas', mapOptions);

            this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(latlng => {
                this.markerCoords = latlng[0];
                if (this.marker) {
                    console.log('Hay marker, lo mueve.');
                    this.marker.setPosition(this.markerCoords);
                } else {
                    console.log('No hay marker, crea uno');
                    this.createMarker();
                }
            });
            console.log('LoadMap terminado');
            resolve('LoadMap terminado');
        });
    }

    createMarker() {
        this.marker = this.map.addMarkerSync({
            title: 'Chosen place',
            icon: 'red',
            position: this.markerCoords
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
        const loading = await this.loadingController.create({
            message: 'Loading map...'
        });
        await loading.present();
        await this.loadCoordinates();
        console.log('loading quitado');
        loading.dismiss();
    }

    async presentToastPositionSaved() {
        this.translate
            .get('geolocation.saved_position')
            .subscribe(async (msg: string) => {
                const toast = await this.toastController.create({
                    message: msg,
                    duration: 3000
                });
                toast.present();
            });
    }
}
