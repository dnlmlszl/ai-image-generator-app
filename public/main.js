const imagesContainer = document.getElementById('imgs');
const userInput = document.getElementById('description');
const generateButton = document.getElementById('generate');

if (generateButton) {
  generateButton.addEventListener('click', getImage);
}

async function getImage(event) {
  event.preventDefault();

  const url = '/api/generate';
  const methods = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: userInput.value,
    }),
  };

  try {
    const response = await fetch(url, methods);
    const data = await response.json();

    imagesContainer.innerHTML = '';

    if (Array.isArray(data)) {
      data.forEach((img) => {
        let imgDiv = document.createElement('div');

        let image = document.createElement('img');
        image.src = img.url;

        imgDiv.appendChild(image);

        imagesContainer.appendChild(imgDiv);
      });
    } else {
      console.error('Invalid data format:', data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
