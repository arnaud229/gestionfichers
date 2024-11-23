import { Injectable } from "@angular/core";



const stringifyJson = (json: any) => JSON.stringify(json);
const parseJsonString = (jsonStr: string) => JSON.parse(jsonStr);


@Injectable({
    providedIn: 'root',
  })
  export class LocalstorageService {
    
    key_currentUser = 'currentUser';
    key_FirebaseAuthState = 'FirebaseAuthState';
    key_isAuthenticated = 'key_isAuthenticated';
    key_hasAlreadySeenAppWelcomeSlider = 'key_hasAlreadySeenAppWelcomeSlider';
    key_isFirstTimeUserLaunchApp = 'isFirstTimeUserLaunchApp';
    

    constructor() { }

    logout() {
        this.deleteIsAuthenticated()
        this.deleteFirebaseAuthState()
        this.deleteCurrentUser()
      }

      setCurrentUser(data: any) {
        if (data) {
        //   if (!data.nom) data.nom = 'admin'
          this.setIsAuthenticated(true);
          const uid = data.uid;
        } else {
          this.setIsAuthenticated(false);
        }
    
        localStorage.setItem(this.key_currentUser, stringifyJson(data));
      }

      

      getCurrentUser() {
        const user = localStorage.getItem(this.key_currentUser);
        if (!user) return null;
        return parseJsonString(user);
      }

      get currentUserId() {
        const user = this.getCurrentUser();
        if (user) return user.uid;
        return null;
      }

      setFirebaseAuthState(data: any) {
        localStorage.setItem(this.key_FirebaseAuthState, JSON.stringify(data));
      }
      getFirebaseAuthState() {
        const item = localStorage.getItem(this.key_FirebaseAuthState);
        if (!item) return null;
        return parseJsonString(item);
      }
     

       //have seen onboarding slider
  setHasAlreadySeenAppWelcomeSlider(data: any) {
    localStorage.setItem(this.key_hasAlreadySeenAppWelcomeSlider, data);
  }
  getHasAlreadySeenAppWelcomeSlider() {
    return localStorage.getItem(this.key_hasAlreadySeenAppWelcomeSlider) === 'true';
  }

  //is First time launch
  setIsFirstTimeUserLaunchApp(data: any) {
    localStorage.setItem(this.key_isFirstTimeUserLaunchApp, data);
  }
  getIsFirstTimeUserLaunchApp() {
    return localStorage.getItem(this.key_isFirstTimeUserLaunchApp) === 'true';
  }
  deleteIsFirstTimeUserLaunchApp() {
    localStorage.removeItem(this.key_isFirstTimeUserLaunchApp);
  }
  
      deleteIsAuthenticated() {
        localStorage.removeItem(this.key_isAuthenticated);
      }

      deleteFirebaseAuthState() {
        localStorage.removeItem(this.key_FirebaseAuthState);
      }

      deleteCurrentUser() {
        localStorage.removeItem(this.key_currentUser);
      }

       //is Authenticated
      setIsAuthenticated(data: any) {
        localStorage.setItem(this.key_isAuthenticated, data);
      }


  }