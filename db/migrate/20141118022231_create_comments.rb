class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :title
      t.text :description
      t.references :users, index: true

      t.timestamps
    end
  end
end
