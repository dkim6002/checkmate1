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
    

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :img_url, :bio, :interests, :wepay_access_token, :wepay_account_id, :house_id)
    end

end