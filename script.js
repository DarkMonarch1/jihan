// Select tab controls and panels from the DOM
const tabButtons = document.querySelectorAll('.tab');
const skillPanels = document.querySelectorAll('.skill-panel');
const skillSliders = document.querySelectorAll('.skill-slider');

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

// Update the shown percentage next to each slider when the value changes
function updateSliderValue(slider) {
  const valueLabel = slider.parentElement.querySelector('.skill-value');
  if (valueLabel) {
    valueLabel.textContent = `${slider.value}%`;
  }
}

// Attach click event listeners to the tab buttons
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveTab(button.dataset.tab);
  });
});

const unlockButton = document.getElementById('unlock-slider-button');
const lockNotice = document.getElementById('slider-lock-notice');
const sliderUnlockHash = 2289269889;

function hashKey(value) {
  return value.split('').reduce((hash, char) => ((hash * 31) + char.charCodeAt(0)) >>> 0, 2166136261);
}

function isValidUnlockKey(value) {
  return hashKey(value.trim()) === sliderUnlockHash;
}

function setSliderLockState(isLocked) {
  skillSliders.forEach((slider) => {
    slider.disabled = isLocked;
    slider.classList.toggle('locked', isLocked);
  });

  if (isLocked) {
    lockNotice.textContent = 'Sliders are locked. Only the site owner can unlock and adjust them.';
    unlockButton.textContent = 'Unlock sliders';
  } else {
    lockNotice.textContent = 'Sliders are unlocked. Owner control is active.';
    unlockButton.textContent = 'Lock sliders';
  }
}

function isUnlocked() {
  return sessionStorage.getItem('sliderUnlocked') === 'true';
}

function promptUnlock() {
  const userKey = prompt('Enter your owner unlock key to enable the skill sliders:');
  if (userKey && isValidUnlockKey(userKey)) {
    sessionStorage.setItem('sliderUnlocked', 'true');
    setSliderLockState(false);
  } else {
    alert('Incorrect key. Sliders remain locked.');
    setSliderLockState(true);
  }
}

unlockButton.addEventListener('click', () => {
  if (isUnlocked()) {
    sessionStorage.removeItem('sliderUnlocked');
    setSliderLockState(true);
  } else {
    promptUnlock();
  }
});

// Attach input listeners to all sliders and initialize the display
skillSliders.forEach((slider) => {
  slider.addEventListener('input', () => updateSliderValue(slider));
  updateSliderValue(slider);
});

// Set the default visible tab when the page loads
setActiveTab('languages');
setSliderLockState(!isUnlocked());
