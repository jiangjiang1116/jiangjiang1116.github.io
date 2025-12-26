"use strict";
function test(a, b) {
  console.log("arugments", arguments[0], arguments[1]);
  console.log(a, b);
  a = 3;
  console.log("arugments", arguments[0], arguments[1]);
  console.log(a, b);
}
test(1, 2);


