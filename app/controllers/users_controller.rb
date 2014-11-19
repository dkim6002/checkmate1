class UsersController < ApplicationController
	before_action :set_user, only: [:show, :update]

	def show
		@user = User.find(current_user)
		@bills = Bill.where(house_id: @user.house_id)
		@users = User.where(house_id: @user.house_id)
		@indiv_bill = User.calc_bill(@bills, @users)
		for bill in @bills
			bill.split_bill = bill.amount / @users.count
			bill.save
		end

	end

	private
    def set_user
      @user = User.find(params[:id])
    end

end