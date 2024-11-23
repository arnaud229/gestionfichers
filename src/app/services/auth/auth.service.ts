import { Injectable, Injector } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";



import { BehaviorSubject } from "rxjs";

import { Service } from "../../../model/variable";
import { LocalstorageService } from "../localStorages/localStorages.service";
import { UsersService } from "../firebase/user.service";





@Injectable({
    providedIn: 'root',
  })
  export class AuthService  {


    userTempService: any;

    
    constructor(
        private fbauth: AngularFireAuth,
        private localStorageService: LocalstorageService,
        private firestore: AngularFirestore,
        private injector: Injector,
        private router: Router,
       
  
      ) {
        this.reloadUser();
      }       
        
      async reloadUser() {
        this.fbauth.authState.subscribe(async (res) => {

          if (res) {
            const user = res.toJSON() as any;
            console.log("user", user);
            
            this.userTempService = this.injector.get(UsersService);
            const userData = await this.userTempService
              .getUser(user.uid)
              .toPromise();
    
            const idToken = await res.getIdToken()
            this.localStorageService.setFirebaseAuthState({ ...res, idToken });
            this.localStorageService.setCurrentUser({
              id: user.uid,
              ...user,
              ...userData,
            });
          }
        });
      }
      

  async getUser(userId: string): Promise<any> {
    const userDocRef = this.firestore.doc(`utilisateurs/${userId}`);
    const userDoc = await userDocRef.get().toPromise();
    if (userDoc?.exists) {
      return userDoc.data() as any;
    } else {
      return null; // Ou gérer l'erreur différemment
    }
  }

 

  async getCurrentUserFirebaseIdToken() {
    console.log('getCurrentUserFirebaseIdToken :>> ');
    return this.localStorageService.getFirebaseAuthState()?.idToken
   
  }


  async set_user_info(uid: string, value: any) {
   
    
     const user: Service = {
       nom_service: value.nom_service,
       nom: value.nom,
       prenoms: value.prenoms,
       mail: value.mail,
       mdp: value.mdp,
     }
    await this.firestore
      .collection('utilisateurs')
      .doc(uid)
      .set(user)
      .then(() => console.log("c'est fait l'insertion"))
      .catch((error: { code: any; message: any }) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('vous aviez une erreur ' + errorCode + ': ' + errorMessage);
      });
  }


  async createFirebaseUser(user: any) {
    await this.fbauth
      .createUserWithEmailAndPassword(user.mail, user.mdp)
      .then((res: any) => {
        // console.log(res);
        // console.log('valeur avant setInfos', user); 
        
        this.set_user_info(res.user.uid, user)
          .then((userData) => {
            console.log('titi je suis dedans');
            
            console.log('userData :>> ', userData);
            this.fbauth
              .signOut()
              .then(() => {
                console.log('succès ');
              })
              .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(
                  'vous aviez une erreur 1 ' + errorCode + ' : ' + errorMessage
                );
              });
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(
              'vous aviez une erreur 2 ' + errorCode + ' : ' + errorMessage
            );
          });
          console.log("avant le log");    
          this.router.navigate(['../signin']);
      
      })
    // .catch((error: any) => {
    //   console.log('toto12');

    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   console.log(
    //     'vous aviez une erreur 3 ' + errorCode + ': ' + errorMessage
    //   );
    // });
  } 
      
     


  signInWithFirebase(data: any) {
    return this.fbauth.signInWithEmailAndPassword(data.mail, data.mdp);
  }

  resetPassword(mail: string) {
    return new Promise((resolve, reject) => {

      this.fbauth
        .sendPasswordResetEmail(mail)
        .then(() => {
          resolve(true)
          console.log('un message vous a été envoyer par email. vérifiez svp');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          reject(error)
          console.log(
            'vous aviez une erreur ' + errorCode + ' : ' + errorMessage
          );
        });
    })

  }


      
  }