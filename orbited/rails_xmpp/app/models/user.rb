class User < ActiveRecord::Base

  acts_as_authentic

  has_many :received_messages, :class_name => "ChatMessage", :foreign_key => :recipient_id
  has_many :sent_messages, :class_name => "ChatMessage", :foreign_key => :sender_id
  has_many :chat_messages, :finder_sql => 'SELECT * FROM chat_messages WHERE (chat_messages.sender_id = #{id} or chat_messages.recipient_id = #{id}) ORDER BY created_at'

end

# == Schema Information
#
# Table name: users
#
#  id                  :integer         not null, primary key
#  login               :string(255)
#  email               :string(255)
#  crypted_password    :string(255)
#  password_salt       :string(255)
#  persistence_token   :string(255)
#  single_access_token :string(255)
#  perishable_token    :string(255)
#  login_count         :integer         default(0), not null
#  failed_login_count  :integer         default(0), not null
#  current_login_at    :datetime
#  last_login_at       :datetime
#  last_request_at     :datetime
#  current_login_ip    :datetime
#  last_login_ip       :datetime
#  created_at          :datetime
#  updated_at          :datetime
#

