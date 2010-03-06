class ChatMessagesController < ApplicationController

  def create
    @message = ChatMessage.create(params[:chat_message])
    data = render_to_string :update do |page|
      page['messages'].insert :bottom => "<div class='message'>#{Time.now.strftime("%I:%M%p")} - Received: #{@message.content}</div>"
    end
    Orbited.send_data('hello', data)
  end


end
