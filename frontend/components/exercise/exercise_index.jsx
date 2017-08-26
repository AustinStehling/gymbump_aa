import React from 'react';
import { withRouter } from 'react-router-dom';

class ExerciseIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { inputVal: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ inputVal: e.target.value })
  }

  componentDidMount() {
    this.props.requestAllExercises();
  }

  handleClick(e) {
    this.setState({ inputVal: e.currentTarget.attributes.value.value})
  }

  render() {


    let allExercises = this.props.allExercises;


    const match = allExercises.map((exercise) => {
      if (this.state.inputVal === '') return [];
      let matched = [];
      if (this.state.inputVal.length > 0) {
        for (var j = 0; j < this.state.inputVal.length; j++) {
          matched = [];
          if (exercise.exercise_name.slice(0, j + 1).toUpperCase() === this.state.inputVal.slice(0, j + 1).toUpperCase()) {
            matched.push(<li onClick={this.handleClick}
                             value={exercise.exercise_name}
                             className="workout-auto-li"
                             key={exercise.id}>{exercise.exercise_name}</li>);
          }
        }
      } else {
        matched.push(<li onClick={this.handleClick}
                         value={exercise.exercise_name}
                         className="workout-auto-li"
                         key={exercise.id}>{exercise.exercise_name}</li>)
      }
      return matched;
    });

    let selected
    allExercises.forEach(exercise => {
      if (exercise.exercise_name === this.state.inputVal) {
        selected = exercise.id
      }
    })

    return (
      <div className="exercise-main-div">
        <div className="exercise-second-div">
          <label className="exercise-label">
            <input type="text" value={this.state.inputVal}
              onChange={this.handleChange}
              className="exercise-input"
              autoComplete="on"/>
          </label>
          <ul className="exercise-ul">
            {match}
          </ul>
          <button onClick={() => this.props.requestExercise(selected)}>Test</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ExerciseIndex);
