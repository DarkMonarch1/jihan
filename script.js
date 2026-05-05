// Select tab controls and panels from the DOM
const tabButtons = document.querySelectorAll('.tab');
const skillPanels = document.querySelectorAll('.skill-panel');

// Handle tab switching for the skill categories
function setActiveTab(selectedTab) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === selectedTab;
    button.classList.toggle('active', isActive);
  });

  skillPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === selectedTab);
  });
}

// Attach click event listeners to the tab buttons
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveTab(button.dataset.tab);
  });
});

// Set the default visible tab when the page loads
setActiveTab('languages');
