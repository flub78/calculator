'use strict'; // For strict mode

/**
 * A small calculator to practive javascript.
 * 
 * Note that to avoid rounding issues the display should ba handled as a string 
 * during input and only converted when equal is pressed.
 * 
 */
const display_current_operand = document.getElementById('current-operand');
const display_previous_operand = document.getElementById('previous-operand');
let operation = "";

/**
 * Callback when a key is pressed
 * @param {*} e 
 */
function key_pressed(e) {
    let key = e.innerText;
    let msg = "key " + key + " pressed";

    if (key >= "0" && key <= "9") {
        digit(key);
        return;
    } else if (key =="AC") {
        ac();
        return;
    } else if (key == '.') {
        decimal();
        return;
    } else if (key == 'DEL') {
        del();
        return;
    } else {
        operator(key);
        return;
    }

    console.log(msg);
    alert(msg);
}

/**
 * Callback for digits
 * @param {*} key 
 */
function digit(key) {
    let curr_op = current_operand();
    if (curr_op == "0.0") {
        set_current_operand(key.toString());
    } else {
        set_current_operand(current_operand().toString() + key.toString());
    }
}
/**
 * Callback for AC
 */
function ac() {
    set_current_operand("0.0");
    set_previous_operand("0.0");
}

/**
 * 
 * @returns Callback for DEL
 */
function del() {
    let curr_op = current_operand();
    if (curr_op.lenght < 2) {
        set_current_operand("0.0");
        return;
    }
    curr_op = curr_op.slice(0, -1);
    set_current_operand(curr_op);
}

/**
 * Callback for decimal dot
 */
function decimal() {
    let curr_op = current_operand();
    if (curr_op.slice(-1) == '.') return;
    curr_op += '.';
    set_current_operand(curr_op);
}

/**
 * Callback for operator
 * @param {*} key 
 */
function operator(key) {
    if (key != "=") {
        operation = key;
        set_previous_operand (current_operand() + ' ' + key);
        set_current_operand("0.0");
    } else {
        let expr = previous_operand()  + ' ' + current_operand();
        let result = eval(expr);
        set_previous_operand(expr);
        set_current_operand(result);
    }
}

/**
 * Returns the current operand value
 */
function current_operand() {
    return display_current_operand.innerText; 
}

/**
 * Set the current operand
 * @param {} value 
 */
function set_current_operand(value) {
    display_current_operand.innerText = value;
}

/**
 * Returns the previous operand value
 */
 function previous_operand() {
    return display_previous_operand.innerText; 
}

/**
 * Set the previous operand
 * @param {} value 
 */
function set_previous_operand(value) {
    display_previous_operand.innerText = value;
}