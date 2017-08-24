class Api::WorkoutsController < ApplicationController

  def show
    @workout = Workout.find(params[:id])
    render :show
  end

  def create
    @workout = Workout.new(workout_params)

    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end

  end

  def destroy
    @workout = Workout.find(params[:id])
    @workout.destory

    render :show
  end

  def update
    @workout = Workout.find(params[:id])

    if @workout.update(workout_params)
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end

  end

  def index
     @workouts = Workout.all
     render :index
  end

  private

  def params
    params.require(:workout).permit(:name, :user)
  end

end
