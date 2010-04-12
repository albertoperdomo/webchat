class ChatMessagesController < ApplicationController

  def create
    message_params = params[:chat_message].merge({ :sender_id => current_user.to_param, :recipient_id => User.find_by_login(params[:chat_message][:recipient_id].split('@')[0]).to_param })
    @message = ChatMessage.new(message_params)

    respond_to do |format|
      if @message.save
        format.js {
          @jid = params[:chat_message][:recipient_id]
          @content = params[:chat_message][:content]
        }
      else
        format.js { render :partial => 'shared/error' }
      end
    end
  end

end
