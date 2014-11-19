class CreateThread < ActiveRecord::Migration
  def change
    create_table :threads do |t|
      t.references :users, index: true
      t.references :comments, index: true
    end
  end
end
