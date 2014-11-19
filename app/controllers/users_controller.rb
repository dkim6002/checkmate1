class UsersController < ApplicationController
	before_action :set_user, only: [:show, :update]
	before_action :authenticate_user!

	def show
		@user = User.find(current_user)
		@bills = Bill.where(house_id: @user.house_id)
	end

	private
    def set_user
      @user = User.find(params[:id])
    end

end