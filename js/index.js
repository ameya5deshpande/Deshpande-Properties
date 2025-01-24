// JavaScript to handle modal popup for "Book Visit"
document.addEventListener('DOMContentLoaded', () => {
    const bookVisitButtons = document.querySelectorAll('.book-visit');
    const modal = document.getElementById('visit-modal');
    const closeModal = document.querySelector('.close-modal');
    const propertyIdElement = document.getElementById('property-id');
    const visitForm = document.getElementById('visit-form');

    fetch('https://kjld5dop89.execute-api.eu-north-1.amazonaws.com/get-property')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Inspect the data structure
      displayProperties(data); // Call a function to display the properties
    })
    .catch(error => console.error('Error fetching properties:', error));
    
    function displayProperties(properties) {
        const propertiesContainer = document.getElementById('property-listings'); // Assuming this is your tile container
        //propertiesContainer.innerHTML = ''; // Clear existing tiles
        
        properties.forEach(property => {
            const tile = document.createElement('div');
            tile.className = 'property-tile';
            tile.innerHTML = `
            <img src="images/property-placeholder.jpg" alt="Property Image">
            <div class="property-info">
                <h3>Property ID: ${property.id}</h3>
                <p>${property.description}</p>
                <p>Location: ${property.location}</p>
                <p>Price: ₹${property.price} | Area: ${property.area} sqft</p>
                <p>Bedrooms: ${property.bedrooms} | Bathrooms: ${property.bathrooms}</p>
                <button class="book-visit">Book Visit</button>
            </div>
            `;
            propertiesContainer.appendChild(tile);
        });
    }
   

    bookVisitButtons.forEach((button, index) => { // Assigning Property ID dynamically
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
            propertyIdElement.textContent = index + 1;  // Assigning Property ID dynamically
        });
    });

    closeModal.addEventListener('click', () => { // Closing the modal
        modal.style.display = 'none';
    });

    // Hide modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle visit schedule form submission (just showing a confirmation for now)
        visitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Visit scheduled successfully!');
        modal.style.display = 'none';
    });
    
});
