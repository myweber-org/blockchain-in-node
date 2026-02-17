function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomHslColor() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRgbColor, generateRandomHslColor };function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function applyRandomTheme() {
  const primaryColor = generateRandomColor();
  const secondaryColor = generateRandomColor();
  
  document.documentElement.style.setProperty('--primary-color', primaryColor);
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  
  console.log(`Theme updated: Primary ${primaryColor}, Secondary ${secondaryColor}`);
}

document.addEventListener('DOMContentLoaded', function() {
  const themeButton = document.getElementById('theme-changer');
  if (themeButton) {
    themeButton.addEventListener('click', applyRandomTheme);
  }
});