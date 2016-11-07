$(document).ready(function() {

  var mySetTimeout = [];
  var round, gameArr, playerArr;
  var setMonitorTimeout = [];

  // mouseDownUpAnimate(false);

  $('#switch').click(function() {
    // if on return true, else return false
    var status = switchStatus();
    // if true, click start-btn to strat the game and open the mouseDownUpAnimate
    if(status) {
      $('#monitor p').html('- -');
      $('#start-btn').click(function() {
        startSimonGame();
      });
      $('#strict').click(function(){
        redDotColor();
      });
    // if false, clearCurrentTimeoutAndResetCss, off the mouseDownUpAnimate
    } else {
      clearCurrentTimeoutAndResetCss();
      mouseDownUpAnimate(false);
    }
  });

  function startSimonGame() {
    round = 1;
    gameArr = new Array;
    playerArr = new Array;
    newVal = getNewRandomVal();
    gameArr.push(newVal);
    clearCurrentTimeoutAndResetCss();
    shineCurrentGameArr(gameArr);
  }


  function shineCurrentGameArr(arr) {
    for(var i = 0; i < arr.length; i++) {
      (function(val) {
        mySetTimeout.push(setTimeout(function() {brightTheLight(arr[val]);}, i * 800));
        mySetTimeout.push(setTimeout(function() {offTheLight(arr[val]);}, i * 800 + 600));
      })(i);
    }
    showCurrentRound();
    mouseDownUpAnimate(false);
    playerRound(arr.length);
  }

  function playerRound(arrLength) {
      mySetTimeout.push(setTimeout(function() {mouseDownUpAnimate(true); console.log('cccc');}, arrLength * 800));
  }

  function checkPlayerArr() {
    var lastValInPlayerArr = playerArr[playerArr.length - 1];
    var valInGameArr = gameArr[playerArr.length - 1]
    //若目前所有player arr == gameArr，但player arr的長度還不及gmae arr的長度，則繼續執行playerRound;
    if (lastValInPlayerArr == valInGameArr && playerArr.length < gameArr.length) {
    //若目前所有player arr == gameArr，且player arr的長度等於gmae arr的長度，則進入下一round
    } else if(lastValInPlayerArr == valInGameArr && playerArr.length == gameArr.length) {
      if(round == 28) {
        shineMonitor('Win!', clearCurrentTimeoutAndResetCss);
        mouseDownUpAnimate(false);
      } else {
        playerArr = [];
        round += 1;
        gameArr.push(getNewRandomVal());
        mySetTimeout.push(setTimeout(function() {shineCurrentGameArr(gameArr);}, 800));
      }
    //若按下的鍵與game arr的相對位置不同，則
    } else if(lastValInPlayerArr != valInGameArr) {
      //若stract關閉
      if($('#red-dot').css('background-color') == 'rgb(0, 0, 0)') {
        playerArr = [];
        mySetTimeout.forEach(function(timer) {
          clearTimeout(timer);
        });
        shineMonitor('!!', shineCurrentGameArr);
      //若stract開啟
      } else {
        shineMonitor('!!', startSimonGame);
      }
      
      // shineCurrentGameArr(gameArr);
    } else {
      console.log('checkPlayerArr went wrong!!');
    }
  }


  function clearCurrentTimeoutAndResetCss() {
    //reset background-color
    for(var i = 1; i < 5; i++) {
      offTheLight(switcher(i));
    }
    $('#monitor p').html('');
    //clear Timeout
    mySetTimeout.forEach(function(timer) {
      clearTimeout(timer);
    });
     //clear Timeout
    setMonitorTimeout.forEach(function(timer) {
      clearTimeout(timer);
    });
  }

  function showCurrentRound() {
    $('#monitor p').html(round);
  }

  //get random id of four color i.e. 'top-left'
  function getNewRandomVal() {
    //rendom number from 1 to 4
    var val = Math.floor(Math.random() * 10 / 2.5) + 1;
    return switcher(val)
  }

  function shineMonitor(words, callback) {
    clearCurrentTimeoutAndResetCss();
    $('#monitor p').html(words).show();
    setMonitorTimeout.forEach(function(timer) {
      clearTimeout(timer)
    });

    for(var i = 0; i < 5; i++) {
      (function(val) {
        // brightTheLight(arr[val], i * 800);
        // offTheLight(arr[val], i * 800 + 700);
        if(val == 0) {
          setMonitorTimeout.push(setTimeout(function() {callback(gameArr);}, 1600));
        } else {
          setMonitorTimeout.push(setTimeout(function() {$('#monitor p').toggle();}, val * 200));
        }
      })(i);
    }
    
  }

  function switcher(val) {
    switch(val) {
      case 1:
        return 'top-left';
      case 2:
        return 'top-right';
      case 3:
        return 'bot-right';
      case 4:
        return 'bot-left';
      default:
        console.log('getNewRandomVal went wrong')
        break;
    }
  }

  function mouseDownUpAnimate(status) {
    
    if(status) {
      $('.btn').on('mousedown', function(e) {
        e.stopPropagation();
        brightTheLight(this.id);
        playerArr.push(this.id); 
      });
      $('.btn').on('mouseup', function(e) {
        e.stopPropagation();
        offTheLight(this.id);
        checkPlayerArr();
      }); 
    // if switch is off, off the anumate
    } else {
      $('.btn').off('mousedown');
      $('.btn').off('mouseup');
    }
  }

  function brightTheLight(id, delaySpeed) {
    var arr = $('#' + id).css('background-color').slice(4, -1).split(', ');
    arr = arr.map(Number).map(function(val) {
      if(val != 0) {
        return '255';
      } else {
        return '0'
      }
    });
    playAudio(id, 'play');
    var color = 'rgb(' + arr.join(', ') + ')'
    $('#' + id).css('background-color', color);
  }

  function offTheLight(id, delaySpeed) {
    var arr = $('#' + id).css('background-color').slice(4, -1).split(', ');
    arr = arr.map(Number).map(function(val) {
      if(val != 0) {
        return '153';
      } else {
        return '0'
      }
    });
    playAudio(id, 'stop');
    var color = 'rgb(' + arr.join(', ') + ')'
    $('#' + id).css('background-color', color);
  }
  
  function switchStatus() {
    if($('#switch').css('left') == '0px') {
      $('#switch').animate({'left': '20px'}, 200);
      return true;
    } else {
      $('#switch').animate({'left': '0px'}, 200);
      return false;
    }
  }

  function playAudio(id, status) {
    if(status == 'play') {
      var x = document.getElementById(id + '-sound');
      x.currentTime = 0.1;
      x.play();
    } else {
      document.getElementById(id + '-sound').pause();
    }
    
  }

  function redDotColor() {
    if($('#red-dot').css('background-color') == 'rgb(0, 0, 0)') {
      $('#red-dot').css('background-color', '#e60000');

    } else {
      $('#red-dot').css('background-color', 'rgb(0, 0, 0)');
    }
  }


});//end of document.ready

