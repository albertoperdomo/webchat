class ChatContactsController < ApplicationController
  
  def create
    @contact_jid = params[:chat_contact][:jid]
  end

end
