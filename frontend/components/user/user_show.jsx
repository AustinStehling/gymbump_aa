import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateWorkoutContainer from '../workout/create_workout_container'

class UserShow extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.requestUser(this.props.match.params.userId),
    this.props.requestAllExercises();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.userId !== nextProps.match.params.userId) {
      this.props.requestUser(nextProps.match.params.userId);
    }
  }


  render() {
    if (!this.props.member) return null;

    const { member } = this.props;
    const allWorkouts = this.props.workouts;

    const workouts = allWorkouts.reverse().map(workout => <li className="li-workout-list" key={workout.id}>
                                            <div className="created-workout">{workout.created_at.slice(5,10)}</div>
                                            <div className="workout-name">{workout.name}</div></li>)

    return (
      <div className='div-main'>
        <div className='div-member-stats'>
          <ul >
            <li className="user-stats">{member.first_name}</li>
            <li className="user-stats">{member.last_name}</li>
          </ul>
        </div>
        <div>
          <div className="new-workout-and-workouts">
          <div className='div-create-workout'>
            <CreateWorkoutContainer
               allExercises={this.props.exercises}
               member={this.props.member.username}/>
          </div>
          <InfiniteScroll>
            <div className='div-workout-list'>
              <ul>
                {workouts}
              </ul>
            </div>
          </InfiniteScroll>
        </div>
       </div>
      </div>
    )
  }
}


export default UserShow;
