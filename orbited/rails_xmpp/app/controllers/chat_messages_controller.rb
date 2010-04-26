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

  def show
    @message = current_user.received_messages.find(params[:id]) rescue nil
    @message.try(:read!) if @message.try(:unreaded?)

    respond_to do |format|
      format.json { render :json => @message.to_json }
    end
  end

  def unreaded_messages_count_by_buddy
    unreaded_messages = current_user.received_messages.count(:conditions => "state = 'unreaded' and sender_id = #{User.find_by_login(params[:buddy].split('@')[0]).to_param}")

    respond_to do |format|
      format.json { render :json => unreaded_messages.to_json }
    end
  end

  def last_messages_by_buddy
    buddy = User.find_by_login(params[:buddy].split('@')[0])
    last_messages = ChatMessage.find(:all, :conditions => ["(sender_id = ? or recipient_id = ?) and (sender_id = ? or recipient_id = ?)", current_user.to_param, current_user.to_param, buddy.to_param, buddy.to_param])
    result = {:chat_messages => last_messages, :buddy => buddy.to_param, :me => current_user.to_param}.to_json

    last_messages.each { |m| m.try(:read!) if (m.try(:unreaded?) and m.try(:recipient_id) == current_user.to_param.to_i) }

    respond_to do |format|
      format.json { render :json => result }
    end
  end

end
