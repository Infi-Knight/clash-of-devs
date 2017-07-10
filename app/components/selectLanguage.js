var React = require('react');
var PropTypes = require('prop-types');

// We need to pass the state of Popular component
// into our component which can be done by passing props
class SelectLanguage extends React.Component {
  render() {
    var languages = ['All', 'Javascript', 'Python', 'Ruby', 'Java'];
    return (
      <ul className="languages">
        {languages.map(function (lang) {
          return (
              <li
                style={lang === this.props.selectedLanguage ? {color: "#d0021b"} : null}
                onClick={this.props.onSelect.bind(null, lang)}
                key={lang}>
                  {lang}
              </li>
            )
        }, this)}
      </ul>
    )
  }
}


// // If our react component has only render method and
// // and some props we can use a function instead of a class
// function SelectLanguage (props) {
//   var languages = ['All', 'Javascript', 'Python', 'Ruby', 'Java'];
//   return (
//       <ul className="languages">
//         {languages.map(function (lang) {
//           return (
//               <li
//                 style={lang === props.selectedLanguage ? {color: "#d0021b"} : null}
//                 onClick={props.onSelect.bind(null, lang)}
//                 key={lang}>
//                   {lang}
//               </li>
//             )
//         })}
//       </ul>
//     )
// }

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

module.exports = SelectLanguage;

