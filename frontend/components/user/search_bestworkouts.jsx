import React from 'react';
import { withRouter } from 'react-router';
import values from 'lodash/values';

class SearchBestWorkouts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: '',
      name: '',
      active: 'FIRST',
      result: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.requestAllExercises();
  }


  handleChange(e) {
    e.preventDefault(e)
    this.setState({ inputVal: e.target.value })
  }

  handleClick(e) {
    this.setState({ inputVal: e.currentTarget.attributes.value.value})
  }

  handleSubmit(e) {
    let newActive = this.state.active === 'FIRST' ? 'SECOND' : 'FIRST'
    let allExercises = values(this.props.exercises);
    debugger
    let selected;
    let name;
    allExercises.forEach(exercise => {
      if (exercise.exercise_name === this.state.inputVal) {
        selected = exercise,
        name = exercise.exercise_name
      }
    })
    e.preventDefault();
    if (!name) {
      this.setState({inputVal: 'Invalid Input, Please try Again'})
      return 'Invalid Input'
    }
    debugger
    this.setState({inputVal: '', active: newActive, name: name, result: completedExercises[name]})
    this.props.requestAllExercises();
  }

  render () {

    let allWorkouts = this.props.allWorkouts;
    let exercises = this.props.exercises;

    let setResults = allWorkouts.map(workout => {
      return values(workout.setresults)
    })

    let mergedSets = [].concat.apply([], setResults)
    
    const completedExercises = {};

    for (var i = 0; i < mergedSets.length; i++) {
      let set = mergedSets[i];
      let exercise = exercises[set.exercise_id]
      let name = exercise.exercise_name

      if (exercise.ex_type === 'lift') {
        if (completedExercises[name] < (set.weight_lifted)) {
          completedExercises[name] = set.weight_lifted
        } else if (!completedExercises[name]) {
          completedExercises[name] = set.weight_lifted
        }
      }
    }

    const best = Object.keys(completedExercises).map((exercise) => {
      if (this.state.inputVal === '') return [];
      let bests = [];
      if (this.state.inputVal.length > 0) {
        for (var j = 0; j < this.state.inputVal.length; j++) {
          bests = [];
          if (exercise.slice(0, j + 1).toUpperCase() === this.state.inputVal.slice(0, j + 1).toUpperCase()) {
            bests.push(<li onClick={this.handleClick}
                             value={exercise}
                             className="best-lift-li"
                             key={exercise.id}>{exercise}</li>);
          }
        }
      } else {
        bests.push(<li onClick={this.handleClick}
                         value={exercise}
                         className="best-lift-li"
                         key={exercise.id}>{exercise}</li>)
      }
      return bests;
    });

    return (
     <div>
       {this.state.active === 'FIRST' ? (
         <div className="best-lift-div">
           <h3 className="best-lift-title">Your Best:</h3>
           <div className='best-lift-input-div'>
             <input type="text" value={this.state.inputVal}
               onChange={this.handleChange}
               className="best-lift"
               placeholder="Enter an Exercise"
               />
           </div>
           <button onClick={this.handleSubmit}>Your Best</button>
           <ul >
             {best}
           </ul>
         </div>
       ) : this.state.active === 'SECOND' ? (
         <div>
           <p>{this.state.result}</p>
           <button onClick={this.handleSubmit}>Back</button>
         </div>
       ) : null}
     </div>
    )
  }
}


export default withRouter(SearchBestWorkouts)
