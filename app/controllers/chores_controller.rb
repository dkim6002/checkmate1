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
    @chore.save
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
      params.require(:chore).permit(:title, :is_done, :houses_id)
    end
end
