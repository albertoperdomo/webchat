class ChatMessage < ActiveRecord::Base
end



# == Schema Information
#
# Table name: chat_messages
#
#  id           :integer         not null, primary key
#  sender_id    :integer
#  recipient_id :integer
#  content      :string(255)
#  created_at   :datetime
#  updated_at   :datetime
#

