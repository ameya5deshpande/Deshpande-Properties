document.addEventListener('DOMContentLoaded', () => {
    console.log("Admin Dashboard loaded!");

    const propertyList = document.getElementById('property-list');
    const editPropertyModal = document.getElementById('edit-property-modal');
    const viewLeadsModal = document.getElementById('view-leads-modal');

    // Dummy Properties Data
    const properties = [
        { id: 1, location: "Time Square", price: 2000, area: 2000, bedrooms: 2, bathrooms: 2, broker: "Deshpande Properties" },
        { id: 2, location: "Central Park", price: 3000, area: 2500, bedrooms: 3, bathrooms: 2, broker: "ABC Realty" },
        // Add more dummy properties as needed
    ];

    // Display Properties
    function displayProperties(data) {
        propertyList.innerHTML = "";
        data.forEach(property => {
            const propertyTile = document.createElement('div');
            propertyTile.classList.add('property-tile');
            propertyTile.innerHTML = `
                <div class="property-details">
                    <h3>${property.bedrooms} BHK in ${property.location}</h3>
                    <p>Location: ${property.location}, Price: ${property.price} Rs, Area: ${property.area} sq. ft.</p>
                    <p>Bedrooms: ${property.bedrooms}, Bathrooms: ${property.bathrooms}</p>
                    <p>Broker: ${property.broker}</p>
                    <button class="edit-property" data-id="${property.id}">Edit</button>
                    <button class="remove-property" data-id="${property.id}">Remove</button>
                    <button class="view-leads" data-id="${property.id}">View Leads</button>
                </div>
            `;
            propertyList.appendChild(propertyTile);
        });
    }
    
    displayProperties(properties);

    // Event Listeners
    document.querySelectorAll('.edit-property').forEach(button => {
        button.addEventListener('click', openEditModal);
    });

    document.querySelectorAll('.view-leads').forEach(button => {
        button.addEventListener('click', openLeadsModal);
    });

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

    // Close Modals
    document.querySelector('.close-modal-edit').addEventListener('click', () => editPropertyModal.style.display = 'none');
    document.querySelector('.close-modal-leads').addEventListener('click', () => viewLeadsModal.style.display = 'none');
});
