
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB3Y_wjvicJYUpHHaQE3LGW-9Wf4Oy8BH4",
  authDomain: "nuxt-blog-c51f1.firebaseapp.com",
  projectId: "nuxt-blog-c51f1",
  storageBucket: "nuxt-blog-c51f1.appspot.com",
  messagingSenderId: "609489638372",
  appId: "1:609489638372:web:40a141f63e4a2a35f66df1",
  measurementId: "G-WX3H3Y8W57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);