import React from 'react';
import values from 'lodash/values'
class WorkoutShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const setArray = values(this.props.selectedWorkout.setresults)
    const exercises = this.props.exercises
    const results = setArray.map(result => {
      if (result.workout_id === this.props.selectedWorkout.id) {
        return <li key={result.id} className='workout-show-li'>
                   <p className='workout-title'>{exercises[result.exercise_id].exercise_name}</p>
                   <ul>
                     {result.weight_lifted ? (
                       <li className='workout-result-li'><p>Weight:</p>{result.weight_lifted}{result.weight_unit}</li>
                     ) : null}
                     {result.reps ? (
                       <li className='workout-result-li'><p>Reps:</p>{result.reps}</li>
                     ) : null}
                     {result.distance ? (
                       <li className='workout-result-li'><p>Distance:</p>{result.distance}{result.distance_unit}</li>
                     ) : null}
                     {result.hour || result.min || result.sec ? (
                       <li className='workout-result-li'><p>Duration:</p>
                         <div className='dur-format'>
                           {result.hour ? (
                             <p className='dur-result-hour'>{result.hour}:</p>
                           ) : null}
                           {result.min ? (
                             <p className='dur-result'>{result.min}:</p>
                           ) : null}
                           {result.sec ? (
                             <p className='dur-result'>{result.sec}</p>
                           ) : null}
                         </div>
                       </li>
                     ) : null }
                   </ul>
                  </li>
      }
    })

    return (
      <div className="workout-show-main">
        <h3 className="workout-show-title">{this.props.selectedWorkout.name}</h3>
        <ul className="workout-show-ul">
          {results}
        </ul>
      </div>
    );
  }

}

export default WorkoutShow;
