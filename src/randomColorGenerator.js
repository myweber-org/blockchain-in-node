function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomColorArray(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
}

export { generateRandomColor, getRandomColorArray };
function generateRandomColor() {
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

function generateRandomHSL() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGB, generateRandomHSL };function generateRandomColor() {
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

function generateRandomRGBA(alpha = Math.random().toFixed(2)) {
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

function generateRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomHSL() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGB, generateRandomHSL };function generateRandomColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    return {
        hex: `#${hex}`,
        rgb: `rgb(${r}, ${g}, ${b})`
    };
}

function displayRandomColor() {
    const color = generateRandomColor();
    console.log('Hex Color:', color.hex);
    console.log('RGB Color:', color.rgb);
    
    document.body.style.backgroundColor = color.hex;
    document.getElementById('color-display').textContent = 
        `Hex: ${color.hex} | RGB: ${color.rgb}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.createElement('button');
    button.textContent = 'Generate Random Color';
    button.addEventListener('click', displayRandomColor);
    
    const display = document.createElement('div');
    display.id = 'color-display';
    display.style.padding = '20px';
    display.style.margin = '10px';
    display.style.border = '1px solid #ccc';
    
    document.body.appendChild(button);
    document.body.appendChild(display);
    
    displayRandomColor();
});function generateRandomColor() {
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

function generateRandomHSL() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 101);
  const l = Math.floor(Math.random() * 101);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export { generateRandomColor, generateRandomRGB, generateRandomHSL };