import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Clocker } from '../_models';
import { AuthService } from '../_services';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockerService {
  private clockerCol: AngularFirestoreCollection<Clocker>;
  clockers$: Observable<Clocker[]>;
  userId: string;

  private currentClockerDoc: AngularFirestoreDocument<Clocker>;
  currentClocker$: Observable<Clocker>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;

        // Clockers history
        this.clockerCol = this.afs.collection<Clocker>(`clockers`, ref =>
          ref.where('userId', '==', user.uid).orderBy('timeIn', 'desc')
        );
        this.clockers$ = this.clockerCol.snapshotChanges().pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data() as Clocker;
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        );

        // Clocker current
        this.currentClockerDoc = this.afs.doc<Clocker>(`current/${user.uid}`);
        this.currentClocker$ = this.currentClockerDoc.valueChanges();
      }
    });
  }

  getClocker(id: string): Observable<Clocker> {
    return this.afs.doc<Clocker>(`clockers/${id}`).valueChanges();
  }

  checkIn(timeIn: number | null): Promise<void> {
    const clocker: Clocker = {
      timeIn: timeIn || Date.now(),
      userId: this.userId
    };

    return this.currentClockerDoc.set(clocker);
  }

  checkOut(
    timeIn: number,
    timeOut: number | null
  ): Promise<(void | firestore.DocumentReference)[]> {
    const clocker: Clocker = {
      timeIn,
      timeOut: timeOut || Date.now(),
      userId: this.userId
    };

    const promises: Promise<void | firestore.DocumentReference>[] = [];
    promises.push(this.currentClockerDoc.delete());
    promises.push(this.clockerCol.add(clocker));

    return Promise.all(promises);
  }
}
