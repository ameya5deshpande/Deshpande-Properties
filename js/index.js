// JavaScript to handle modal popup for "Book Visit"
document.addEventListener('DOMContentLoaded', () => {
    const bookVisitButtons = document.querySelectorAll('.book-visit');
    const modal = document.getElementById('visit-modal');
    const closeModal = document.querySelector('.close-modal');
    const propertyIdElement = document.getElementById('property-id');

    
    bookVisitButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
            propertyIdElement.textContent = index + 1;  // Assigning Property ID dynamically
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Hide modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission (just showing a confirmation for now)
    const visitForm = document.getElementById('visit-form');
    visitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Visit scheduled successfully!');
        modal.style.display = 'none';
    });
    
});
