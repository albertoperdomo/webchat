// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
jQuery.ajaxSetup({
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
});

jQuery.fn.submitWithAjax = function() {
  $(this).submit(function() {
    $.post($(this).attr("action"), $(this).serialize(), null, "script");
    return false;
  })
};

// Add indexOf support to IE6+
if (!Array.indexOf) {
  Array.prototype.indexOf = function(obj) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  }
}

//$(document).ready(function() {
//  $("#new_chat_contact").submitWithAjax();
//  $("#send_chat_message").submitWithAjax();
//});
