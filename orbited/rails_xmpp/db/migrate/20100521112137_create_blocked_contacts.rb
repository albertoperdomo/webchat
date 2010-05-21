class CreateBlockedContacts < ActiveRecord::Migration
  def self.up
    create_table :blocked_contacts do |t|
      t.integer :user_id
      t.integer :blocked_contact_id

      t.timestamps
    end
  end

  def self.down
    drop_table :blocked_contacts
  end
end
