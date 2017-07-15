var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
          Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var value = event.target.value;

    this.setState(function () {
      return {
        username: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={this.state.username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    // initial state
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null      
    };
    // bind the function which changes the state to our component
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {
      var newState = {};
      // shorthand 
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
      var newState = {};
      // shorthand 
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }

  render() {
    // match is a prop provided by react router which tells us: on which route we are
    // it contains properties like path and url
    // React router also has props like locatin which contains properties like
    // search, hash, pathname etc (Use Dev Tools)
    // search acts like query string
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;

    return(
      <div>
        <div className='row'>
        {
        // && is just a shorthand for if statement 
        // We don't want the battle component to manage the state
        // Instead the PlayerInput component will manage the state
        // and when the onSubmit is invoked the state will be passed from
        // the child (i.e PlayerInput) to parent (i.e Battle component)
        }
          {!playerOneName &&
            <PlayerInput 
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne'
            />} 

          {!playerTwoName &&
            <PlayerInput 
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImage &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={this.handleReset}
              id='playerTwo'
            />}     
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
              Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle;