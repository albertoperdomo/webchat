class ChatMessagesController < ApplicationController

  def create
    @message = ChatMessage.create(params[:chat_message])
  end

end
