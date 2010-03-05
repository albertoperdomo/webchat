class ChatMessagesController < ApplicationController

  def create
    @message = ChatMessage.create(params[:chat_message])
    data = render_to_string :update do |page|
      page.alert @message.content
    end
    Orbited.send_data('hello', data)
  end


end
