import * as React from 'react';

const { createContext, Component } = React;

type CoreState = {
  layer: boolean;
};

type CoreActions = {
  setLayer(value: boolean): void;
};

type CoreValue = {
  state: CoreState;
  actions: CoreActions;
};

const CoreContext = createContext<CoreValue>({
  state: {
    layer: false,
  },
  actions: {
    setLayer: value => {},
  },
});

class CoreProvider extends Component<{}, CoreState> {
  state = {
    layer: false,
  };

  actions: CoreActions = {
    setLayer: (value: boolean) => {
      this.setState({
        layer: value,
      });
    },
  };

  render() {
    return (
      <CoreContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
        {this.props.children}
      </CoreContext.Provider>
    );
  }
}

export { CoreProvider };
export default CoreContext;
