document.addEventListener('DOMContentLoaded', () => {
    console.log("Admin Dashboard loaded!");

    const propertyList = document.getElementById('property-list');
    const editPropertyModal = document.getElementById('edit-property-modal');
    const viewLeadsModal = document.getElementById('view-leads-modal');
    const viewSchedulesModal = document.getElementById('view-schedules-modal');

    // Dummy Properties Data
    const properties = [
        { id: 1, location: "Time Square", price: 2000, area: 2000, bedrooms: 2, bathrooms: 2, broker: "Deshpande Properties", image: "images/property1.jpg" },
        { id: 2, location: "Central Park", price: 3000, area: 2500, bedrooms: 3, bathrooms: 2, broker: "ABC Realty", image: "images/property2.jpg" },
        // Add more dummy properties as needed
    ];

    // Display Properties
    function displayProperties(data) {
        propertyList.innerHTML = "";
        data.forEach(property => {
            const propertyTile = document.createElement('div');
            propertyTile.classList.add('property-tile');
            propertyTile.innerHTML = `
                <div class="property-image">
                    <img src="${property.image}" alt="Property Image">
                </div>
                <div class="property-info">
                    <h3>${property.bedrooms} BHK in ${property.location}</h3>
                    <p>Location: ${property.location}, Price: ${property.price} Rs, Area: ${property.area} sq. ft.</p>
                    <p>Bedrooms: ${property.bedrooms}, Bathrooms: ${property.bathrooms}</p>
                    <p>Broker: ${property.broker}</p>
                    <button class="edit-property" data-id="${property.id}">Edit</button>
                    <button class="remove-property" data-id="${property.id}">Remove</button>
                    <button class="view-schedules" data-id="${property.id}">View Schedules</button>
                    <button class="view-leads" data-id="${property.id}">View Leads</button>
                </div>
            `;
            propertyList.appendChild(propertyTile);
        });

        // Add Event Listeners for Buttons
        document.querySelectorAll('.edit-property').forEach(button => {
            button.addEventListener('click', openEditModal);
        });
        
        document.querySelectorAll('.view-leads').forEach(button => {
            button.addEventListener('click', openLeadsModal);
        });

        document.querySelectorAll('.view-schedules').forEach(button => {
            button.addEventListener('click', openSchedulesModal);
        });
    }
    
    displayProperties(properties);

    // Open Edit Modal
    function openEditModal(event) {
        const propertyId = event.target.dataset.id;
        const property = properties.find(prop => prop.id == propertyId);
        document.getElementById('edit-location').value = property.location;
        editPropertyModal.style.display = 'block';
    }

    // Open Leads Modal
    function openLeadsModal(event) {
        viewLeadsModal.style.display = 'block';
        const leadsData = [
            { timeSlot: "10:00 AM", broker: "Deshpande Properties", clientName: "John Doe", contact: "123-456-7890" },
            { timeSlot: "11:00 AM", broker: "ABC Realty", clientName: "Jane Smith", contact: "987-654-3210" },
        ];
        const leadsTable = document.getElementById('leads-table').querySelector('tbody');
        leadsTable.innerHTML = "";
        leadsData.forEach(lead => {
            const row = leadsTable.insertRow();
            row.innerHTML = `<td>${lead.timeSlot}</td><td>${lead.broker}</td><td>${lead.clientName}</td><td>${lead.contact}</td>`;
        });
    }

    // Open Schedules Modal
    function openSchedulesModal(event) {
        const propertyId = event.target.dataset.id;
        viewSchedulesModal.style.display = 'block';
        
        const schedulesData = [
            { timeSlot: "Monday 10:00 AM" },
            { timeSlot: "Wednesday 2:00 PM" },
            { timeSlot: "Friday 4:00 PM" }
        ];
        
        const schedulesTable = document.getElementById('schedules-table').querySelector('tbody');
        schedulesTable.innerHTML = "";
        schedulesData.forEach(schedule => {
            const row = schedulesTable.insertRow();
            row.innerHTML = `<td>${schedule.timeSlot}</td><td><button class="remove-schedule">Remove</button></td>`;
            row.querySelector('.remove-schedule').addEventListener('click', () => row.remove());
        });
    }

    // Close Modals
    document.querySelector('.close-modal-edit').addEventListener('click', () => editPropertyModal.style.display = 'none');
    document.querySelector('.close-modal-leads').addEventListener('click', () => viewLeadsModal.style.display = 'none');
    document.querySelector('.close-modal-schedules').addEventListener('click', () => viewSchedulesModal.style.display = 'none');

    // Add Schedule
    document.getElementById('add-schedule').addEventListener('click', () => {
        const newTimeSlot = prompt("Enter new time slot (e.g., 'Saturday 3:00 PM'):");
        if (newTimeSlot) {
            const schedulesTable = document.getElementById('schedules-table').querySelector('tbody');
            const row = schedulesTable.insertRow();
            row.innerHTML = `<td>${newTimeSlot}</td><td><button class="remove-schedule">Remove</button></td>`;
            row.querySelector('.remove-schedule').addEventListener('click', () => row.remove());
        }
    });

    // Show Add Property Form
    window.openPropertyForm = function() {
        const form = document.getElementById('propertyForm');
        if (form) {
            form.style.display = 'block';
        }
    }
    
  
    // Handle form submission
        function submitProperty(event) {
        event.preventDefault();
    
        // Retrieve the values from the form inputs
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        const area = document.getElementById('area').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;
    
        // Construct the data object to send to the server
        const propertyData = {
            location,
            price,
            area,
            bedrooms,
            bathrooms
        };
    
        // Send the data to the backend using fetch API
        fetch('http://localhost:3000/add-Property', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                location: location,
                price: price,
                area: area,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                images: []  // Placeholder for images
              })
        })
        .then(response => {
            if (!response.ok) {
              throw new Error("Failed to add property");
            }
            return response.json();
          })
        .then(data => {
            alert("Property added successfully!");
            console.log("Response data:", data);
          })
        .catch(error => {
            alert(error.message);  // Display the exact error in the alert
            console.error("Error details:", error);
          });
    }
    
    // Make submitProperty globally accessible
    window.submitProperty = submitProperty;
    
  
});
