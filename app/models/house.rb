class House < ActiveRecord::Base
	has_many :users
	has_many :chores
	has_many :bills
	has_one :thread
	has_many :comments, through: :thread
end
