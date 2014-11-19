json.array!(@houses) do |house|
  json.extract! house, :id, :name, :address, :city, :zip, :state, :description, :culture
  json.url house_url(house, format: :json)
end
