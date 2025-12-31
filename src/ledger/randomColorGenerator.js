function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomTheme() {
  const primaryColor = generateRandomColor();
  const secondaryColor = generateRandomColor();
  
  document.documentElement.style.setProperty('--primary-color', primaryColor);
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  
  console.log(`Theme updated: Primary ${primaryColor}, Secondary ${secondaryColor}`);
}

function initializeThemeSwitcher() {
  const button = document.createElement('button');
  button.textContent = 'Switch Theme';
  button.addEventListener('click', setRandomTheme);
  document.body.appendChild(button);
}

document.addEventListener('DOMContentLoaded', initializeThemeSwitcher);function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateBackgroundColor() {
  const newColor = generateRandomColor();
  document.body.style.backgroundColor = newColor;
  console.log('Background color changed to: ' + newColor);
}

document.addEventListener('DOMContentLoaded', function() {
  const button = document.createElement('button');
  button.textContent = 'Change Background Color';
  button.onclick = updateBackgroundColor;
  document.body.appendChild(button);
});