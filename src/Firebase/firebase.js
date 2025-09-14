// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  sendSignInLinkToEmail, 
  signInWithPopup,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaiq4nyfJNoEAySdbgdgHOGqJTVfK64jU",
  authDomain: "sihhack-ce03b.firebaseapp.com",
  projectId: "sihhack-ce03b",
  storageBucket: "sihhack-ce03b.firebasestorage.app",
  messagingSenderId: "435430290197",
  appId: "1:435430290197:web:6fca54049a8d09ef49af1c",
  measurementId: "G-176MYEKM8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export authentication methods
export { 
  auth, 
  googleProvider, 
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  signOut
};

export default app;