class CreateHouses < ActiveRecord::Migration
  def change
    create_table :houses do |t|
      t.string :name
      t.string :address
      t.string :city
      t.integer :zip
      t.string :state
      t.string :description
      t.text :culture

      t.timestamps
    end
  end
end
