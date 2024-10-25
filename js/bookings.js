// JavaScript to handle modal popup for "Book Visit"
document.addEventListener('DOMContentLoaded', () => {
    
    const modifyVisitButtons = document.querySelectorAll('.modify-visit');
    const modifyModal = document.getElementById('modify-visit-modal');
    const modifyCloseModal = document.querySelector('.modify-close-modal');
    const modifyPropertyIdElement = document.getElementById('modify-property-id');

    console.log(modifyVisitButtons); // Log to check if the buttons are being selected

    // Handle Modify Visit and updates on my bookings page
    modifyVisitButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            console.log('Modify Visit button clicked!'); // Debugging log
            modifyModal.style.display = 'flex';
            modifyPropertyIdElement.textContent = index + 1;  // Assigning Property ID dynamically
        });
    });

    modifyCloseModal.addEventListener('click', () => {
        modifyModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modifyModal) {
            modifyModal.style.display = 'none';
        }
    });

    const modifyForm = document.getElementById('modify-visit-form');
    modifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Booking modified successfully!');
        modifyModal.style.display = 'none';
    });

    // Handle Cancel Visit (for now, just blur the property tile)
    const cancelVisitButtons = document.querySelectorAll('.cancel-visit');
    console.log(cancelVisitButtons); // Log to check if the buttons are being selected
    cancelVisitButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const propertyTile = button.closest('.property-tile');
            propertyTile.style.opacity = '0.5';
            alert('Booking canceled successfully!');
        });
    });
});
