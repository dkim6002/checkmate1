class ChoresController < ApplicationController
  before_action :set_chore, only: [:show, :edit, :update, :destroy]

  def index
    @chores = Chore.all
    
  end

  def show
    
  end

  def new
    @chore = Chore.new
    
  end

  def edit
  end

  def create
    @chore = Chore.new(chore_params)
    @users = User.where(house_id: @chore.house_id)
    @chore.user_id = @users.sample.id
    if @chore.save
      respong_with(@chore)
    end
  end

  def update
    @chore.update(chore_params)
    respond_with(@chore)
  end

  def destroy
    @chore.destroy
    respond_with(@chore)
  end

  private
    def set_chore
      @chore = Chore.find(params[:id])
    end

    def chore_params
      params.require(:chore).permit(:title, :is_done, :house_id, :user_id)
    end
end
