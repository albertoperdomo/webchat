class ChatMessagesController < ApplicationController

  def create
    #@message = ChatMessage.create(params[:chat_message])
    @jid = params[:chat_message][:recipient_id]
    @content = params[:chat_message][:content]
  end

end
