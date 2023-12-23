// Car array

let carArray = []

// const licenseInput = document.getElementById('license')
const colorInput = document.getElementById('carColor')
const manufactureInput = document.getElementById('carManufacture')
const modelInput = document.getElementById('carModel')


let tbody = document.getElementById('carTable').getElementsByTagName('tbody')[0];

const editCar = async (license) => {
    
    const carData = {
        "license": license,
        "manufacture": manufactureInput.value,
        "color": colorInput.value,
        "model": modelInput.value
    }

    try {
        // Make a POST request to your Flask server to edit the car
        const response = await axios.post(`/edit_car/${license}`, carData);
        console.log('Car edited:', response.data);
        location.reload();

    } catch (error) {
        
        console.error('Error editing car:', error);
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


// window.onload = updateTable;


