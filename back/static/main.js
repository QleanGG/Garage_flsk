// Car array

let carArray = []

const fetchCarData = async () => {
    try {
        const response = await axios.get('/get_cars');
        if (response.status === 200) {
            // Data was successfully fetched, update carArray
            carArray = response.data;
        } else {
            // Handle other status codes if needed
            console.error('Failed to fetch data. Status code:', response.status);
        }
    } catch (error) {
        // Handle any network errors
        console.error('Network error:', error);
    }
}

let tbody = document.getElementById('carTable').getElementsByTagName('tbody')[0];

const editCar = async (license) => {
    await axios.post('/edit_car')
}

const delCar = async (license) => {
    try {
        const response = await axios.post(`/del_car/${license}`);
        if (response.status === 200) {
            // Car was successfully deleted
            console.log('Car deleted successfully');
          
            updateTable(); 
        } else {
            console.error('Failed to delete car:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred while deleting the car:', error);
    }
}

async function updateTable() {
    // syncs from Json file
    await fetchCarData()
    tbody.innerHTML = "";

    for (let i = 0; i < carArray.length; i++) {
        let row = tbody.insertRow();
        let cell1 = document.createElement('td');
        let cell2 = document.createElement('td');
        let cell3 = document.createElement('td');
        let cell4 = document.createElement('td');
        let cell5 = document.createElement('td'); // For Edit button
        let cell6 = document.createElement('td'); // For Delete button

        cell1.textContent = carArray[i].license;
        cell2.textContent = carArray[i].manufacture;
        cell3.textContent = carArray[i].color;
        cell4.textContent = carArray[i].model;
        
        // create an edit button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editCar(cell1.textContent);
        cell5.appendChild(editButton);

        //creating a delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => delCar(cell1.textContent);
        cell6.appendChild(deleteButton)

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        row.appendChild(cell6);
    }
}


async function clearGarage() {
    if (confirm("Are you sure you want to delete the database?") == true) {
        console.log('User confirmed deletion.');
        try {
            await axios.post('/delete_all');
            updateTable();
            alert('Database Deleted');
        } catch (error) {
            console.error('Error deleting database:', error);
        }
    }
}


// function removeSpecificCar() {
//     carArray.splice(removeArrayNumber.value, 1);
//     console.log(carArray);
//     updateTable();
// }

// function removeCarWithLicense() {
//     for (let i = 0; i < carArray.length; i++) {
//         if (carArray[i].license == licenseRemove.value) {
//             carArray.splice(i, 1);
//         }
//     }
//     updateTable();
// }

window.onload = updateTable;


