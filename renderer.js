// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.jQuery = window.$ = require('./node_modules/jquery/dist/jquery.min');

var mock = [];
for (var i = 0; i < 100; i++) {
  mock.push(i);
}

var $mock = mock.map(function(number) {
  var $tr = $('<tr></tr>');
  var $td = $('<td></td>');
  $td.html(number);
  $tr.append($td);
  return $tr;
});

$('#timeline').append($mock);
