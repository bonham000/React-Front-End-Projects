
class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Sean"
    };
  }
  render() {
    return (
      <div>
        <h1>Welcome to React in ES6 World</h1>
      </div>
      );
  }
};

ReactDOM.render(<Root />, document.getElementById('main'));