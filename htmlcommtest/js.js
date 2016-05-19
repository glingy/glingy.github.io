var messagecounter;
var messagechecker = function() {
  $.ajax({
            type: "post",
            url: "getmessages.php",
            data: {name: 2},
            success: function(data) {
                document.getElementById("messages").innerHTML = document.getElementById("messages").innerHTML + "<hr>" + data;
            }
        });
}

var run = function() {
  messagecounter = 0;
  //alert("YES!");
  var frm = $('form');
    frm.submit(function(event) {
        $.ajax({
            type: frm.attr('method'),
            url: "processmessage2.php",
            data: frm.serialize(),
            success: function(data) {
                document.getElementById("messagesubmission").innerHTML = data;
            }
        });
        event.preventDefault();
    });
  setInterval(messagechecker(), 1000);
};