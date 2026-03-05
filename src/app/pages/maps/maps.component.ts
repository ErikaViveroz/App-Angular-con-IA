import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {

    map: any;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        const cdmx = new google.maps.LatLng(19.4326, -99.1332);

        const mapOptions = {
            zoom: 12,
            center: cdmx,
            scrollwheel: false
        };

        this.map = new google.maps.Map(
            document.getElementById("map"),
            mapOptions
        );

        this.loadWifiPoints();
    }

    loadWifiPoints() {
        this.http.get<any[]>('assets/data/wifi.json')
            .subscribe(data => {

                data.forEach(point => {

                    const marker = new google.maps.Marker({
                        position: {
                            lat: parseFloat(point.latitud),
                            lng: parseFloat(point.longitud)
                        },
                        map: this.map,
                        title: point.id
                    });

                });

            });
    }
}
