import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from './product';

@Injectable()
export class ProductService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [


        "Channa / Bengal Gram (Whole)",
        "Channa Dal / Split Bengal Gram",
        "Chawli / Lobiya / Cowpea (Black Eye)",
        "Green Peas Dry",
        "Groundnut / Raw Peanuts / Mungaphali / Shengdana",
        "Kabuli Chana / Chickpea",
        "Masoor Dal/Split Red Lentil (Skinless)",
        "Matki Dal/Moth Dal/Turkish Gram (Split)",
        "Pearl Barley / Jau/Barley (Dehusked)",
        "Matki/Moth/Turkish Gram Whole",
        "Moong (Whole)/Green Gram (Whole)",
        "Moong Dal (Chilka)/Split Green Gram (With Skin)",
        "Rajma Jammu",
        "Rajma Sharmili",
        "Soyabean Whole",
        "White Peas Dry",

        "Ambe Mohar Rice (Hand Pounded)",
        "Ambe Mohar Rice (White)",
        "Barley Dalia",
        "Barley Pearl",
        "Basmati Rice (Brown)",
        "Basmati Rice (White)",
        "Corn Flakes",
        "Maize / Corn Whole",
        "Pearl Barley / Jau/Barley (Dehusked)",
        "Wheat Bran",
        "Wheat Daliya",
        "Basmati Rice (Brown)",
        "Basmati Rice (White)",
        "Sooji Rawa",
        "Wheat Whole (Khapli)",
        "White Poha/Beaten Rice",

        "Aalu leaf (Indian Gooseberry)",
        "Adulsa leaves",
        "All spices leaves",
        "Aloevera leaves",
        "Banana big",
        "Baby carrots with green (Mahabaleshwar)",
        "Banana stem",
        "Basli",
        "Beet root",
        "Bitter gourd (Karela)",
        "Bottle gourd (Dudhi)",
        "Figs fresh (Anjir)",
        "Brinjal Aghora (Bharta)",
        "Brinjal Kateri",
        "Broccoli",
        "Cauliflower"
    ];

    category: string[] =  ['Fruits','Vegetables', 'Grains', 'Dal']

    constructor(private http: HttpClient) { }   

    getProducts() {
        return this.http.get<any>('assets/products.json')
            .toPromise()
            .then(res => <Product[]>res.data)
            .then(data => { return data; });
    }   

    generatePrduct(): Product {
        const product: Product = {
            id: this.generateId(),
            name: this.generateName(),
            description: "Product Description",
            price: this.generatePrice(),
            quantity: this.generateQuantity(),
            category: "Product Category",
            inventoryStatus: this.generateStatus(),
            rating: this.generateRating()
        };

        product.name = product.name ? product.name : 'test name';

        product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + ".jpg";;
        return product;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    generateName() {
        return this.productNames[Math.floor(Math.random() * Math.floor(15))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299) + 1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75) + 1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5) + 1);
    }

    generateCategory() {
        return this.category[Math.floor(Math.random() * Math.floor(4))];
    }
}