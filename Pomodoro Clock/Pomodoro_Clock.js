
$(document).ready(function() {

  var clickTimes = 0;
  var timer;

  $('#break').hide();

  $('button').click(function() {
    var btn = this.className.split('-');
    changeTimeLength(btn[0], btn[2])
  });

  $('#maru').click(function() {
    clickTimes += 1;
    if(clickTimes % 2 == 1) {
      startTimingAndAnimation();
    } else {
      stopTimingAndAnimation();
    }
  });

  function changeTimeLength(name, plusOrMinus) {
    $('#' + name + '-num').html(function(idx, cur) {
      if(plusOrMinus == 'plus' && cur < 60) {
        return Number(cur) + 1;
      } else if (plusOrMinus == 'minus' && cur > 1) {
        return Number(cur) - 1;
      }
    });
    setOrResetTimer(name)
  }

  function startTimingAndAnimation() {
    var currentTime = $('#timer').html().split(':');
    currentTime = (Number(currentTime[0]) * 60) + Number(currentTime[1]);
    var breakTime = Number($('break-num').html());
    startAnimation(currentTime * 1000)
    if(currentTime > 0) {
      timer = setInterval(timeCounter, 1000);
    }
  }

  function stopTimingAndAnimation() {
    clearInterval(timer);
    $('#block').stop();
  }

  function timeCounter() {
    var currentTime = $('#timer').html().split(':');
    currentTime = (Number(currentTime[0]) * 60) + Number(currentTime[1]);
    currentTime -= 1;
    var m = Math.floor(currentTime / 60);
    var s = currentTime % 60;
    if(s >= 10) {
      $('#timer').html(m + ':' + s);
    } else {
      $('#timer').html(m + ':0' + s);
    }
    
    if((m <= 0 && s <= 0)) {
      stopTimingAndAnimation();
      changeSituation();
    }
  }

  function startAnimation(time) {
    $('#block').animate({"height" : "0px"}, time, "linear");
  }

  function setOrResetTimer(name) {
    stopTimingAndAnimation();
    $('#block').css("height", "300px");
    $('#marumaru').css("background-color", "green")
    $('#timer').html($('#session-num').html() + ':00');
    $('#break').hide();
    $('#session').show();
  }


  function changeSituation() {
    $('#break').toggle();
    $('#session').toggle();
    $('#timer').html($('#break-num').html() + ':00');
    $('#block').css("height", "300px");
    if($('#marumaru').css("background-color") ==  'rgb(255, 0, 0)') {
      $('#marumaru').css("background-color", "green");
    } else {
      $('#marumaru').css("background-color", "red");
    }
    startTimingAndAnimation();
  }

});//end of document.ready