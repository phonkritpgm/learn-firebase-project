    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
    import { getFirestore, doc, collection, getDocs, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
    // import { getDatabase } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

    import { add } from "./moduleJS/math.js";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyB9HXCYZkSCd9N0yPI6yHabX43pyxbDuLc",
      authDomain: "test-nosql-f8cb2.firebaseapp.com",
      databaseURL: "https://test-nosql-f8cb2-default-rtdb.firebaseio.com",
      projectId: "test-nosql-f8cb2",
      storageBucket: "test-nosql-f8cb2.appspot.com",
      messagingSenderId: "390573958579",
      appId: "1:390573958579:web:82bcc21c8b7fb0b0a797c6",
      measurementId: "G-ZVCT3FHT9R"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    //const analytics = getAnalytics(app);
    const db = getFirestore(app);

    const table = document.getElementById("table");
    const form = document.getElementById("addForm");
    const btnDelRow = document.getElementById("delRow");

    async function getUsers(db){
        const userCol = collection(db, 'users');
        const userSnapshot = await getDocs(userCol);
        return userSnapshot;
    }

    function showData(user)
    {

        // console.log(user.data().name);
        // console.log(user.data().email);

        console.log(user.data());

        console.log(user);
        
        const row = table.insertRow(-1);
        row.id = "cellData";
        const nameCol = row.insertCell(0);
        const emailCol = row.insertCell(1);
        const docIdCol = row.insertCell(2);
        const btnDelCol = row.insertCell(3);

        nameCol.innerHTML = user.data().name;
        emailCol.innerHTML = user.data().email;
        //docIdCol.innerHTML = add(1 , 2);
        docIdCol.innerHTML = user.id;

        const btn = document.createElement('button');
        btn.textContent = "Delete";
        btn.setAttribute('class', 'btn btn-danger');
        btn.setAttribute('data-id', user.id);

        btnDelCol.appendChild(btn);

        btn.addEventListener('click', (e) => {

            e.preventDefault();
            const docId = btn.getAttribute("data-id");
            
            const docRef = doc(db, "users", docId);

            deleteDoc(docRef)
            .then(() => {
                //console.log("Entire Document has been deleted successfully.")
                alert("Entire Document has been deleted successfully.");

                loadData();

            })
            .catch(error => {
                alert(error);
            })

        })

        // const ulDoc = document.getElementById("userList");
        // console.log(ulDoc);

        // const nodeDiv = document.createElement("div");
        // const nodeP_UserName = document.createElement("p");
        // const nodeP_Email = document.createElement("p");

        // nodeP_UserName.innerText = "UserName : " + user.data().name;
        // nodeP_Email.innerText = "Email : " + user.data().email

        // console.log(nodeP_UserName);
        
        // nodeDiv.appendChild(nodeP_UserName);
        // nodeDiv.appendChild(nodeP_Email);

        // console.log(nodeDiv);

        // ulDoc.appendChild(nodeDiv)
        
    }

    function delRowCell () {
        // (B1) REMOVE ROW BY ID
        document.getElementById("cellData").remove();
       
        // (B2) REMOVE CELLS BY CSS CLASS
        // for (let c of document.querySelectorAll("#demoC td.cellC")) {
        for (let c of document.querySelectorAll("table #cellData")) {
          c.remove();
        }
    }

    async function loadData()
    {
        if(table.rows.length > 1)
        {
            delRowCell();
        }
        
        const data = await getUsers(db);
        data.forEach(user => {
            showData(user);
        });
    }

    loadData();
  
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addDoc(collection(db, 'users'), {
            name:form.name.value,
            email:form.email.value
        })

        e.er

        form.name.value = "";
        form.email.value = "";

        alert("success .");
        
        loadData();
    })

    function delBtnClick()
    {
        console.log("delete row")
        delRowCell();
    }

    btnDelRow.onclick = delBtnClick;
