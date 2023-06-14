import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase  ,ref ,onValue} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

    const firebaseConfig = {
          apiKey: "AIzaSyA4nH4_anE2tXfuKc3SQsecAMfCQEGyjsU",
          authDomain: "kapra-collection.firebaseapp.com",
          databaseURL: "https://kapra-collection-default-rtdb.firebaseio.com",
          projectId: "kapra-collection",
          storageBucket: "kapra-collection.appspot.com",
          messagingSenderId: "1079091462046",
          appId: "1:1079091462046:web:0222b69aa20ed0defa608f",
          measurementId: "G-M5TZZ9CFDT"
        };
      
        // Initialize Firebase
        // let data [];
        const app = initializeApp(firebaseConfig);
        const db = getDatabase();
        const starCountRef = ref(db, 'Products/');
        onValue(starCountRef, (snapshot) => {

        });

        // console.log(data)
        export { data }