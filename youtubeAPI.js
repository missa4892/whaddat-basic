var YouTube = require('youtube-node');

var youTube = new YouTube();

youTube.setKey('AIzaSyCD6Ogdm3PVF9AWZWOgVYjOHXaOgU5KO-U');

var getYouTubeData = (keywords, num_of_result, callback) => {
  youTube.search(keywords, num_of_result, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(JSON.stringify(result, null, 2));
      callback(undefined, JSON.stringify(result, null, 2));
    }
  });
};

module.exports = {
  getYouTubeData
};
