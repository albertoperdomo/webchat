class ChatMessage < ActiveRecord::Base
  validates_presence_of :sender_id, :recipient_id, :content
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

