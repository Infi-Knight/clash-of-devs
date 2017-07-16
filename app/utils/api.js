var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

// Function to get a user's profile
function getProfile (username) {
	return axios.get('https://api.github.com/users/' + username + params)
		.then(function (user) {
			return user.data;
		});
}

// Function to get the repos owned by a github user
function getRepos (username) {
	return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

// Function to get the stargazers count for all the repos
function getStarCount (repos) {
	return repos.data.reduce(function (count, repo) {
		return count + repo.stargazers_count;
	}, 0);
}

// Function to calculate a user's battle score using our silly algorithm
function calculateScore (profile, repos) {
	var followers = profile.followers;
	var totalStars = getStarCount(repos);

	return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

// Compose all the above functions to a single unit to get all of a user's data
function getUserData (player) {
	// axios.all() takes an array of promises and if all of them get resolved 
	// further action is taken, finally returning an array of data from those promises
	axios.all([
		getProfile(player),
		getRepos(player)
	]).then(function(data) {
		var profile = data[0];
		var repos = data[1];

		return {
			profile: profile,
			score: calculateScore(profile, repos)
		}
	});
}

// Sort the two players based on ther scores returning the winner
function sortPlayers (players) {
  return players.sort(function (a,b) {
    return b.score - a.score;
  });
}

module.exports = {
	// battle function will be called with multiple players
	// axios.all() will perform multiple async tasks and when all of these tasks
	// are resolved a promise will be returned having required data
	// If these tasks faile handleError will be called to catch the error behaviour
	battle: function (players) {
		return axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError);
	},

  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function(response) {
        return response.data.items;
      });
  }
}