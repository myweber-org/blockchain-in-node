function generateRandomColor() {
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
    document.getElementById('colorCode').textContent = newColor;
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.createElement('button');
    button.textContent = 'Generate Random Color';
    button.addEventListener('click', updateBackgroundColor);
    
    const colorDisplay = document.createElement('div');
    colorDisplay.id = 'colorCode';
    colorDisplay.style.marginTop = '20px';
    colorDisplay.style.fontSize = '24px';
    colorDisplay.style.fontFamily = 'monospace';
    
    document.body.appendChild(button);
    document.body.appendChild(colorDisplay);
    document.body.style.textAlign = 'center';
    document.body.style.paddingTop = '50px';
});
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomHSLColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGBColor, generateRandomHSLColor };function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomHSLColor() {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGBColor, generateRandomHSLColor };function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomHSLColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGBColor, generateRandomHSLColor };function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomRGBA(alpha = 1) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export { generateRandomColor, generateRandomRGB, generateRandomRGBA };function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRandomRGBColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomHSLColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGBColor, generateRandomHSLColor };function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function setRandomBackground() {
  const newColor = generateRandomColor();
  document.body.style.backgroundColor = newColor;
  console.log('Background changed to:', newColor);
}

document.addEventListener('DOMContentLoaded', function() {
  const button = document.createElement('button');
  button.textContent = 'Change Background';
  button.addEventListener('click', setRandomBackground);
  document.body.appendChild(button);
});function generateRandomColor() {
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

export { generateRandomColor, generateRandomRgbColor, generateRandomHslColor };