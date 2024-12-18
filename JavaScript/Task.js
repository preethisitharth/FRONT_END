document.addEventListener("DOMContentLoaded", () => {
    const travelForm = document.getElementById("travelForm");
    const travelRecords = document.getElementById("travelRecords");

    let records = [];
    let currentEditIndex = -1;


    const renderTable = () => {
        travelRecords.innerHTML = records
            .map(
                (record, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${record.destination}</td>
                    <td>${record.date}</td>
                    <td>${record.description}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="viewRecord(${index})">View</button>
                        <button class="btn btn-sm btn-warning" onclick="editRecord(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteRecord(${index})">Delete</button>
                    </td>
                </tr>`
            )
            .join("");
    };


    travelForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const destination = document.getElementById("destination").value;
        const date = document.getElementById("date").value;
        const description = document.getElementById("description").value;

        if (currentEditIndex === -1) {
            records.push({ destination, date, description });
        } else {
            records[currentEditIndex] = { destination, date, description };
            currentEditIndex = -1;
        }

        travelForm.reset();
        renderTable();
    });


    window.viewRecord = (index) => {
        alert(`
            Destination: ${records[index].destination}
            Date: ${records[index].date}
            Description: ${records[index].description}
        `);
    };

    
    window.editRecord = (index) => {
        const record = records[index];
        document.getElementById("destination").value = record.destination;
        document.getElementById("date").value = record.date;
        document.getElementById("description").value = record.description;
        currentEditIndex = index;
    };

    
    window.deleteRecord = (index) => {
        records.splice(index, 1);
        renderTable();
    };

    
    renderTable();
});
