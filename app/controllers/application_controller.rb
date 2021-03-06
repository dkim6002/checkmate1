class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :password, :first_name, :last_name, :img_url, :bio, :interests, :house_id) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :password, :first_name, :last_name, :img_url, :bio, :interests, :house_id) }
  end

  def after_sign_in_path_for(resource)
    if (current_user['house_id'] == nil)
      return request.env['omniauth.origin'] || stored_location_for(resource) || houses_path
      else
        return request.env['omniauth.origin'] || house_path(current_user['house_id'])
    end
  end

end
