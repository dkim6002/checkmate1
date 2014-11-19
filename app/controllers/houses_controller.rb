class HousesController < ApplicationController
  before_action :set_house, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @houses = House.all
    
  end

  def show
    @bills = Bill.where(houses_id: @house.id)
    @chores = Chore.where(houses_id: @house.id)
    @house = House.find(params[:id])
    @user = User.find(current_user)
    @user.houses_id = @house.id
    @user.save
  end

  def new
    @house = House.new
    
  end

  def edit
  end

  def create
    @house = House.new(house_params)
    @user = User.find(current_user)
    @user.houses_id = @house.id
    @user.save
    if @house.save
      respond_to do |format|
        format.html {redirect_to @house}
        format.json {render json: @house}
      end
    end
  end

  def update
    @house.update(house_params)
  end

  def destroy
    @house.destroy
    if @house.destroy
      respond_to do |format|
      format.html {redirect_to houses_path}
      format.json {render json: @house}
      end
    end
  end

  private
    def set_house
      @house = House.find(params[:id])
    end

    def house_params
      params.require(:house).permit(:name, :address, :city, :zip, :state, :description, :culture)
    end
end
