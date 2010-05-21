require 'test_helper'

class BlockedContactTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end

# == Schema Information
#
# Table name: blocked_contacts
#
#  id                 :integer         not null, primary key
#  user_id            :integer
#  blocked_contact_id :integer
#  created_at         :datetime
#  updated_at         :datetime
#

