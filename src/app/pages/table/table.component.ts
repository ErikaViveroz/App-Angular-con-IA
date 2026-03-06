import { Component, OnInit } from '@angular/core';

export interface WifiPoint {
    id: number;
    latitud: string;
    longitud: string;
}

@Component({
    selector: 'table-cmp',
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {

    wifiPoints: WifiPoint[] = [];
    filteredWifiPoints: WifiPoint[] = [];

    searchText: string = '';
    totalPoints = 0;
    limit = 20;

    ngOnInit() {

        fetch('assets/data/wifi.json')
            .then(res => res.json())
            .then(data => {

                this.wifiPoints = data;
                this.totalPoints = data.length;

                // mostrar primeros registros
                this.filteredWifiPoints = this.wifiPoints.slice(0, this.limit);

            });

    }

    search() {

        if (!this.searchText) {

            this.filteredWifiPoints = this.wifiPoints.slice(0, this.limit);
            return;

        }

        this.filteredWifiPoints = this.wifiPoints
            .filter(p =>
                p.id.toString().includes(this.searchText) ||
                p.latitud.toString().includes(this.searchText) ||
                p.longitud.toString().includes(this.searchText)
            )
            .slice(0, this.limit);

    }

}