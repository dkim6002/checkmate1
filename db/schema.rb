# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141118022818) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bills", force: true do |t|
    t.string   "title"
    t.float    "amount"
    t.boolean  "is_paid"
    t.date     "due_date"
    t.string   "provider"
    t.integer  "houses_id"
    t.integer  "users_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bills", ["houses_id"], name: "index_bills_on_houses_id", using: :btree
  add_index "bills", ["users_id"], name: "index_bills_on_users_id", using: :btree

  create_table "chores", force: true do |t|
    t.string   "title"
    t.boolean  "is_done"
    t.integer  "houses_id"
    t.integer  "users_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "chores", ["houses_id"], name: "index_chores_on_houses_id", using: :btree
  add_index "chores", ["users_id"], name: "index_chores_on_users_id", using: :btree

  create_table "comments", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "users_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["users_id"], name: "index_comments_on_users_id", using: :btree

  create_table "houses", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "city"
    t.integer  "zip"
    t.string   "state"
    t.string   "description"
    t.text     "culture"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "threads", force: true do |t|
    t.integer "users_id"
    t.integer "comments_id"
  end

  add_index "threads", ["comments_id"], name: "index_threads_on_comments_id", using: :btree
  add_index "threads", ["users_id"], name: "index_threads_on_users_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "first_name",             default: "", null: false
    t.string   "last_name",              default: "", null: false
    t.string   "img_url"
    t.text     "bio"
    t.text     "interests"
    t.integer  "houses_id"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
