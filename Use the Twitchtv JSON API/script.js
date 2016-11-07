$(function () { // Same as document.addEventListener("DOMContentLoaded"...

// Twitch channel list
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]


//var logo = [];
//var namee = [];
//var url = [];
//var gameStatus = [];
//var streamm = [];
//var checkJsonLength = []; 

/*
//for loop for getting every channels JSON from Twitch API
for (i = 0; i < channels.length; i++) {

  //First JSON for logo url, channel name and channel url
  $.getJSON('https://api.twitch.tv/kraken/channels/' + channels[i] + '?callback=?', function(data) {
    //Push logo url, name and channel url into arrays
    logo.push(data.logo);
    namee.push(data.name);
    url.push(data.url);

    //Once get all of data, start getting JSON2
    if(logo.length && url.length && namee.length === channels.length) {
      logoAndName(logo, namee, url);      
      for(l = 0; l < channels.length; l++) {
          $.getJSON('https://api.twitch.tv/kraken/streams/' + channels[l] + '?callback=?', function(data2) {
            
            //Check if get all of the JSON
            checkJsonLength.push(data2.stream);
            

            if(checkJsonLength.length === channels.length){
              //filter out null in checkJsonLength
              checkJsonLength = checkJsonLength.filter(function(val) {
                return val !== null;
              })

              //push 
              for(n = 0; n < checkJsonLength.length; n++) {
                streamm.push(checkJsonLength[n].channel.name);
                gameStatus.push(checkJsonLength[n].channel.game + ': ' + checkJsonLength[n].channel.status);
                //console.log(streamm)
                //console.log(gameStatus)
                if(gameStatus.length && streamm.length === checkJsonLength.length){
                  gameStatusHtml(gameStatus, streamm);
                }
              }
            }//end of if loop
        }); // end of getJSON
      } // end of for loop
    } 
  });
}
*/

/*
function logoAndName(logo, namee, url) {
  for(j = 0; j < logo.length; j++ ) {
    var htmlContent = "<div class='row row" + (j+1) + "' class='" + channels[j].toLowerCase() + "'><div class='col-xs-12 col-sm-8 col-md-8 col-lg-6 inner'><div class='col-xs-2 col-sm-2 icon'><img class='img-circle' src='" + logo[j] + "'></div>";
    htmlContent += "<div class='col-xs-2 col-sm-3 channel'><a href='" + url[j] + "'>" + channels[j] + "</a></div><div id='" + channels[j].toLowerCase() + "' class='col-xs-7 col-sm-6 col-md-6 col-lg-6 pull-right status'><p class='offline'>offline</p></div></div></div>";
    $('.container').append(htmlContent);
  }
}

function gameStatusHtml(gameStatus, stream) {
  
  for(k = 0; k < stream.length; k++) {
    var htmlContent = "";
    //htmlContent = "<div class='col-xs-7 col-sm-6 col-md-6 col-lg-6 pull-right status'><p class='online'>" + gameStatus[k] + "</p></div>";
    //console.log('#' + stream[k])
    $('#' + stream[k]).html("<p class='online'>" + gameStatus[k] + "</p>");
    $('.' + stream[k]).css("background-color", "#9fdf9f")
    
    //for(m = 0; m < channels.length; m++)
      //var htmlContent = "";
      //if(stream[k] == channels[m]){
        //htmlContent = "<div class='col-xs-7 col-sm-6 status'><p class='online'>" + gameStatus[k] + "</p></div>"
        //$('.row' + (k+1)).append(htmlContent);
      //} else {
        //htmlContent = "<div class='col-xs-7 col-sm-6 status'><p class='offline'>offline</p></div>"
        //$('.row' + (k+1)).append(htmlContent);
    //}
  }
}
*/

  // loop for getting every channels JSON from Twitch API
  // for (i = 0; i < channels.length; i++) {
  //   //First JSON for logo url, channel name and channel url
  //   $.getJSON(' https://wind-bow.hyperdev.space/twitch-api/channels/' + channels[i] + '?callback=?', function(data) {
  //     logoAndName(data.logo, data.name, data.url);  
  //   });
  //   $.getJSON(' https://wind-bow.hyperdev.space/twitch-api/streams/' + channels[i] + '?callback=?', function(data2) {
  //     if(data2.stream !== null){
  //       gameStatusHtml(data2.stream.channel.game + ': ' + data2.stream.channel.status, data2.stream.channel.name);
  //     }
  //   });
  // }

  channels.forEach(function(channel) {
    $.getJSON('https://wind-bow.hyperdev.space/twitch-api/channels/' + channel + '?callback=?', function(data) {
      //Push logo url, name and channel url into arrays
      logoAndName(data.logo, data.name, data.url);     
    });
    $.getJSON(' https://wind-bow.hyperdev.space/twitch-api/streams/' + channel + '?callback=?', function(data2) {
      if(data2.stream !== null){
        gameStatusHtml(data2.stream.channel.game + ': ' + data2.stream.channel.status, data2.stream.channel.name);
      }
    });
  });

  function logoAndName(logo, name, url) {
      var htmlContent = "<div class='row row-offline row-" + name.toLowerCase() + "'><div class='col-xs-12 col-sm-8 col-sm-push-2 col-md-8 col-md-push-2 col-lg-6 col-lg-push-3 inner " + name.toLowerCase() + "'><div class='col-xs-2 col-sm-2 icon'><img class='img-circle' src='" + logo + "'></div>";
      htmlContent += "<div class='col-xs-2 col-sm-3 channel'><a href='" + url + "' target='_blank'>" + name + "</a></div><div id='" + name.toLowerCase() + "' class='col-xs-7 col-sm-6 col-md-6 col-lg-6 pull-right status'><p class='offline'>offline</p></div></div></div>";
      $('.container').append(htmlContent);
    
  }

  function gameStatusHtml(gameStatus, stream) {
    var htmlContent = "";
    $('#' + stream).html("<p class='online'>" + gameStatus + "</p>");
    $('.' + stream).css("background-color", "#9fdf9f")
    $('.row-' + stream).addClass("row-online")
    $('.row-' + stream).removeClass("row-offline")
  }

  $('.btn-primary').click(function() {
    $('.row-online').show()
    $('.row-offline').show()
  });

  $('.btn-success').click(function() {
    $('.row-online').show()
    $('.row-offline').hide()
  });

  $('.btn-warning').click(function() {
    $('.row-online').hide()
    $('.row-offline').show()
  });


});



