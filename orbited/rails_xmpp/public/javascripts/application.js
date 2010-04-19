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

//$(document).ready(function() {
//  $("#new_chat_contact").submitWithAjax();
//  $("#send_chat_message").submitWithAjax();
//});
