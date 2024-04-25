import firebase, { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
class FirebaseService {
  private app: any;
  private auth: any;
  private confirmationResult: any;
  // private appVerifier: RecaptchaVerifier;
  private firebaseConfig = {
    apiKey: "AIzaSyApIBcgj5fcryq-55J7atVBrgbtO-eP0h4",
    authDomain: "agrichikitsa-8be74.firebaseapp.com",
    projectId: "agrichikitsa-8be74",
    storageBucket: "agrichikitsa-8be74.appspot.com",
    messagingSenderId: "137132429712",
    appId: "1:137132429712:web:a6374f3321411d724c6315",
    measurementId: "G-7WPTBL8LPN",
  };
  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth();
    console.log("Connected to Firebase");
  }
  async getOTP(phoneNumber: string) {
    const formattedPhoneNumber = `+91${phoneNumber}`;
    const recaptchaVerifier = new RecaptchaVerifier(
      this.auth,
      "recaptcha-container",
      {}
    );
    const confirmationResult = await signInWithPhoneNumber(
      this.auth,
      formattedPhoneNumber,
      recaptchaVerifier
    );
    this.confirmationResult = confirmationResult;
    return this.confirmationResult !== undefined;
  }
  async verifyOTP(verificationCode: string) {
    return await this.confirmationResult.confirm(verificationCode);
  }
}
export const firebaseServices = new FirebaseService();
