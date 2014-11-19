class WelcomeController < ApplicationController
	before_filter :authenticate_user!

  def index
  	if current_user != nil
  		redirect_to house_path(current_user['houses_id'])
  	end
	end

end