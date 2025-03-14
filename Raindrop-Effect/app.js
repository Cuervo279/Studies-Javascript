const windowElement = document.querySelector('.window');
const windowWidth = windowElement.offsetWidth;
const windowHeight = windowElement.offsetHeight;
const raindrops = [];

const mouseArea = document.createElement('div');
mouseArea.classList.add('mouse-area');
document.body.appendChild(mouseArea);

const mouseRadius = 50;
mouseArea.style.width = `${mouseRadius * 2}px`;
mouseArea.style.height = `${mouseRadius * 2}px`;

let mouseX = windowWidth / 2;
let mouseY = windowHeight / 2;

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  mouseArea.style.left = `${mouseX - mouseRadius}px`;
  mouseArea.style.top = `${mouseY - mouseRadius}px`;
});

function createRaindrop() {
  const numDrops = 5;

  for (let i = 0; i < numDrops; i++) {
    const raindrop = document.createElement('div');
    const size = Math.random() * 1 + 5;

    raindrop.classList.add('drop');
    raindrop.style.left = `${Math.random() * windowWidth}px`;
    raindrop.style.width = `${size}px`;
    raindrop.style.height = `5px`; // `${size}px`;

    raindrop.velocityY = 15;
    raindrop.velocityX = 0;
    raindrop.gravity = 0.5;

    windowElement.appendChild(raindrop);
    raindrops.push(raindrop);
  }
}


function updateRaindrops() {
  raindrops.forEach((raindrop, index) => {
    
    raindrop.velocityY += raindrop.gravity;

    const newTop = parseFloat(raindrop.style.top || 0) + raindrop.velocityY;
    raindrop.style.top = `${newTop}px`;

    const newLeft = parseFloat(raindrop.style.left || 0) + raindrop.velocityX;
    raindrop.style.left = `${newLeft}px`;

    const rect = raindrop.getBoundingClientRect();
    const raindropX = rect.left + rect.width / 2;
    const raindropY = rect.top + rect.height / 2;

    if (
      rect.left < mouseX + mouseRadius &&
      rect.right > mouseX - mouseRadius &&
      rect.top < mouseY + mouseRadius &&
      rect.bottom > mouseY - mouseRadius
    ) {

      const direction = Math.random() > 0.5 ? 1 : -1;
      raindrop.velocityX = direction * (Math.random() * 5 + 2);

      raindrop.velocityY = -Math.random() * 5;
    }

    if (newTop > windowHeight) {
      raindrop.remove();
      raindrops.splice(index, 1);
    }
  });

  requestAnimationFrame(updateRaindrops);
}

setInterval(createRaindrop, 1);

updateRaindrops();
