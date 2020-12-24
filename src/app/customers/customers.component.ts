import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../services/customer';
import { CustomerService } from '../services/customer.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css'],
    styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
})
export class CustomersComponent implements OnInit {

    lat = 17.597683;
    lng = 74.087048;
    isModal = false;


    customerDialog: boolean;

    customers: Customer[];

    customer: Customer;

    selectedCustomers: Customer[];

    submitted: boolean;

    constructor(private customerService: CustomerService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.customerService.getCustomers().then((data: Customer[]) => {
            data.forEach(customer => {
                customer.name = this.customerService.generateNames();
                customer.district = this.customerService.generateDistricts();
                customer.contact = this.customerService.generatePhones();
                customer.location = this.customerService.generateMaps();
            });
            this.customers = data;
        });
    }

    setMap(lat,long) {       

        // this.lat = lat;
        // this.lng = long;
        this.isModal = true;
    }

    closeMap(){

        this.isModal = false;


    }




    openNew() {
        this.customer = {};
        this.submitted = false;
        this.customerDialog = true;
    }

    deleteSelectedCustomers() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.customers = this.customers.filter(val => !this.selectedCustomers.includes(val));
                this.selectedCustomers = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editCustomer(customer: Customer) {
        this.customer = { ...customer };
        this.customerDialog = true;
    }

    deleteCustomer(customer: Customer) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + customer.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.customers = this.customers.filter(val => val.id !== customer.id);
                this.customer = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.customerDialog = false;
        this.submitted = false;
    }

    saveCustomer() {
        this.submitted = true;

        if (this.customer.name.trim()) {
            if (this.customer.id) {
                this.customers[this.findIndexById(this.customer.id)] = this.customer;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                this.customer.id = this.createId();
                this.customer.image = 'product-placeholder.svg';
                this.customers.push(this.customer);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.customers = [...this.customers];
            this.customerDialog = false;
            this.customer = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }


}
