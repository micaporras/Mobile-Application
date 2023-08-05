import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
          
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyAKACrvxUWMvSqxXznfGYBEZhYxqQUvS6M",
            authDomain: "aria-b0daa.firebaseapp.com",
            databaseURL: "https://aria-b0daa-default-rtdb.firebaseio.com",
            projectId: "aria-b0daa",
            storageBucket: "aria-b0daa.appspot.com",
            messagingSenderId: "1069092147011",
            appId: "1:1069092147011:web:69c5cb65f00fe29cd429f6"
            };
          
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        import { getDatabase, ref, set, child, get, update, remove }
            from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
        import { setDoc, doc, collection, getDocs, deleteDoc, addDoc, } 
            from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

        const db = getDatabase();
        const auth = getAuth();
        const fs_db = getFirestore(app);

        const name = document.getElementById('nameInp');
        const email= document.getElementById('emailInp');
        const username = document.getElementById('userInp');
        const pass = document.getElementById('passInp');
        const submit = document.getElementById('submitBtn');

    
        function isEmptyOrSpaces(str) {
            return str === null || str.match(/^ *$/) !== null;
        }

        function Validation() {
            let nameReg = /^[a-zA-Z\s]+$/;
            let emailReg = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;
            let userReg = /^[a-zA-Z0-9]{5,}$/;

            if (isEmptyOrSpaces(name.value) || isEmptyOrSpaces(email.value) || isEmptyOrSpaces(username.value) 
            || isEmptyOrSpaces(pass.value)) {
                alert('Please fill out all the fields')
                return false;
            }

            if (!nameReg.test(name.value)) {
                alert("Name should only contain alphabets");
                return false;
            }

            if (!emailReg.test(email.value)) {
                alert("Please enter a valid email");
                return false;
            }

            if (!userReg.test(username.value)) {
                alert("Username can only be:\nAlphanumeric\nAtleast 5 characters\nNo special characters");
                return false;
            }

            return true;
           }

        function RegisterUser() {
            const dbRef = ref(db);

            if (!Validation()) {
                return;
            };

            get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
                if (snapshot.exists()) {
                    alert("Account Already Exist!");
                }

                else {
                    const email= document.getElementById('emailInp').value;
                    const pass= document.getElementById('passInp').value;
                    createUserWithEmailAndPassword(auth, email, pass)
                    set(ref(db, "UsersList/" + username.value), 
                    {
                        fullname: name.value,
                        email: email,
                        username: username.value,
                        password: encryptPass()
                    })
                    .then(() => {
                        alert("Signed In Successfully!");
                        window.location = "login.html";
                    })
                    .catch((error) => {
                        alert("error"+ error);
                    })
                }
            });
        }

        function encryptPass() {
            var pass12 = CryptoJS.AES.encrypt(pass.value, pass.value);
            return pass12.toString();
        }

        submit.addEventListener('click', () => {
            RegisterUser();
            addUser();
        });
        
        const colRef = collection(fs_db, "users");

        getDocs(colRef).then((snapshot) => {
            let users = []
            snapshot.docs.forEach((doc) => {
                users.push({...doc.data(), id:doc.id})
            })
            console.log(users)
        });
       
       async function addUser() {
            const ref = doc(fs_db, "users", username.value);
            const add = await setDoc(ref, {
                name: name.value,
                username: username.value
            })
       }


    

        

