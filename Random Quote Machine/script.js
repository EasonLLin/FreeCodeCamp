
var quoteArr = [
  {
    "text":"I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    "author":"Marilyn Monroe"
  },
  {
   "text":"Don't cry because it's over, smile because it happened.",
   "author":"Dr. Seuss"
  },
  {
    "text": "Be yourself; everyone else is already taken.",
    "author": "Oscar Wilde"
  },
  {
    "text": "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "author": "Albert Einstein"
  },
  {
    "text": "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    "author": "Bernard M. Baruch"
  },
  {
    "text": "You've gotta dance like there's nobody watching,Love like you'll never be hurt,Sing like there's nobody listening,And live like it's heaven on earth.",
    "author": "William W. Purkey"
  },
  {
    "text": "A room without books is like a body without a soul.",
    "author": "Marcus Tullius Cicero"
  },
  {
    "text": "So many books, so little time.",
    "author": "Frank Zappa"
  },
  {
    "text": "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    "author": "Dr. Seuss"
  },
  {
    "text": "You only live once, but if you do it right, once is enough.",
    "author": "Mae West"
  },
];

var urlArr = ["I%27m%20selfish%2C%20impatient%20and%20a%20little%20insecure.%20I%20make%20mistakes%2C%20I%20am%20out%20of%20control%20and%20at%20times%20hard%20to%20handle.%20But%20if%20you%20can%27t%20handle%20me%20at%20my%20worst%2C%20then%20you%20sure%20as%20hell%20don%27t%20deserve%20me%20at%20my%20best.%0A-%20Marilyn%20Monroe","Don%27t%20cry%20because%20it%27s%20over%2C%20smile%20because%20it%20happened.%0A-%20Dr.%20Seuss","Be%20yourself%3B%20everyone%20else%20is%20already%20taken.%0A-%20Oscar%20Wilde","Two%20things%20are%20infinite%3A%20the%20universe%20and%20human%20stupidity%3B%20and%20I%27m%20not%20sure%20about%20the%20universe.%0A-%20Albert%20Einstein%0A","Be%20who%20you%20are%20and%20say%20what%20you%20feel%2C%20because%20those%20who%20mind%20don%27t%20matter%2C%20and%20those%20who%20matter%20don%27t%20mind.%0A-%20Bernard%20M.%20Baruch","You%27ve%20gotta%20dance%20like%20there%27s%20nobody%20watching%2CLove%20like%20you%27ll%20never%20be%20hurt%2CSing%20like%20there%27s%20nobody%20listening%2CAnd%20live%20like%20it%27s%20heaven%20on%20earth.%0A-%20William%20W.%20Purkey","A%20room%20without%20books%20is%20like%20a%20body%20without%20a%20soul.%0A-%20Marcus%20Tullius%20Cicero","So%20many%20books%2C%20so%20little%20time.%0A-%20Frank%20Zappa","You%20know%20you%27re%20in%20love%20when%20you%20can%27t%20fall%20asleep%20because%20reality%20is%20finally%20better%20than%20your%20dreams.%0A-%20Dr.%20Seuss","You%20only%20live%20once%2C%20but%20if%20you%20do%20it%20right%2C%20once%20is%20enough.%0A-%20Mae%20West"];

var colorArr = ["rgb(128, 128, 128)", "rgb(153, 0, 0)", "rgb(77, 121, 255)", "rgb(204, 204, 0)", "rgb(255, 153, 102)"];
var myTimeout = [];

$('.btn').on('click', function(){
  randomQuote();
});


function randomQuote() {
  //For quote
  var ran = Math.floor(Math.random() * 10);
  //For color
  var ran2 = Math.floor(Math.random() * 5);
  //Create random quote
  document.getElementById("quote-text").innerHTML = quoteArr[ran].text;
  document.getElementById("author").innerHTML = "- " + quoteArr[ran].author;
  var curColorNum = findOrigionColorNum();
  changeColor(curColorNum ,ran2);
  // //Change text color
  // for(i = 0; i < document.getElementsByClassName("text-color").length; i++) {
  //   document.getElementsByClassName("text-color")[i].style.color = colorArr[ran2];
  // }
  // //Change background color
  // for(i = 0; i < document.getElementsByClassName("back-color").length; i++) {
  //   document.getElementsByClassName("back-color")[i].style.backgroundColor = colorArr[ran2];
  // }
  //Change full page background color
  // document.body.style.backgroundColor = colorArr[ran2];
  //Change twitter link
  document.getElementById("link-twitter").href = "https://twitter.com/intent/tweet?text=" + urlArr[ran];
}

function findOrigionColorNum() {
  var color = $(".back-color").css('background-color');
  if(color = colorArr[0]) {
    return '0';
  }
  if(color = colorArr[1]) {
    return '1';
  }
  if(color = colorArr[2]) {
    return '2';
  }
  if(color = colorArr[3]) {
    return '3';
  }
  if(color = colorArr[4]) {
    return '4';
  }
}

// function changeColor(curColorNum, colorNum) {
//   console.log($('.back-color').css('background-color'));
//   $(".back-color").css({
//     '-webkit-animation-name': 'color' + curColorNum,
//     '-webkit-animation-duration': '0.5s',
//     'animation-name':  'color' + curColorNum,
//     'animation-duration': '1s'
//   });
//   setTimeout(function() {
//     $(".back-color").css({
//       '-webkit-animation-name': 'to_color' + colorNum,
//       '-webkit-animation-duration': '0.5s',
//       'animation-name':  'to_color' + colorNum,
//       'animation-duration': '1s'
//     });
//     $('.back-color').css('background-color', colorArr[colorNum]);
//   }, 1000);
// }

function changeColor(curColorNum, colorNum) {
  // $(".back-color").removeClass('to_animate' + curColorNum);
  $('.btn').off('click');
  $('.back-color, html, body').addClass('animate' + curColorNum);
  myTimeout.push(setTimeout(function() {
    $('.back-color, html, body').addClass('to_animate' + colorNum);
    $('.back-color, html, body').removeClass('animate' + curColorNum);
    $('.back-color, html, body').css('background-color', colorArr[colorNum]);
  }, 1000));
  myTimeout.push(setTimeout(function() {
    $(".back-color, html, body").removeClass('to_animate' + colorNum);
    $('.btn').on('click', function(){
      randomQuote();
    });
  }, 2000));
}
