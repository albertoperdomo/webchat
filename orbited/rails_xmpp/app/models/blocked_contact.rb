class BlockedContact < ActiveRecord::Base
  belongs_to :blocked_contact, :class_name => "User"
  belongs_to :user
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

