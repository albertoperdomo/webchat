class ChatController < ApplicationController
  
  def show
    current_user.reset_single_access_token!
  end

end
