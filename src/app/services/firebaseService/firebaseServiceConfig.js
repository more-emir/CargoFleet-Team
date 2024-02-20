const prodConfig = {
  apiKey: 'AIzaSyDqO-Tbo7xu4ggObu_Ug-jt5myh79apJsQ',
  authDomain: 'cargofleet-e2283.firebaseapp.com',
  databaseURL: 'https://cargofleet-e2283-default-rtdb.firebaseio.com',
  projectId: 'cargofleet-e2283',
  storageBucket: 'cargofleet-e2283.appspot.com',
  messagingSenderId: '1029160249603',
  appId: '1:1029160249603:web:d2674beee810eb1cb5a136',
  measurementId: 'G-ME531YV7SN'
};
const devConfig = {
  apiKey: 'AIzaSyDqO-Tbo7xu4ggObu_Ug-jt5myh79apJsQ',
  authDomain: 'cargofleet-e2283.firebaseapp.com',
  databaseURL: 'https://cargofleet-e2283-default-rtdb.firebaseio.com',
  projectId: 'cargofleet-e2283',
  storageBucket: 'cargofleet-e2283.appspot.com',
  messagingSenderId: '1029160249603',
  appId: '1:1029160249603:web:d2674beee810eb1cb5a136',
  measurementId: 'G-ME531YV7SN'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;


export default config;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDqO-Tbo7xu4ggObu_Ug-jt5myh79apJsQ",
//   authDomain: "cargofleet-e2283.firebaseapp.com",
//   databaseURL: "https://cargofleet-e2283-default-rtdb.firebaseio.com",
//   projectId: "cargofleet-e2283",
//   storageBucket: "cargofleet-e2283.appspot.com",
//   messagingSenderId: "1029160249603",
//   appId: "1:1029160249603:web:d2674beee810eb1cb5a136",
//   measurementId: "G-ME531YV7SN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
