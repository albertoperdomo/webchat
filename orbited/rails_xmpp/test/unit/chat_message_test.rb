require 'test_helper'

class ChatMessageTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
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

