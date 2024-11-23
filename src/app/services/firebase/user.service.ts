import { Injectable, Injector } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthService } from "../auth/auth.service";
import { applyPagination, orderByQuery, whereQuery } from "./firebase-utils";
import { BehaviorSubject, map } from "rxjs";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getBlob
} from 'firebase/storage';
import { Service } from "../../../model/variable";




@Injectable({
    providedIn: 'root',
  })
  export class UsersService {

 
   isAuthenticated = false;
    constructor(
      public fbauth: AngularFireAuth,
      public firestore: AngularFirestore,
      private authService: AuthService,
      private injector: Injector
    ) {
      this.fbauth.authState.subscribe((res) => {
        this.isAuthenticated = true;
      });
  
      // listen to utilisateurs collections changes
      this.firestore
        .collection('utilisateurs')
        .snapshotChanges()
        .subscribe((snaps) => {
          this.authService.reloadUser();
        });
    }

    getAuthState() {
        return this.fbauth.authState;
      }
      async getCurrentUserId() {
        const user = await this.fbauth.currentUser;
        return (user && user.uid) || null;
      }


      getUsers(data: any) {
        const { pagination, filters } = data;
        console.log('filters', filters);
        const { startAt, limit } = pagination || {};
        const { whereQueries, orderByQueries, like } = filters || {};
        const collection = this.firestore.collection<any>('utilisateurs', (ref) => {
        
          return applyPagination(
            orderByQuery(whereQuery(ref, whereQueries), orderByQueries),
            pagination
          );
        });
    
        const result$ = collection.snapshotChanges().pipe(
          map((snapshots: any[]) => {
            const data = snapshots.map((snap) => {
              const data = snap.payload.doc.data();
              const id = snap.payload.doc.id;
              return { id, ...data };
            });
            var lastVisible = snapshots[snapshots.length - 1]?.payload?.doc;
            return { data, lastVisible };
          })
        );
        console.log('result$ :>> ', result$);
        return result$;
      }

      getUser(uid: string) {
        const that = this;
        return this.firestore
          .collection('utilisateurs')
          .doc(uid)
          .get()
          .pipe(
            map((data) => {
              return data.data() as Service;
            })
          );
      }

 


 


   
    
  }