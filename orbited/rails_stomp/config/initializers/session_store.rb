# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_orbited_client_session',
  :secret      => 'b82b9699c97426efa04de91f43f7f4272452b003f551bf2dfd7b802300ecbfe9d5a74567645bca7ea3cd37c903fd8bf66ab804fb868d846aba7810d85b089efc'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
