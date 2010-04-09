////
// create xmpp client
// register callbacks
// connect to xmpp server
xmpp = new XMPPClient();
xmpp.onPresence = function(ntype, from, to) {
    if (! ntype) {
      
      //alert("User " + from + " available");
      $('#user_list').append("<li class='contact' id='budy_" + from.split('/')[0] + "'>" + from.split('/')[0] + "</li>");
    }
    else if (ntype == "unavailable") {
      //alert("User " + from + " unavailable");
      $('#budy_' + $.escape(from.split('/')[0])).remove();
    }
    else if (ntype == "subscribe") {
      xmpp.sendSubscribed(from, to);
    }
    else if (ntype == "subscribed") {
      alert(from + " added to your buddy list!");
    }
    else if (ntype == "unsubscribed") {
      alert("User " + from + " unsubscribed");
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
function onMessage(jid, username, text) {
  // update the UI to reflect the message received
  // alert("Received message from " + username + ":\n" + text);
  if ($('#chat_' + $.escape(jid.split('/')[0])).length == 0) {
    $('#chat_box').append('<div id="chat_' + jid.split('/')[0] + '" style="height:100px;border:1px solid black;overflow:scroll;"></div>');
  }
  $('#chat_' + $.escape(jid.split('/')[0])).append("<p><span class='user_sender'>" + username.split('/')[0] + ":</span> " + text);
}

/** Called when the user types a message to be sent */
function onSendMessage(toJid, toUsername, text) {
  // update the UI to reflect the message the user just sent
  // alert("Sending a message to " + toJid + ":\n" + text);
  if ($('#chat_' + $.escape(toJid)).length == 0) {
    $('#chat_box').append('<div id="chat_' + toJid + '" style="height:100px;border:1px solid black;overflow:scroll;"></div>');
  }
  $('#chat_' + $.escape(toJid)).append("<p><span class='self'>me:</span> " + text);
  xmpp.msg(toJid, text);
}

/** Called when the user wants to add that contact */
function onAddContact(jid) {
  xmpp.subscribe(jid);
  alert("Buddy request sent.");
}

/** Called when the user clicks the user list's remove contact button */
function onRemoveContact(jid, username) {
  xmpp.unsubscribe(jid);
  alert("User " + username + "removed!");
}
