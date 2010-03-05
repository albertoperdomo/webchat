Terms
========

Comet
-----
Reverse AJAX, server push. It's a method to push data from a server to the web clients without the need to do polling.

Comet server/solutions
======================

Orbited
-------
Implementation of Comet using a push server in Python that can interact with a wide variety of messaging protocols such as STOMP, IRC, XMPP, etc.
http://orbited.org

Stream-Hub
----------
It's a commercial project with a "free" community edition limited to 10 concurrent users.
http://www.stream-hub.com/

For an overview of existing solutions please visit  the[Comet server comparison matrix](http://cometdaily.com/maturity.html)

Protocols
==========

Stomp (Streaming Text Orientated Messaging Protocol)
----------------------------------------------------
Stomp is an interoperable procotol for the exchange of messages between different programming languages, platforms and brokers.

XMPP (Extensible Messaging and Presence Protocol)
-------------------------------------------------
Open technology for real time communication used 
Tecnología abierta para la comunicación en tiempo real utilizada mayormente para mensajería instantánea, alerta de presencia, chat multiusuario, llamadas de video y voz, etc. etc. Fue desarrollada inicialmente por la comunidad Jabber.

Setup with Rails app + Orbited
==============================

Install Orbited server (on Ubuntu)
----------------------------------
* Make sure build-essential python and python-dev are installed (via apt)
* Install setuptools: sudo aptitude install python-setuptools
* Install twisted: sudo easy_install twisted
* Install orbited: sudo easy_install orbited)
* Check to see if orbited was installed correclty: open python interactive console with "python" and "import orbited". If you see no error you are good.
* Install cjson: sudo aptitude install python-cjson
* You are still missing the config file /etc/orbited.cfg. It can be generated using the rails plugin or put together by hand. You should find an example in this repo.

Stomp server
------------
Orbited provides a built-in stomp server (morbid). You can also install it separately with: sudo easy_install morbid
There is a flag in the orbited configuration file to tell it start the built-in morbid server.
Morbid is good enough for development and testing. For something more production-ready you should look at alternatives such as ActiveMQ, RabbitMQ, StompConnect, etc.

Rails app with Orbited and Stomp
--------------------------------
You will find a sample rails app in this repo for test and evaluation purposes.
If you want to start your own rails app follow this instructions:

* Install ruby and rails 2.3.5
* Install the stomp gem and add it to config/environment.rb: config.gem "stomp"
* Install orbited plugin: script/plugin install git://github.com/mallio/orbited
* Change the config file to suit your setup: config/orbited.yml
* Generate the config file for the Orbited server or write it yourself: script/generate orbited_config

Caveats
-------

* If you start the orbited server as root it will ask you for a user account to switch to after startup. In this case make sure you have a user specified in the global section of the config file like this:
[global]
user=<orbited_user>
  
Resources
=========

Links
-----
* [Orbited](http://orbited.org/)
* [Plugin Orbited on Rails](http://github.com/mallio/orbited)
* [Article about Comet with some dataflow schemes](http://ajaxian.com/archives/comet-a-new-approach-to-ajax-applications)
* [STOMP](http://stomp.codehaus.org/)
* [XMPP](http://xmpp.org/)
* [Component diagrams](http://orbited.org/wiki/MorbidQ)
* [Comet server comparison matrix](http://cometdaily.com/maturity.html)