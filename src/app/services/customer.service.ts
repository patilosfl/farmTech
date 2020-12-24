import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customerData } from './customerData'

import { Customer } from './customer';

@Injectable()
export class CustomerService {


    constructor(private http: HttpClient) {
    }

    getCustomers() {
        return this.http.get<any>('assets/customers.json')
            .toPromise()
            .then(res => <Customer[]>res.data)
            .then(data => {
                return data;
            });
    }

    generateNames() {
        let list = customerData.map(i => i.name);
        return list[Math.floor(Math.random() * Math.floor(20))];
    }


    generateDistricts() {
        let list = customerData.map(i => i.city);
        return list[Math.floor(Math.random() * Math.floor(20))];
    }

    generatePhones() {
        let list = customerData.map(i => i.phone);
        return list[Math.floor(Math.random() * Math.floor(20))];
    }

    generateMaps() {
        let list: any = []
        customerData.forEach(element => {
            list.push({ "latitude": element.latitude, "longitude": element.longitude }) 
        });
        return list[Math.floor(Math.random() * Math.floor(20))];
    }
}