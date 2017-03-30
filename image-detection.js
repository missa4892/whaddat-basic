// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Instantiates a client
var visionClient = vision({
  projectId: 'versatile-now-162113',
  keyFilename: './auth/keyfile.json'
});

var getLabels = (filename, callback) => {
    localFilepath = './images/' + filename;
    // Performs label detection on the local file
    visionClient.detectLabels(localFilepath, function(err, labels) {
      //const labels = labels[0];
      debugger;
      console.log('Labels:');
      labels.forEach((label) => console.log(label));
      if (labels.includes("chair")){
        callback(undefined, "chair");
      } else {
        callback(undefined, labels[0]);
      }
    });

    // visionClient.detectLabels(localFilepath)
    //   .then((results) => {
    //     debugger;
    //     const labels = results[0];
    //     debugger;
    //     console.log('Labels:');
    //     labels.forEach((label) => console.log(label));
    //     callback(undefined, labels);
    //   });
}

module.exports = {
  getLabels
};
