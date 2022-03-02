import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { STATES } from 'src/app/services/form-data';
import { AffiliateService } from '../services/affiliates.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  form!: FormGroup;
  states: any[] = STATES;
  addedClients: any[] = [];

  constructor(private fb: FormBuilder, private afl: AffiliateService, private storage: AngularFireStorage, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      client: this.fb.array([]),
    });
  }

  addNewClient() {
    const clientForm = this.fb.group({
      first: [''],
      last: [''],
      address: [''],
      address2: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      phone: [''],
    });

    this.client.push(clientForm);
    console.log(this.form.controls['client'])
    clientForm.valueChanges
      .subscribe(
        data => {
          if(data.valid){
            this.addedClients.push(data);
            localStorage.setItem('affiliate-new-clients', JSON.stringify(this.addedClients));
          }
        }
      )
  }

  deleteClient(index: any) {
    this.client.removeAt(index);
  }

  submitClients() {
    //console.log(payload)
    const newClients = this.form.controls['client'].value
    if(newClients.length > 0){
      this.afl.addAffiliateClients(newClients);
    }
    this.afl.addAffiliateClients(newClients)
  }

  get client() {
    return this.form.controls['client'] as FormArray;
  }
}
