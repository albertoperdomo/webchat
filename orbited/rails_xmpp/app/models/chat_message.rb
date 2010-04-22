class ChatMessage < ActiveRecord::Base
  validates_presence_of :sender_id, :recipient_id, :content

  include AASM
  aasm_column :state
  aasm_initial_state :unreaded

  aasm_state :unreaded
  aasm_state :readed

  aasm_event :read do
    transitions :to => :readed, :from => :unreaded
  end

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
#  state        :string(255)
#

