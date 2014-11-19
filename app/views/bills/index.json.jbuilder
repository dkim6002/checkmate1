json.array!(@bills) do |bill|
  json.extract! bill, :id, :title, :amount, :is_paid, :due_date, :provider, :houses_id, :users_id
  json.url bill_url(bill, format: :json)
end
