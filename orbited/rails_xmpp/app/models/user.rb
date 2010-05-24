class User < ActiveRecord::Base

  acts_as_authentic

  has_many :received_messages, :class_name => "ChatMessage", :foreign_key => :recipient_id
  has_many :sent_messages, :class_name => "ChatMessage", :foreign_key => :sender_id
  has_many :chat_messages, :finder_sql => 'SELECT * FROM chat_messages WHERE (chat_messages.sender_id = #{id} or chat_messages.recipient_id = #{id}) ORDER BY created_at'

  has_many :blocked_contacts_pairs, :class_name => "BlockedContact"
  has_many :blocked_contacts, :through => :blocked_contacts_pairs


  def blocked?(contact)
    blocked_contacts.include?(contact)
  end

  def has_unreaded_messages_from?(contact)
    received_messages.unreaded.collect { |msg| msg.sender }.include? contact
  end

  def last_activity_in_words
    return "On the site now!" if logged_in?
    return "UNKNOWN" unless last_request_at

    time_ago = Time.now - last_request_at
    time_ago_in_words = case time_ago
      when 10*60...60*60 then "#{time_ago.div(60)} minutes ago"
      when 60*60...24*60*60 then "#{time_ago.div(60*60)} hours ago"
      when 24*60*60...48*60*60 then "yesterday"
      when 48*60*60...30*24*60*60 then I18n.l last_request_at.to_date, :format => :long
      else "more than 1 month"
    end
    "Was online #{time_ago_in_words}"
  end

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

