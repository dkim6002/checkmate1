class WelcomeController < ApplicationController
	before_filter :authenticate_user!

  def index
  	if current_user.houses_id != nil
  		redirect_to house_path(current_user['houses_id'])
  	else
  		redirect_to houses_path
  	end
	end

end