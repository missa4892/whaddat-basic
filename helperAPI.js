const videoGuide = require('./youtubeAPI.js');
const imagedetection = require('./image-detection.js');

var getImageData = (imageName, callback) => {
  imagedetection.getLabels(imageName, (error, imageLabel) => {
    if(imageLabel !== null){
      debugger;
	  videosArr = [];
      videoGuide.getYouTubeData(`all things animal tv ${imageLabel}`, 1, (error, result) => {
        if(result !== null){
          console.log(result);
          result = JSON.parse(result);
          debugger;
          items = result.items;
          items.forEach((item) => {console.log(item);
            var videoJsonObj = {
              "urlLink": 'https://www.youtube.com/watch?v=' + item.id.videoId,
              "thumbnails": item.snippet.thumbnails.high,
              "title": item.snippet.title
            };
            videosArr.push(videoJsonObj);
          });
        } else {
          data_to_client = {
            "status": 'Fail'
          }
        }
          videoGuide.getYouTubeData(`entertainment legend of ${imageLabel}`, 1, (error, result) => {
            if(result !== null){
              console.log(result);
              result = JSON.parse(result);
              debugger;
              items = result.items;
              items.forEach((item) => {console.log(item);
                var videoJsonObj = {
                  "urlLink": 'https://www.youtube.com/watch?v=' + item.id.videoId,
                  "thumbnails": item.snippet.thumbnails.high,
                  "title": item.snippet.title
                };
                videosArr.push(videoJsonObj);
              });

              var curatedArr = [];
              var curatedLink1 = {};
              var curatedLink2 = {};
              if (imageLabel=='cat'){
                curatedLink1 = {
                  "link": '/catHtml',
                  "title": 'This is title 1'
                };
                curatedArr.push(curatedLink1);
                curatedLink2 = {
                  "link": '/catHtml1',
                  "title": 'This is title 2'
                };
                curatedArr.push(curatedLink2);
              }

              data_to_client = {
                "status": 'Success',
                "imageLabel":imageLabel,
                "articles": videosArr,
                "curated": curatedArr
              };
            } else {
              data_to_client = {
                "status": 'Fail'
              }
            }

          debugger;

        callback(undefined, data_to_client);
        });
      });

    }
  });
};

getVideoData = (imageLabel) => {

}

module.exports = {
  getImageData
}
