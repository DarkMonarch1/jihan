// Select tab controls and panels from the DOM
const tabButtons = document.querySelectorAll('.tab');
const skillPanels = document.querySelectorAll('.skill-panel');
const monitorScreen = document.getElementById('monitor-screen');
const outputContainer = document.getElementById('terminal-output');
const inputField = document.getElementById('terminal-input');

async function typeLine(text, target = outputContainer, delay = 30) {
  const line = document.createElement('p');
  target.appendChild(line);
  for (let i = 0; i < text.length; i++) {
    line.textContent = text.slice(0, i + 1);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return line;
}

async function boot() {
  const lines = [
    'INITIALIZING SYSTEM...',
    'LOADING KERNEL V.4.2.0...',
    'CHECKING PERIPHERALS... OK',
    'ESTABLISHING CONNECTION... SUCCESS',
    'BOOTING PORTFOLIO...'
  ];

  const container = document.getElementById('boot-sequence');
  for (let lineText of lines) {
    const p = document.createElement('p');
    p.textContent = '> ' + lineText;
    container.appendChild(p);
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  container.style.display = 'none';
  const content = document.getElementById('content');
  content.classList.add('visible');
  monitorScreen.classList.remove('hidden');
  inputField.focus();
}

function appendPrompt(command) {
  const promptLine = document.createElement('p');
  promptLine.textContent = `jihan@portfolio:~$ ${command}`;
  outputContainer.appendChild(promptLine);
}

function printResult(lines = [], typed = false) {
  if (!Array.isArray(lines)) {
    lines = [lines];
  }
  return lines.reduce((promise, text) => {
    return promise.then(() => typeLine(text, outputContainer, typed ? 30 : 0));
  }, Promise.resolve());
}

function scrollTerminal() {
  const terminal = document.getElementById('terminal');
  terminal.scrollTop = terminal.scrollHeight;
}

function executeCommand(command) {
  const normalized = command.trim().toLowerCase();
  if (!normalized) {
    return Promise.resolve();
  }

  const [action, ...rest] = normalized.split(' ');
  const target = rest.join(' ');

  switch (action) {
    case 'help':
      return printResult([
        'Available commands: help, ls, about, skills, projects, contact, social, clear, start',
        'Try: help, ls, about, skills, projects, contact, social, clear'
      ]);
    case 'ls':
      return printResult(['about  skills  projects  contact  social  start']);
    case 'about':
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
      return printResult(['Scrolling to the About section...']);
    case 'skills':
      document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
      return printResult(['Opening Skills...']);
    case 'projects':
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
      return printResult(['Opening Projects...']);
    case 'contact':
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      return printResult(['Opening Contact...']);
    case 'social':
      return printResult([
        'LinkedIn: https://www.linkedin.com/in/dark-monarch-2b1335192/',
        'Facebook: https://www.facebook.com/qDarkMonarchq',
        'Email: monarchtherealone@gmail.com'
      ]);
    case 'clear':
      outputContainer.innerHTML = '';
      return Promise.resolve();
    case 'start':
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
      return printResult(['Terminal active. Scroll for more content.']);
    default:
      return printResult([`${action}: command not found. Type help for a list of commands.`]);
  }
}

inputField.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const command = inputField.value;
    appendPrompt(command);
    inputField.value = '';
    await executeCommand(command);
    scrollTerminal();
  }
});

inputField.addEventListener('focus', () => {
  inputField.parentElement.classList.add('active');
});

inputField.addEventListener('blur', () => {
  inputField.parentElement.classList.remove('active');
});

document.getElementById('terminal').addEventListener('click', () => {
  inputField.focus();
});

boot();

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
