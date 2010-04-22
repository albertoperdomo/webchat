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
      $('#roster').append("<li class='contact' id='buddy_" + buddy + "'>" + buddy + " <span class='presence'>offline</span> <span class='subscription_status'>" + subscription_status + "</span> <a onclick=\"onRemoveContact('" + buddy + "/Orbited', '" + buddy + "');\" href='#'>remove</a></li>");
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
  alert("Welcome!");
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
  $.getJSON('chat_messages/' + message_id + '.json', function(data){
          if (data != null) {
            if ($('#chat_' + $.escape(jid.split('/')[0])).length == 0) {
              $('#chat_box').append('<div id="chat_' + jid.split('/')[0] + '" style="height:100px;border:1px solid black;overflow:scroll;"></div>');
            }
            $('#chat_' + $.escape(jid.split('/')[0])).append("<p><span class='user_sender'>" + username.split('/')[0] + ":</span> " + data.chat_message.content);
          }
        });
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
