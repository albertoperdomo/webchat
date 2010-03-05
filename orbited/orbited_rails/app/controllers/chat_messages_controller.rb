class ChatMessagesController < ApplicationController

  def create
    @message = ChatMessage.create(params[:chat_message])
    Orbited.send_data('hello', @message.content)
  end

end
