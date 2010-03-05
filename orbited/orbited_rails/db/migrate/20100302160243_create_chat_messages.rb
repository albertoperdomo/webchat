class CreateChatMessages < ActiveRecord::Migration
  def self.up
    create_table :chat_messages do |t|
      t.integer :sender_id
      t.integer :recipient_id
      t.string :content

      t.timestamps
    end
  end

  def self.down
    drop_table :chat_messages
  end
end
