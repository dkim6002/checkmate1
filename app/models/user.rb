class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :comments, through: :thread
  has_many :chores, through: :house
  has_many :bills, through: :house
  has_one :house
  has_one :thread
  
end
