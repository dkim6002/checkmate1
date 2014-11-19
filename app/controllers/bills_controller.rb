class BillsController < ApplicationController
  before_action :set_bill, only: [:show, :edit, :update, :destroy]

  def index
    @bills = Bill.all
    
  end

  def show
    
  end

  def new
    @bill = Bill.new
    
  end

  def edit
  end

  def create
    @bill = Bill.new(bill_params)
    @bill.save
    
  end

  def update
    @bill.update(bill_params)
    respond_with(@bill)
  end

  def destroy
    @bill.destroy
    respond_with(@bill)
  end

  private
    def set_bill
      @bill = Bill.find(params[:id])
    end

    def bill_params
      params.require(:bill).permit(:title, :amount, :is_paid, :due_date, :provider, :houses_id)
    end
end
