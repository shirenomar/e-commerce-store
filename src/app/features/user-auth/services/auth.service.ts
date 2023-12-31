import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/core/models/user';
import { UsersUtils } from 'src/app/shared/utils/users.utils';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDate!: User;
  constructor() { }

  signIn(userCredintials: { name: string, password: string }): User | undefined {
    let validUSer = UsersUtils.Users.find((user) => userCredintials.name?.trim().toLowerCase() == user.name && userCredintials.password?.trim().toLowerCase() == user.password);
    if (validUSer) this.setUserData(validUSer)
    return validUSer;
  }

  setUserData(user: User) {
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), 'privatekey').toString()
    sessionStorage.setItem("UserData", encryptedUser)
  }


  getUserData(): User | null {
    const user = sessionStorage.getItem("UserData");
    if (user) {
      const decryptedUser = CryptoJS.AES.decrypt(user, 'privatekey').toString(CryptoJS.enc.Utf8)
      return JSON.parse(decryptedUser) as User;
    } else { return null; }
  }

  signOut() {
    sessionStorage.removeItem("UserData")
  }
}
