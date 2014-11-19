class CreateChores < ActiveRecord::Migration
  def change
    create_table :chores do |t|
      t.string :title
      t.boolean :is_done
      t.references :house, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
