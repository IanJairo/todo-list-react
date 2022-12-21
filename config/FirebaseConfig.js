
import * as firebase from 'firebase'
import 'firebase/firestore';
import "firebase/auth";

// Informações do projeto criado no Firebase
var config = {
  apiKey: "AIzaSyDADzDxUa7zraiHTh_7C2SHXD-uIxh5me8",
  authDomain: "todo-d45d9.firebaseapp.com",
  databaseURL: "https://todo-d45d9.firebaseio.com",
  projectId: "todo-d45d9",
  storageBucket: "todo-d45d9.appspot.com",
  messagingSenderId: "310462950800",
  appId: "1:310462950800:web:ed0b3951090b4228869715"
};

// Inicializa o Firebase

export const database = firebase.initializeApp(config);



