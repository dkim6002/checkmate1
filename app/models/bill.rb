class Bill < ActiveRecord::Base
  belongs_to :house
  has_many :users, through: :house
end
