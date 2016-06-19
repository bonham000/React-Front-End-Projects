'use strict';

var Root = React.createClass({
  displayName: 'Root',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Welcome to React'
      )
    );
  }
});

ReactDOM.render(React.createElement(Root, null), document.getElementById('main'));
