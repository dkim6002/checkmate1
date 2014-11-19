class WelcomeController < ApplicationController
	before_filter :authenticate_user!

  def index
  	if current_user.house_id != nil
  		redirect_to house_path(current_user['house_id'])
  	else
  		redirect_to houses_path
  	end
	end

end