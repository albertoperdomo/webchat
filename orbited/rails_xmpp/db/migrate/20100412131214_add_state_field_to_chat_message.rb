class AddStateFieldToChatMessage < ActiveRecord::Migration
  def self.up
    add_column :chat_messages, :state, :string
    ChatMessage.find_each do |msg|
      msg.aasm_write_state(:readed)
    end
  end

  def self.down
    remove_column :chat_messages, :state
  end
end
