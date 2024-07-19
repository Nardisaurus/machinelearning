

let net;
let modelLoaded = false;
let imageUploaded = false;

async function loadModel() {
    console.log('Loading mobilenet...');
    net = await mobilenet.load();
    console.log('Successfully loaded model');
    modelLoaded = true;
}

async function classifyImage() {
    if (!imageUploaded) {
        alert('Please upload an image first.');
        return;
    }

    const imgElement = document.getElementById('image');
    const result = await net.classify(imgElement);
    document.getElementById('results').innerText = `
        Prediction: ${result[0].className}\n
        Probability: ${(result[0].probability * 100).toFixed(2)}%
    `;
}

document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        const imgElement = document.getElementById('image');
        imgElement.src = reader.result;
        imgElement.style.display = 'block';
        document.querySelector('.image-preview p').style.display = 'none';
        document.getElementById('results').innerText = '';
        document.getElementById('classify-button').style.display = 'block';

        // Set imageUploaded to true and load the AI model if not already loaded
        imageUploaded = true;
        if (!modelLoaded) {
            loadModel();
        }
    };

    reader.readAsDataURL(file);
});

document.getElementById('classify-button').addEventListener('click', function() {
    if (modelLoaded) {
        classifyImage();
    } else {
        alert('Model not loaded yet. Please wait.');
    }
});
