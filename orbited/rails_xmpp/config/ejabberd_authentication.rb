#!/usr/bin/ruby
require 'rubygems'
require 'curb' #curb gem requires install package libcurl4-gnutls-dev

class EjabberdAuthentication
  SITE_URL = "http://xmpp.webchat"

  def initialize 
    buffer = String.new
    
    begin
      while STDIN.sysread(2, buffer) && buffer.length == 2
        length = buffer.unpack('n')[0]
        operation, username, domain, token = STDIN.sysread(length).split(':')
      
        response = case operation
          when 'auth'
            Curl::Easy.perform("#{SITE_URL}/token_auth?login=#{username}&token=#{token.chomp}").body_str == "ok" ? 1 : 0
          when 'isuser'
            Curl::Easy.perform("#{SITE_URL}/is_user?login=#{username}").body_str == "ok" ? 1 : 0
          else
           0
        end
        STDOUT.syswrite([2, response].pack('nn'))
      end
    rescue Exception => exception
      puts 'Exception ' + exception.to_s
    end
  end

  EjabberdAuthentication.new
end
