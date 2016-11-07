$(document).ready(function() {

  // $('h4').animate({
  //   top: '115px'
  // }, 400);

  var playerMark, computerMark, playerLastMove, computerLastMove;
  var playerMoves = [];
  var round = 1;
  var arr = [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]];

  

  $('.row1, .row2, .row3, #choose-page, #result-page').hide();

  $('button').click(function() {
    var btnId = this.id;
    console.log(this.id);
    if(btnId == 'go-button') {
      hideGoPage(showChoosePage);
    } else if(btnId == 'O-button' || btnId == 'X-button') {
      hideChoosePage(showMainPage);
      if(btnId == 'O-button') {
        playerMark = 'O';
        computerMark = 'X';
      } else {
        playerMark = 'X';
        computerMark = 'O';
      }
    } else if(btnId == 'reset') {
      clearHtml();
      hideResultPage(showMainPage);
    }
  });

  function hideGoPage(callback) {
    $('#go-page p, #go-page button').animate({
      opacity: '0'
    }, 400, hideIt)
    function hideIt() {
      $('#go-page').hide(0, callback);
    }
  }

  function showChoosePage(callback) {
    $('#choose-page').show();
    $('#choose-page p, #choose-page button').animate({
      opacity: '0.8'
    }, 400, callback);
  }

  function hideChoosePage(callback) {
    $('#choose-page p, #choose-page button').animate({
      opacity: '0'
    }, 400, hideIt);
    function hideIt() {
      $('#choose-page').hide(0, callback);
    }
  }

  function showMainPage(callback) {
    $('.row1, .row2, .row3').show();
    $('.grid, .row1, .row2, .row3').animate({
      opacity: '0.8'
    }, 400, callback);
    turn(round);
  }

  function hideMainPage(callback, winner) {
    $('.row1, .row2, .row3').animate({
      opacity: '0.1'
    }, 400, callback(winner));
  }

  function showResultPage(winner) {
    console.log('you win');
    $('#result-page p').html(winner)
    $('#result-page').show();
    $('#result-page p, #result-page button').animate({
      opacity: '0.9'
    }, 400);
  }

  function hideResultPage(callback) {
    $('#result-page p, #result-page button').animate({
      opacity: '0'
    }, 400, hideIt);
    function hideIt() {
      $('#result-page').hide(0, callback);
    }
  }

  function turn(num) {
    if(num % 2 !== 0) {
      $('#whos-turn1').animate({
        top: '0px'
      },'500');
      $('#whos-turn2').animate({
        top: '115px'
      },'500');
      fillIt(playerMark)
    } else {
      $('#whos-turn1').animate({
        top: '115px'
      },'500');
      $('#whos-turn2').animate({
        top: '0px'
      },'500');
      setTimeout(function() {
        AI(computerMark);
      }, 500);
      
    }
    
  }

  function fillIt(mark) {
    $('.grid').unbind().click(function() {
      var id = this.id;
      playerLastMove = id;
      playerMoves.push(id);
      console.log('playerLastMove from fillIt', playerLastMove);
      if($('#' + id).html() == '') {
        $('#' + id).html(mark);
        checkStatus(id, mark);
      } 
    });
  }

  function checkStatus(id, mark) {
    // id = row-col
    var id = id.split('-');
    var row = Number(id[0]) - 1;
    var col = Number(id[1]) - 1;

    arr[row][col] =  mark;

    var transposeArr = transpose(arr);
    var check1 = checkRow(arr[row]);
    var check2 = checkRow(transposeArr[col]);
    //當mark在對角線位置時，判斷對角線是否連成線
    //row == col時 使用第一種判斷方式
    if(row == col || (row + col) == 2) {
      var check3 = checkDiagonal(arr);
    }
    
    //若三種check方式有一個回傳false則結束遊戲，其餘換一方繼續遊戲
    if(check3 == false || check2 == false || check1 == false) {
      if(mark == playerMark) {
        hideMainPage(showResultPage, 'You Win');
      } else if (mark == computerMark) {
        hideMainPage(showResultPage, 'Computer Win');
      }
    } else if (round == 9 && check1 == true && check2 == true && check3 != false) {
      hideMainPage(showResultPage, 'Tie');
    } else {
      round += 1;
      console.log('round', round);
      turn(round);
    }
  }

  function transpose(array) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
      newArr.push([]);
      for (var j = 0; j < i+1; j++) {
        //swap element[i,j] and element[j,i]
        var temp = array[i][j]
        newArr[i][j] = array[j][i];
        newArr[j][i] = temp;
      }
    }
    return newArr;
  }

  function checkRow(array) {
    if(array[0] == array[1] && array[1] == array[2]) {
      console.log('checkRow reutrn');
      return false;
    } else {
      return true;
    }
  }

  function checkDiagonal(array) {
    if(array[0][0] == array[1][1] && array[1][1] == array[2][2] && array[0][0] != undefined) {
      console.log('Diag reutrn')
      return false;
    } else if (array[0][2] == array[1][1] && array[1][1] == array[2][0] && array[0][2] != undefined) {
      console.log('Diag reutrn')
      return false;
    } else {
      return true;
    }
  }

  function clearHtml() {
    $('.grid').html('');
    round = 1;
    arr = [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]];
    playerMoves = [];
  }

  function AI(mark) {
    var row, col, id;
    var lastMove = playerLastMove.split('-');
    console.log('playerLastMove', playerLastMove);
    var playerRow = Number(lastMove[0]);
    console.log('playerRow', playerRow);
    var playerCol = Number(lastMove[1]);
    console.log('playerCol', playerCol)
    var transposeArr = transpose(arr);
    console.log('transposeArr', transposeArr);
    
    if(round == 2 && arr[1][1] == undefined) {
      row = '2';
      col = '2';
    } else if(round == 2 && arr[1][1] != undefined) {
      row = '1'
      col = '1'
    } else {
      //check the row and col that player last placed, if it had two playerMark than return 檢查的空格位置 as 下一個要下的 col
      var compLastMove = computerLastMove.split('-');
      var computerRow = Number(compLastMove[0]);
      var computerCol = Number(compLastMove[1]);
      var col = checkPlayerRowAndCol(arr[playerRow - 1]) + 1;
      console.log('normal check col', col)
      var row = checkPlayerRowAndCol(transposeArr[playerCol - 1]) + 1;
      console.log('normal check row', row);
      if(isNaN(row) && isNaN(col) == false) {
        row = playerRow;
        console.log('set col as playerCol');
      } else if (isNaN(col) && isNaN(row) == false) {
        col = playerCol;
        console.log('set row as playerRow');
      }
      //若中間為player mark 且 player最後下在對角線, 擋住第三個位置
      if((playerLastMove == '1-1' || playerLastMove == '2-2' || playerLastMove == '3-3' || playerLastMove == '1-3' || playerLastMove == '3-1') && arr[1][1] == playerMark) {
        console.log('ccccc')
        var diagonalCheck = checkPlayerDiagonal();
        console.log('diagonalCheck', diagonalCheck);
        diagonalCheck = diagonalCheck.split('-');
        console.log($('#' + diagonalCheck[0] + diagonalCheck[1]).html());
        if($('#' + diagonalCheck[0] + '-' + diagonalCheck[1]).html() == '') {
          row = Number(diagonalCheck[0]);
          console.log(row);
          col = Number(diagonalCheck[1]);
          console.log(col);
        }
        console.log('from diagonal check', row + '-' + col);
      }

      //若computer可以在下回合連成線,先連線
      var computerNextRow = checkPlayerRowAndCol(transposeArr[computerCol - 1]) + 1;
      var computerNextCol = checkPlayerRowAndCol(arr[computerRow - 1]) + 1;
      if(isNaN(computerNextRow) && isNaN(computerNextCol) == false) {
        computerNextRow = computerRow;
      } else if (isNaN(computerNextCol) && isNaN(computerNextRow) == false) {
        computerNextCol = computerCol;
      }
      if((computerLastMove == '1-1' || computerLastMove == '3-3' || computerLastMove == '1-3' || computerLastMove == '3-1') && arr[1][1] == computerMark) {
        console.log('ooooooo');
        var compDiagonalCheck = checkPlayerDiagonal();
        if($('#' + compDiagonalCheck).html() == '') {
          compDiagonalCheck  = compDiagonalCheck.split('-');
          console.log('ddddd')
          computerNextRow = Number(compDiagonalCheck[0]);
          computerNextCol = Number(compDiagonalCheck[1]);
        }
      }
      console.log('computerNextRow', computerNextRow);
      console.log('computerNextCol', computerNextCol);

    }

    //若computer能連線
    if(isNaN(computerNextRow) == false && isNaN(computerNextCol) == false) {
      console.log('11111');
      AIFillIt(mark, computerNextRow, computerNextCol);
    //若computer不能連線且player能連線
    } else if (isNaN(computerNextRow) && isNaN(computerNextCol) && isNaN(row) == false && isNaN(col) == false) {
      console.log('22222');
      AIFillIt(mark, row, col);
    //若兩者皆不行連線
    } else {
      console.log('33333');
      if(round == 4) {
        console.log('hello1')
        if(arr[1][1] == playerMark) {
          row = 3;
          col = 1;
        } else {
          var res = checkRoundFour();
          row = res[0];
          col = res[1];
        } 
      } else {

        for(var i = 0; i < 3; i++) {
          for(var j = 0; j < 3; j++) {
            if(arr[i][j] == undefined) {
              row = i + 1;
              col = j + 1;
            }
          }        
        }
      } 
      
      AIFillIt(mark, row, col);
      
    }
  }

  function AIFillIt(mark, row, col) {
    if($('#' + row + '-' + col).html() == '') {
      $('#' + row + '-' + col).html(mark)
      id = row + '-' + col;
      computerLastMove = id;
      console.log('com will fill', id);
      checkStatus(id, mark);
    } else {
      console.log('some thing wrong at AIFillIt!!');
    }
  }

  function checkPlayerRowAndCol(array) {
    console.log('row or col', array);
    var rowJoin = array.join('');
    console.log('rowJoin', rowJoin);
    if(rowJoin.length == 2 && rowJoin == (computerMark + computerMark)) {
      if(array.indexOf(undefined) != -1) {
        return array.indexOf(undefined);
      } else {
        for(var i = 0; i < 3; i++) {
          if(array[i] == undefined) {
            return i
          }
        }
      }
    //若array裡面有兩個重複的值，且array有一個空位，回傳row & col
    } else if(rowJoin.length == 2 && rowJoin == (playerMark + playerMark)) {
      console.log('indexOf', array.indexOf(undefined));
      console.log('3-2 is', array[1]);
      if(array.indexOf(undefined) != -1) {
        return array.indexOf(undefined);
      } else {
        for(var i = 0; i < 3; i++) {
          if(array[i] == undefined) {
            return i
          }
        }
      }
    }
  }

  function checkPlayerDiagonal() {
    if(playerLastMove == '1-1') {
      return '3-3';
    } else if (playerLastMove == '3-3') {
      return '1-1';
    } else if (playerLastMove == '1-3') {
      return '3-1';
    } else if (playerLastMove == '3-1') {
      return '1-3';
    } else {
      console.log('diagonalCheck miss something');
    }
    if(computerLastMove == '1-1') {
      return '3-3';
    } else if (computerLastMove == '3-3') {
      return '1-1';
    } else if (computerLastMove == '1-3') {
      return '3-1';
    } else if (computerLastMove == '3-1') {
      return '1-3';
    } else {
      console.log('diagonalCheck miss something');
    }
  }

  function checkRoundFour() {
    var playerMoveRowCol = []
    playerMoves.map(function(val) {
      playerMoveRowCol.push(val.split('-').map(Number));
    });
    console.log('playerMoveRowCol', playerMoveRowCol);
    var firstMove = playerMoveRowCol[0];
    console.log('firstMove', firstMove);
    var secondMove = playerMoveRowCol[1];
    console.log('secondMove', secondMove);
    console.log(firstMove == [3, 2]);
    var rowSubtraction = Math.abs(firstMove[0] - secondMove[0]);
    var colSubtraction = Math.abs(firstMove[1] - secondMove[1]);
    //例： 1-2, 3-1 || 1-2, 3-3等等 無法在下回合連成線的組合
    if((rowSubtraction == 1 && colSubtraction == 2) || (rowSubtraction == 2 && colSubtraction == 1)) {
      if(compareArray(1, 2, firstMove, secondMove)) {
        if(compareArray(3, 1, firstMove, secondMove)) {
          return [1, 1];//這不能回傳[3, 2] || [3, 3] || [1, 3]
        } else if(compareArray(3, 3, firstMove, secondMove)) {
          return [1, 3];
        } else {
          console.log('something wrong');
        }
      } else if(compareArray(3, 2, firstMove, secondMove)) {
        if(compareArray(1, 1, firstMove, secondMove)) {
          return [3, 1];
        } else if(compareArray(1, 3, firstMove, secondMove)) {
          return [3, 3];
        } else {
          console.log('something wrong');
        }
      } else if(compareArray(2, 1, firstMove, secondMove)) {
        if(compareArray(1, 3, firstMove, secondMove)) {
          return [1, 1];
        } else if(compareArray(3, 3, firstMove, secondMove)) {
          return [3, 1];
        } else {
          console.log('something wrong');
        }
      } else if(compareArray(2, 3, firstMove, secondMove)) {
        if(compareArray(1, 1, firstMove, secondMove)) {
          return [1, 3];
        } else if(compareArray(3, 1, firstMove, secondMove)) {
          return [3, 3];
        } else {
          console.log('something wrong');
        }
      } else {
        console.log('something wrong');
      }
    //例：1-3, 3-1 || 1-1, 3-3，放置於四個邊的中間可解
    } else if(rowSubtraction == 2 && colSubtraction == 2) {
      return [1, 2]; // [2,1], [2,3], [3,2]也可以
    //例： 1-2, 2-1 || 1-2, 2-3等等，
    } else if(rowSubtraction == 1 && colSubtraction == 1) {
      //這個if後剩下兩種可能1-2, 2-1 || 2-3, 3-2
      if(arr.equals(transpose(arr))) {
        if(compareArray(1, 2, firstMove, secondMove)) {
          return [1, 1];
        } else {
          return [3, 3];
        }
      //else剩下1-2, 2-3 || 2-1, 3-2
      } else if(arr !== transpose(arr)){
        if(compareArray(1, 2, firstMove, secondMove) && compareArray(2, 3, firstMove, secondMove)) {
          return [1, 3];
        } else if(compareArray(2, 1, firstMove, secondMove) && compareArray(3, 2, firstMove, secondMove)) {
          return [3, 1];
        } else {
          console.log('something wrong');
        }
      } else {
        console.log('something wrong');
      }
    } else if((rowSubtraction == 0 && colSubtraction == 2) || (rowSubtraction == 2 && colSubtraction ==0) ) {
        return [1, 3]
    } else {
      console.log('something wrong');
    }
  }

  function compareArray(num1, num2, arr1, arr2) {
    if((arr1[0] == num1 && arr1[1] == num2) || (arr2[0] == num1 && arr2[1] == num2)) {
      return true;
    } else {
      return false;
    }
  }

  if(Array.prototype.equals) 
    {console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");}
  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)  {return false;}       

    // compare lengths - can save a lot of time 
    if (this.length != array.length) {return false;}
      

      for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
          // recurse into the nested arrays
          if (!this[i].equals(array[i])) {return false;}     
        }           
        else if (this[i] != array[i]) { 
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;   
        }           
      }       
    return true;
  }

})//end of document.ready