json.array!(@chores) do |chore|
  json.extract! chore, :id, :title, :is_done, :houses_id, :users_id
  json.url chore_url(chore, format: :json)
end
