// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyCD6Ogdm3PVF9AWZWOgVYjOHXaOgU5KO-U');

// Instantiates a client
var visionClient = vision({
  projectId: 'versatile-now-162113',
  keyFilename: './auth/keyfile.json'
});

// The path to the local image file, e.g. "/path/to/image.png"
 const fileName = './images/cat-test.jpg';

//Performs label detection on the local file
visionClient.detectLabels(fileName)
  .then((results) => {
    const labels = results[0];

    console.log('Labels:');
    labels.forEach((label) => console.log(label));
  });

  // youTube.search('learn about Cat mammals', 1, function(error, result) {
  // if (error) {
  //   console.log(error);
  // }
  // else {
  //   console.log(JSON.stringify(result, null, 2));
  // }
//});
