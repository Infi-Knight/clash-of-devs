var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
require('./index.css');

// class App extends React.Component {
//   render() {
//     return (
//       <div><h1>Hello World!</h1></div>
//     )
//   }
// }
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

// class Avatar extends React.Component {
//   render() {
//     return (
//       <img src={this.props.img} />
//     )
//   }
// }
//
// class Label extends React.Component {
//   render() {
//     return (
//       <h1>Name: {this.props.name}</h1>
//     )
//   }
// }
//
// class ScreenName extends React.Component {
//   render() {
//     return (
//       <h3>Username: {this.props.username}</h3>
//     )
//   }
// }
//
// class Badge extends React.Component {
//   render() {
//     return (
//       <div>
//         <Avatar img={this.props.user.img}/>
//         <Label name={this.props.user.name}/>
//         <ScreenName username={this.props.user.username}/>
//       </div>
//     )
//   }
// }

// Badge.propTypes = {
//   img: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   username: PropTypes.string.isRequired
// }

// ReactDOM.render(
//   <Badge user={{
//     name: 'Tyler McGinnis',
//     img: 'https://avatars0.githubusercontent.com/u/2933430?v=3&s=460',
//     username: 'tylermcginnis'
//   }} />,
//   document.getElementById('app')
// );





// class FriendsContainer extends React.Component {
//   render() {
//     var name = 'Ravi Soni';
//     var friends = ['Sourav', 'Rahul', 'Rishabh', 'Rihtik', 'Anish', 'Raushan'];
//     return (
//       <div>
//         <h1>Name: {name}</h1>
//         <ShowFriends names={friends}/>
//       </div>
//     )
//   }
// }
//
// class ShowFriends extends React.Component {
//   render() {
//     return (
//       <div>
//         <h3>Friends</h3>
//         <ul>
//           {this.props.names.map(function (friend, index) {
//             return <li key={index}>{friend}</li>
//           })}
//         </ul>
//       </div>
//     )
//   }
// }
//
// ReactDOM.render(
//   <FriendsContainer />,
//   document.getElementById('app')
// );




class Users extends React.Component {
  render() {
    var friends = this.props.list.filter(function(person) {
      return person.friend === true
    });

    var foes = this.props.list.filter(function(person) {
      return person.friend === false
    });

    return (
      <div>
        <h1>Friends</h1>
        <ul>
          {this.props.list.filter(function(person) {
            return person.friend === true
          }).map(function (friend, index) {
            return <li key={index}>{friend.name}</li>
          })}
        </ul>

        <hr />

        <h1> Non Friends </h1>
        <ul>
          {foes.map(function(foe) {
              return <li key={foe.name}>{foe.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

Users.propTypes = {
  // list: PropTypes.array.isRequired
  // list: PropTypes.arrayOf(PropTypes.object)
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    friend: PropTypes.bool.isRequired
  })),
}

ReactDOM.render(
  <Users list={[
    { name: 'Tyler', friend: true },
    { name: 'Ryan', friend: true },
    { name: 'Michael', friend: false },
    { name: 'Mikenzi', friend: false },
    { name: 'Jessica', friend: true },
    { name: 'Dan', friend: false } ]}
  />,
  document.getElementById('app')
);
