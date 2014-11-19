class CreateChores < ActiveRecord::Migration
  def change
    create_table :chores do |t|
      t.string :title
      t.boolean :is_done
      t.references :houses, index: true
      t.references :users, index: true

      t.timestamps
    end
  end
end
