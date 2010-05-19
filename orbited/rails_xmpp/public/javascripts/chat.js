////
// create xmpp client
// register callbacks
// connect to xmpp server
xmpp = new XMPPClient();
xmpp.onPresence = function(ntype, from, to) {
    if (! ntype) {
      //alert("User " + from + " available");
      $('#buddy_' + $.escape(from.split('/')[0]) + ' span.presence').empty().append("online");
    }
    else if (ntype == "unavailable") {
      //alert("User " + from + " unavailable");
      $('#buddy_' + $.escape(from.split('/')[0]) + ' span.presence').empty().append("offline");
    }
    else if (ntype == "subscribe") {
      xmpp.sendSubscribed(from, to);
      alert("SUSCRIBE");
    }
    else if (ntype == "subscribed") {
      alert(from + " added to your buddy list!");
    }
    else if (ntype == "unsubscribed") {
      alert("User " + from + " unsubscribed");
    }
}

xmpp.onRoster = function(ntype, buddy, subscription, ask) {
  //alert("ROSTERIZE: " + buddy + " with subscription " + subscription + " and type " + ntype);
  if ((subscription == "both" || subscription == "to") || (ask == "subscribe" && (subscription == "none" || subscription == "from"))) {

    if (ask == "subscribe") {
      var subscription_status = "pending"
    }
    else {
      var subscription_status = "in roster"
    }

    if ($('#buddy_' + $.escape(buddy)).length == 0) {
      $('#roster').append("<li class='contact' id='buddy_" + buddy + "'>" + buddy + " <span class='unreaded'></span> <span class='presence'>offline</span> <span class='subscription_status'>" + subscription_status + "</span> <a onclick=\"openChatWindow('" +  buddy + "');\" href='#'>chat</a> <a onclick=\"onRemoveContact('" + buddy + "/Orbited', '" + buddy + "');\" href='#'>remove</a></li>");

      $.getJSON('chat_messages/unreaded_messages_count_by_buddy.json', 'buddy=' + buddy, function(data) {
            $('#buddy_' + $.escape(buddy) + ' span.unreaded').append(data);
          });
    }
    else {
      $('#buddy_' + $.escape(buddy) + ' span.subscription_status').empty().append(subscription_status);
    }

  }
  else if (ntype == "set" && ! ask && (subscription == "from" || subscription == "none")) {
    $('#buddy_' + $.escape(buddy)).remove();
  }
}

xmpp.onMessage = onMessage;
xmpp.onSocketConnect = function() {
  // the xmpp domain for the user
  xmpp.connectServer("localhost", connectSuccess, connectFailure);
}

// 'localhost' is the machine running the ejabberd server
xmpp.connect('localhost', 5222);

////
// helpers
function login() {
  xmpp.login(user_name, user_token, loginSuccess, loginFailure);
}

function prompt_login() {
  var u = prompt("User name","user1");
  if (u) {
      var p = prompt("Password","user1");
      if (p) {
          xmpp.login(u, p, loginSuccess, loginFailure);
      }
  }
}


////
// success / failure callbacks
function registerSuccess() {
  alert("Welcome!");
}
function registerFailure() {
  // if (confirm("That user name is taken. Try again?")) {
  //     prompt_register();
  // }
}
function loginSuccess() {
  //alert("Welcome!");
}
function loginFailure() {
  alert("Login error!")
}
function connectSuccess() {
  login();
}
function connectFailure() {
  alert("Unknown domain");
}

/** Called when a message is received */
function onMessage(jid, username, message_id) {
  // update the UI to reflect the message received
  if ($('#chat_' + $.escape(jid.split('/')[0])).length == 0) {
    var unreaded_msgs = parseInt($('#buddy_' + $.escape(jid.split('/')[0]) + ' span.unreaded').text());
    $('#buddy_' + $.escape(jid.split('/')[0]) + ' span.unreaded').empty().append(unreaded_msgs + 1);
  }
  else {
    $.getJSON('chat_messages/' + message_id + '.json', function(data){
        if (data != null) {
          if ($('#chat_' + $.escape(jid.split('/')[0])).length == 0) {
            $('#chat_box').append('<div id="chat_' + jid.split('/')[0] + '" style="height:100px;border:1px solid black;overflow:scroll;"></div>');
          }
          $('#chat_' + $.escape(jid.split('/')[0])).append("<p class='new'><span class='buddy'>" + username.split('/')[0] + ":</span> " + data.chat_message.content);
        }
      });
  };
}

/** Called when the user types a message to be sent */
function onSendMessage(toJid, toUsername, message_id) {
  // send message to jabber server
  xmpp.msg(toJid, message_id);
}

/** Called when the user wants to add that contact */
function onAddContact(jid) {
  xmpp.subscribe(jid);
  alert("Buddy request sent.");
}

/** Called when the user clicks the user list's remove contact button */
function onRemoveContact(jid, username) {
  xmpp.unsubscribe(jid);
  alert("User " + username + " removed!");
}

/** Called when the user clicks the user list's chat contact button */
function openChatWindow(buddy) {
  $('#buddy_' + $.escape(buddy) + ' span.unreaded').empty().append("0");

  if ($('#chat_' + $.escape(buddy)).length == 0) {
    $('#chat_box').empty();
    $('#chat_box').append('<div id="chat_' + buddy + '" style="height:500px;border:1px solid black;overflow:scroll;"><h3>Chat with ' + buddy + '</h3></div>');
  }

  $.getJSON('chat_messages/last_messages_by_buddy.json', 'buddy=' + buddy, function(data){
      for(var i = 0; i < data.chat_messages.length; i++) {
        if (data.chat_messages[i].chat_message.sender_id == data.buddy) {
          var sender = buddy;
        }
        else {
          var sender = "me";
        };

        if (sender == "me") {
          var sender_class = "me";
        }
        else {
          var sender_class = "buddy";
        };

        if ((sender == buddy) && (data.chat_messages[i].chat_message.state == "unreaded")) {
          var msg_status = "unreaded";
        }
        else {
          var msg_status = "readed";
        };

        $('#chat_' + $.escape(buddy)).append("<p class=" + msg_status + "><span class='" + sender_class + "'>" + sender + ":</span> " + data.chat_messages[i].chat_message.content);
      }
  });

  /* Set recipient_id in send_message form */
  $('#chat_message_recipient_id').val(buddy);

  /* send_message form submit enable */
  $('#chat_message_submit').removeAttr('disabled');
}
