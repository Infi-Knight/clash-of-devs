var React = require('react');
var api = require('./../utils/api');
var Loading = require('./Loading');

var SelectLanguage = require('./selectLanguage');
var RepoGrid = require('./repoGrid');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage);
  }


  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });


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
        
        {!this.state.repos
          ? <Loading /> : <RepoGrid repos={this.state.repos} />
        }     
      </div>   
    )
  }
}

module.exports = Popular;
