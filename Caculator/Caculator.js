
$(document).ready(function() {

  var operatorRegExp = /\+|\-|\×|\÷/;

  //當btn click時，判斷該btn，並執行相對應的function
  $('.btn').click(function() {
    var btn = this.className.split(' ');

    var currentNum = $('.answer').html();
    var currentFormula = $('.formula').html();
    if(currentFormula == 'Digit Limit Met') {
      $('.answer').html('0');
      $('.formula').html('0');
      currentFormula = '0';
      currentNum = '0';
    }
    
    
    if(/btn[0-9]/.test(btn[0]) || btn[0] === 'btnPoint') {
      if(/\=/.test(currentFormula)) {
        $('.answer').html('0');
        $('.formula').html('0');
        currentFormula = '0';
        currentNum = '0';
      }
      var num = btn[0].split('btn');
      showDigit(num[1], currentNum, currentFormula);
    } else if(/btn[0-9]/.test(btn[0]) == false && currentFormula != ''){
      if(/\=/.test(currentFormula)) {
        currentFormula = currentNum;
      }
      var operator = btn[0];
      operate(operator, currentNum, currentFormula);
    }
  });

  //當btn為數字或point時，執行此function
  function showDigit(num, currentNum, currentFormula) {
    // 若顯示數目小於9，且目前顯示的值不為運算符號時，將按下的btn值顯示於.answer及.formula
    if(currentNum.length <= 9 && operatorRegExp.test(currentNum) == false) {
      if(num == 'Point') {
        $('.answer').html(currentNum + '.');
        $('.formula').html(currentFormula + '.');
      } else if (currentNum != '0' && num != '0') {
        $('.answer').html(currentNum + num);
        $('.formula').html(currentFormula + num);
      } else if (currentNum == '0' && num != '0') {
        $('.answer').html(num);
        $('.formula').html(num);
      } else if (currentNum != '0' && num == '0' ) {
        $('.answer').html(currentNum + num);
        $('.formula').html(currentFormula + num);
      }
    //若顯示數目小於9時，且目前顯示的值為運算符號時，按point鍵顯示0.，按其他數字鍵顯示數字
    } else if (currentNum.length <= 9 && operatorRegExp.test(currentNum)) {
      if(num == 'Point') {
        $('.answer').html('0.');
        $('.formula').html(currentFormula + '0.');
      } else if (currentNum != '0' && num != '0') {
        $('.answer').html(num);
        $('.formula').html(currentFormula + num);
      } else if (currentNum == '0' && num != '0') {
        $('.answer').html(num);
        $('.formula').html(currentFormula + num);
      } else if (currentNum != '0' && num == '0' ) {
        $('.answer').html(num);
        $('.formula').html(currentFormula + num);
      }
    } else {
      $('.formula').html('Digit Limit Met');
      $('.answer').html('');
    }
  }

  //當按下的按鍵為運算子時，執行此function
  function operate(operator, currentNum, currentFormula) {
    
    // lastNum為.formula中的最後一個字元
    var lastNum = currentFormula.charAt(currentFormula.length - 1)

    //若算式中最後一個字元為運算子，將按下的按鍵值取代最後一個字元顯示於.answer及.formula
    if(operatorRegExp.test(lastNum)) {
      var newFormula = currentFormula.slice(0, -1);
      if(operator == 'btnPlus') {
        $('.formula').html(newFormula + '+');
        $('.answer').html('+');
      }
      if(operator == 'btnMinus') {
        $('.formula').html(newFormula + '-');
        $('.answer').html('-');
      }
      if(operator == 'btnMult') {
        $('.formula').html(newFormula + '\&times;');
        $('.answer').html('\&times;');
      }
      if(operator == 'btnDiv') {
        $('.formula').html(newFormula + '\&#247;');
        $('.answer').html('\&#247;');
      }
      if(operator == 'btnEqual') {
        caculate(newFormula)
      }
    //若算式中最後一個字元『不』為運算子，將按下的案件值加入.answer及.formula
    } else {
      if(operator == 'btnPlus') {
        $('.formula').html(currentFormula + '+');
        $('.answer').html('+');
      }
      if(operator == 'btnMinus') {
        $('.formula').html(currentFormula + '-');
        $('.answer').html('-');
      }
      if(operator == 'btnMult') {
        $('.formula').html(currentFormula + '\&times;');
        $('.answer').html('\&times;');
      }
      if(operator == 'btnDiv') {
        $('.formula').html(currentFormula + '\&#247;');
        $('.answer').html('\&#247;');
      }
      if(operator == 'btnEqual') {
        caculate(currentFormula);
      }
      if(operator == 'AC') {
        $('.formula').html('0');
        $('.answer').html('0');
      }
      if(operator == 'CE') {
        cancelLastNumbers(currentFormula);
      }
    }
  }

  //若按下的按鍵為『等於』時，運行此function進行結果運算;
  function caculate(formula) {
    var findAllOpertaorRegExp = /[\+\-\×\÷]/g;
    var operatorArr = formula.match(findAllOpertaorRegExp);
    var numberArr = formula.split(operatorRegExp).map(Number);
    
    var mathItUp = {
      '+': function(a, b) {return a + b;},
      '-': function(a, b) {return a - b;},
      '×': function(a, b) {return a * b;},
      '÷': function(a, b) {return a / b;}
    };

    var answer = numberArr.reduce(function(total, cur, idx, arr) {
      var ansOperate = operatorArr[idx - 1];
      if(total != Math.floor(total) || cur != Math.floor(cur)) {
        if(ansOperate == '+') {
          return floatAdd(total, cur);
        }
        if(ansOperate == '-') {
          return floatSubtraction(total, cur);
        }
        if(ansOperate == '×') {
          return floatMul(total, cur);
        }
        if(ansOperate == '÷') {
          return floatDiv(total, cur);
        }
      } else {
        return mathItUp[ansOperate](total, cur);
      }
    });
    showAnswer(answer, formula);
  };

  //浮點數相加
  function floatAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    return (floatMul(arg1, m) + floatMul(arg2, m)) / m;
  }
  //浮點數相減
  function floatSubtraction(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }
  //浮點數相乘
  function floatMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length; } catch (e) { }
    try { m += s2.split(".")[1].length; } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  }
  //浮點數相除
  function floatDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math)
    {
      r1 = Number(arg1.toString().replace(".", ""))
      r2 = Number(arg2.toString().replace(".", ""))
      return (r1 / r2) * pow(10, t2 - t1);
    }
  }

  function showAnswer(num, formula) {
    console.log('formula', formula);
    console.log('result', num);
    var answer = num.toString();
    answerArr = answer.split('.');
    if(answer.length <= 9) {
      $('.answer').html(answer);
      if((formula + '=' + num.toString()).length <= 22) {
        $('.formula').html(formula + '=' + num.toString());
      } else {
        $('.formula').html(num.toString());
      }
    } else if(answer.length > 9 && answerArr.length == 1) {
      $('.formula').html('Digit Limit Met');
      $('.answer').html('');
      // $('.answer').html(answer.slice(0, 10));
    } else {
      if(answerArr[0].length > 9) {
        $('.formula').html('Digit Limit Met');
        $('.answer').html('');
      } else if (answerArr[0].length = 9 && Math.round(num).length <= 9) {
        $('.answer').html(Math.round(num));
      } else if (answerArr[0].length = 9 && Math.round(num).length > 9) {
        $('.formula').html('Digit Limit Met');
        $('.answer').html('');
      } else if (answerArr[0].length < 9) {
        var decimalNum = 9 - answerArr[0].length;
        var decimal = Math.round(answerArr[1].slice(0, decimalNum + 1) / 10);
        $('.answer').html(answerArr[0] + '.' + decimal);
        if((formula + '=' + num.toString()).length <= 22) {
          $('.formula').html(formula + '=' + answerArr[0] + '.' + decimal);
        } else {
          $('.formula').html('=' + answerArr[0] + '.' + decimal);
        }
      }
    }

    
  }

  function cancelLastNumbers(formula) {
    var findAllOpertaorRegExp = /[\+\-\×\÷]/g;
    var operatorArr = formula.match(findAllOpertaorRegExp);
    var numberArr = formula.split(operatorRegExp).slice(0, -1);
    var ceFormula = [];
    for(var i = 0; i < numberArr.length; i++) {
      ceFormula.push(numberArr[i], operatorArr[i]);
    }
    ceFormula = ceFormula.join('');
    console.log(ceFormula);
    $('.formula').html(ceFormula);
    $('.answer').html(operatorArr[operatorArr.length - 1]);
  }



});//end of document.ready
