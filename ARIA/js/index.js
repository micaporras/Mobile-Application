const loading = document.querySelector('.loading');

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        loading.classList.add('no-display');
    }, 2000);
})


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
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
        import { setDoc, doc, collection, getDocs, deleteDoc, addDoc, getDoc, updateDoc} 
            from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
        
        const db = getDatabase();
        const fs_db = getFirestore(app);

        const name = document.getElementById('nameInp');
        const username = document.getElementById('userInp');
        const pass = document.getElementById('passInp');
        const submit = document.getElementById('submitBtn');


        function authenticateUser() {
            const dbRef = ref(db);

            get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
                if (isEmptyOrSpaces(username.value) || isEmptyOrSpaces(pass.value)) {
                    alert("Please fill out all the fields")
                }
                if (snapshot.exists()) {
                    let dbpass = decryptPass(snapshot.val().password);
                    if (dbpass == pass.value) {
                        userLogin(snapshot.val());
                        alert("Login Successfully")
                    }

                    else {
                        alert("Login Unsuccessful! Invalid Password");
                    }
                
                }

                else {
                    alert("User does not exist");
                }
            });
        }

        function decryptPass(dbpass) {
            var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
            return pass12.toString(CryptoJS.enc.Utf8);
        }

        function userLogin(user) {
            let keepLoggedIn = document.getElementById('keepLoggedIn').checked;

            if (!keepLoggedIn) {
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location = "home.html";
            }

            else {
                localStorage.setItem('keepLoggedIn', 'yes');
                localStorage.setItem('user', JSON.stringify(user));
                window.location = "home.html";
            }
        }

        function isEmptyOrSpaces(str) {
            return str === null || str.match(/^ *$/) !== null;
        }


        submit.addEventListener('click', () => {
            authenticateUser();
            checkDB();
        });

        async function checkDB() {
            const docRef = doc(fs_db, "users", username.value);
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                calendarDB();
                todoDB();
                habitDB();
                dumpDB();
                console.log(docSnap.data());
            } else {
                console.log("oops")
            }
        }

        async function calendarDB() {
            const docRef = doc(fs_db, "users", username.value, "calendar", "date");
            await setDoc(docRef , {
                day: "",
                month: "",
                year: "2023",
                events: ["", ""]
            })
        }

        async function todoDB() {
            const docRef = doc(fs_db, "users", username.value, "to-do list", "list");
            await setDoc(docRef , {
                activity: "",
                status: ""
            })
        }


        async function habitDB() {
            const docRef = doc(fs_db, "users", username.value, "habit tracker", "habit1");
            await setDoc(docRef , {
                date_started: "",
                current_month: "July",
                duration: "31 days"
            })
        }

        async function dumpDB() {
            const docRef = doc(fs_db, "users", username.value, "brain dump", "dump1");
            await setDoc(docRef , {
                title: "",
                description: ""
            })
        }

        // async function deleteAcc() {
        //     await deleteDoc(doc(fs_db, "users", username.value))
        // }

        

        

