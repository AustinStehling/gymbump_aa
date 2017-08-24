import { connect } from 'react-redux';
import Leaderboard from './leaderboard';
import { requestAllUsers } from '../../actions/user/user_actions'
import { selectAllMembers } from '../../reducers/selectors'

const mapStateToProps = state => ({
  members: selectAllMembers(state)
});

const mapDispatchToProps = dispatch => ({
  requestAllUsers: () => dispatch(requestAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard)