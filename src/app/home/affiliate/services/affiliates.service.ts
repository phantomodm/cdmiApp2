import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Affiliate } from './affiliate.model';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  affiliateDoc!: string | undefined;

  affiliateClients = new BehaviorSubject<Affiliate[]>([]);
  affiliateClients$ = this.affiliateClients.asObservable();

  constructor(private afs: AngularFirestore){

  }

  getAffiliateClients(payload: Partial<Affiliate[]>) {
    for (const client of payload) {
      const newClient =  {...client} as Affiliate;
      this.afs.collection('')
    }

  }

  addAffiliateClients(clients:any[]):void {
    console.log(clients)
    const err = [];
    for(let i = 0; i < clients.length; i++){
      const affiliateDoc = this.afs.createId();
      const client = clients[i];
      console.log(client);
      // for(let j =0; j < client.length; j++){
      //   if(client[j].first === ""){
      //     err.push(`Entry ${j+1} is missing a first name and will not be added`);
      //     break;
      //   } else if(client[j].last === ""){
      //     err.push(`Entry ${j+1} is missing a last name. and will not be added`);
      //   }
      // }
      let save$: Observable<any>
      save$ = of(this.afs.collection(`affiliate`).add(client))

      save$.subscribe(data => console.log(data))



    }
    // if(err.length){
    //   alert(err.join("\n"));
    // } else {

    // }
  }


}
