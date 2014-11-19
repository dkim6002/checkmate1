class CreateThread < ActiveRecord::Migration
  def change
    create_table :threads do |t|
      t.references :user, index: true
      t.references :comment, index: true
    end
  end
end
