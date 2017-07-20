var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

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
              username={playerOneName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'playerOne')}>
                  Reset
                </button>
            </PlayerPreview>} 

          {!playerTwoName &&
            <PlayerInput 
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(this, 'playerTwo')}>
                  Reset
                </button>
            </PlayerPreview>}    
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