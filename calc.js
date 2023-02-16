function display(val){
    document.getElementById('result').value += val
    const x= document.getElementById('result').value
    let expression = document.getElementById('result').value.replace(/([+-/*]){2,}/g, "$1")
    document.getElementById('result').value = expression
    if(x){
      setTimeout(()=>{
        result()

      },500) 
      
    }
    return val
}
function removeConsecutiveDuplicates(input){
    if(input.length<=1)
    return input;
    if(input[0]==input[1])
    return removeConsecutiveDuplicates(input.substring(1));
    else
    return input[0] + removeConsecutiveDuplicates(input.substring(1));
}
function result(){

    let x = document.getElementById('result').value
    console.log(x)
    if(x){
        let y =  evaluateExpression(x); 
        document.getElementById('result').value = y
        return y
    }
}
function removeLast(){
	let str = document.getElementById('result').value
	str = str.slice(0, -1); 
console.log(str);
	document.getElementById('result').value = str
    return str;
	
}
function clearScreen(){
    document.getElementById('result').value = ''
}
function evaluateExpression(expression) {
	 const f = {
    add: '+',
    sub: '-',
    div: '/',
    mlt: '*',
    mod: '%',
    exp: '^'
  };
  f.ooo = [
    [
      [f.mlt],
      [f.div],
      [f.mod],
      [f.exp]
    ],
    [
      [f.add],
      [f.sub]
    ]
  ];

  expression = expression.replace(/[^0-9%^*\/()\-+.]/g, ''); // clean up unnecessary characters

  let output;
  for (let i = 0, n = f.ooo.length; i < n; i++) {

    // Regular Expression to look for operators between floating numbers or integers
    let re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
    re.lastIndex = 0; // take precautions and reset re starting pos

    // Loop while there is still calculation for level of precedence
    while (re.test(expression)) {
      output = operate(RegExp.$1, RegExp.$2, RegExp.$3);
      if (isNaN(output) || !isFinite(output)) 
        return output; // exit early if not a number
      expression = expression.replace(re, output);
    }
  }
  if(output){
    return output
  }else{
    return expression
  }
}
function operate(a, op, b) {
	 const f = {
    add: '+',
    sub: '-',
    div: '/',
    mlt: '*',
    mod: '%',
    exp: '^'
  };
  f.ooo = [
    [
      [f.mlt],
      [f.div],
      [f.mod],
      [f.exp]
    ],
    [
      [f.add],
      [f.sub]
    ]
  ];
    
    a = a * 1;
    b = b * 1;
    switch (op) {
      case f.add:
        return a + b;
        break;
      case f.sub:
        return a - b;
        break;
      case f.div:
        return a / b;
        break;
      case f.mlt:
        return a * b;
        break;
      case f.mod:
        return a % b;
        break;
      case f.exp:
        return Math.pow(a, b);
        break;
      default:
        null;
    }
  
}
window.onload = function () {
	
	document.onkeypress = keyboardInput;
    
    // for deleting value using backspace
    document.onkeydown = backspaceKeyEvent;
}
function keyboardInput(key) {
    if ((key.which < 0 || key.which > 57) && (key.which !== 13 && key.which !== 99)) {
        return false;
    } else {
        key.preventDefault();
		let x =document.getElementById('result').value
        if (key.which === 48) {
            x += "0";
        } else if (key.which === 49) {
            x += "1";
        } else if (key.which === 50) {
            x += "2";
        } else if (key.which === 51) {
            x += "3";
        } else if (key.which === 52) {
            x += "4";
        } else if (key.which === 53) {
            x += "5";
        } else if (key.which === 54) {
            x += "6";
        } else if (key.which === 55) {
            x += "7";
        } else if (key.which === 56) {
            x += "8";
        } else if (key.which === 57) {
            x += "9";
        } else if (key.which === 46) {
            x += ".";
        } else if (key.which === 40) {
            x += "(";
        } else if (key.which === 41) {
            x += ")";
        } else if (key.which === 42) {
            x += "*";
        } else if (key.which === 47) {
            x += "/";
        } else if (key.which === 43) {
            x += "+";
        } else if (key.which === 45) {
            x += "-";
        } else if (key.which === 13) {
            result();
        } else if (key.which === 99) {
            clearScreen();
        } else {
            x = x;
        }
        return true;
    }
}
// for deleting value using backspace
function backspaceKeyEvent (event) {
    if (event.which === 8) {
        removeLast();
    }
}