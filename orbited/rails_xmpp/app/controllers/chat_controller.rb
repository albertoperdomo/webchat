class ChatController < ApplicationController
  
  def show
    current_user.reset_single_access_token!
    @contact = User.find(params[:contact_id])

    @contacts_to_rosterize = current_user.received_messages.unreaded.collect {|msg| msg.sender }.uniq

    respond_to do |format|
      format.js
    end
  end

end
