# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_rails_xmpp_session',
  :secret      => '7e6f298612fe351014fe142e82249e16776f55c08e69b71d466f7514cdd003f5b07319d22a13ed059d1bba39832bdd3b0fd5363cd0d11efcc3d156a8402aa33c'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
