Instructions
============

* Check out this repo
* Copy config/example_database.yml to config/database.yml and adapt to suit your DB
* Copy config/example_orbited.yml to config/orbited_yml and adapt to suit your orbited/stomp setup
* Install libcurl package (sudo aptitude install libcurl4-gnutls-dev) and install rubygems and curb gem.
* Make sure the XMPP server ejabberd is installed.
* Copy config/ejabberd_authentication.rb to /etc/ejabberd/authentication.rb (for example) and adapt your ejabberd setup to use this file for extertal authentication.
* Make sure application is accessible from ejabberd server.
* Start ejabberd and check authentication.rb script is running.
* Make sure orbited is installed and running 

Orbited/Rails integration
=========================

If you run the rails app on different domains/machines and/or ports you are going to have quite some trouble to get things running.
This is because browsers restrict JS access to the frames from different domains, ports, etc.
The cleanest way is that Orbited server and Rails server look the same to the client. This means running some sort of proxy server which routes requests to Orbited server or Rails based on simple rules.
You can use HAproxy, nginx or apache proxy for his purpose.

I've ended up using Apache + mod_proxy + passenger + orbited. This is my setup:
* Jabber runs on port 5222. We have used ejabberd but any XMPP server will do.
* Orbited runs on port 8000
* Rails running with passenger + proxy on port 80
* The Orbited server and the rails app need to be exposed to the internet. The XMPP server just listens to local connections from the Orbited server and/or the Rails app.
The way it works is your browser (the client) opens a connection to the Orbited server and tells the Orbited server to open a local connection to the MQ server (in this case XMPP). The function of the orbited server is to proxy the client to send/receive to the MQ server. Nothing more.


This is how my /etc/orbited.cfg config file looks like:

    # Orbited Configuration file

    [global]
    reactor = select
    proxy.enabled = 1
    session.ping_interval = 40
    session.ping_timeout = 30
    user=chat

    [listen]
    http://:8000

    [static]

    [access]
    * -> webchat:5222

    [logging]
    debug=STDERR,debug.log
    info=STDERR,info.log
    access=STDRR,info.log
    warn=STDERR,error.log
    error=STDERR,error.log

This is how my apache site config file looks like. Be sure to enable mod_proxy and and mod_proxy_http: sudo a2enmod proxy proxy_http:

    NameVirtualHost *:80
    <VirtualHost *:80>
      ServerName localhost

      ErrorLog /var/log/apache2/webchat_error.log
      LogLevel warn

      CustomLog /var/log/apache2/webchat_access.log combined

      DocumentRoot /var/www/webchat/orbited/rails_xmpp/public/
      RailsEnv development

      ProxyPreserveHost On
      ProxyVia full

      <Directory "/var/www/webchat/orbited/rails_xmpp/public/">
        Options FollowSymLinks
        AllowOverride None
        Order allow,deny
        Allow from all
      </Directory>

      <Location "/tcp">
        Sethandler none
        Order allow,deny
        Allow from all
      </Location>

      <Location "/orbited">
        SetHandler none
        Order allow,deny
        Allow from all
      </Location>
  
      <Location "/static">
        SetHandler none
        Order allow,deny
        Allow from all
      </Location>

      ProxyPass /tcp http://localhost:8000/tcp
      #ProxyPass /orbited http://localhost:8000/
      ProxyPass /static http://localhost:8000/static

    </VirtualHost>

Resources
=========

Links
-----
* [How to auhenticate XMPP users externally using Ruby and ejabberd](http://thinkincode.net/2007/1/1/ruby-y-ejabberd)
