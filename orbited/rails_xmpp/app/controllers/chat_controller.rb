class ChatController < ApplicationController
  
  def show
    current_user.reset_single_access_token!
    @contact = User.find(params[:contact_id])

    respond_to do |format|
      format.js
    end
  end

end
