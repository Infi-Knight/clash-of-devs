var React = require('react');
var api = require('./../utils/api');

var SelectLanguage = require('./SelectLanguage');
var RepoGrid = require('./RepoGrid');

class Popular extends React.Component {
  // Initial State for our component
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    // We need to ensure that the this keyword in updateLanguage
    // method always binds to our component instance
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  // componentDidMount is a lifecycle event which gets called by React
  // whenever a componenet gets mounted in the DOM
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
}

  // Method to set the state of our component
  // Note that the this keyword is undefined in this instance
  // We need to bind it to our component using the bind as above 
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    // Make AJAX requests for the initial state
    // as well as the change in state
    api.fetchPopularRepos(lang)
      .then(function(repos) {
        this.setState(function() {
          return {
            repos: repos
          }
        });
    }.bind(this));   
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        
        { // Since this is a http request it may need some time to Load
        // We need to handle this delay otherwise we will get a null value for repos
        }
        {!this.state.repos
          ? <p>Loading</p> : <RepoGrid repos={this.state.repos} />
        }     
      </div>   
    )
  }
}

module.exports = Popular;




  // render() {
  // var languages = ['All', 'Javascript', 'Python', 'Ruby', 'Java'];
  //   // console.log(this);
  //   // Here this keyword refers to the Popular component instance
  //   return (
  //       <ul className='languages'>
  //         {languages.map(function(lang) {
  //           // Inside this anyomo function this keyword is undefined unless it
  //           // is bind to our state using a second argument to function
  //           // Also during onClick event the null to bind specifies that
  //           // we have already binded it to our component instance 
  //           // lang simply refers to the function argument 
  //           return(
  //             <li
  //               style={lang === this.state.selectedLanguage ? {color: "#d0021b"} : null} 
  //               onClick={this.updateLanguage.bind(null, lang)}
  //               key={lang}>
  //               {lang}
  //             </li>
  //           )
  //         }, this)}
  //       </ul>      
  //   )
  // }


  // render() {
  //   var languages = ['All', 'Javascript', 'Python', 'Ruby', 'Java'];
  //   return (
  //     <div>
  //       <p>Selected Language: {this.state.selectedLanguage}</p>
  //       <ul className='languages'>
  //       // We can use ES6 syntax for arrow functions 
  //       // So we do not need to pass this keyword as an argument for correct binding
  //       // And inside the arrow functions this keyword means same as that outside 
  //         {languages.map((lang) => {
  //           return(
  //             <li
  //               style={lang === this.state.selectedLanguage ? {color: "#d0021b"} : null} 
  //               onClick={this.updateLanguage.bind(null, lang)}
  //               key={lang}>
  //               {lang}
  //             </li>
  //           )
  //         })}
  //       </ul>      
  //     </div>
  //   )
  // }