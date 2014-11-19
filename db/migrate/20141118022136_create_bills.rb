class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :title
      t.float :amount
      t.boolean :is_paid
      t.date :due_date
      t.string :provider
      t.references :houses, index: true
      t.references :users, index: true

      t.timestamps
    end
  end
end
