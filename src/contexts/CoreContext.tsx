import * as React from 'react';

const { createContext, Component } = React;

type AuthMode = 'REGISTER' | 'LOGIN';

type CoreState = {
  layer: boolean;
  auth: null | AuthMode;
};

type CoreActions = {
  setLayer(value: boolean): void;
  showAuthModal(type: AuthMode): void;
  changeAuthModalMode(type: AuthMode): void;
  closeAuthModal(): void;
};

type CoreValue = {
  state: CoreState;
  actions: CoreActions;
};

const initialState = {
  auth: null,
  layer: false,
};

const CoreContext = createContext<CoreValue>({
  state: initialState,
  actions: {
    setLayer: () => {},
    showAuthModal: () => {},
    changeAuthModalMode: () => {},
    closeAuthModal: () => {},
  },
});

class CoreProvider extends Component<{}, CoreState> {
  state = initialState;

  actions: CoreActions = {
    setLayer: (value: boolean) => {
      this.setState({
        layer: value,
      });
    },
    showAuthModal: type => {
      this.setState({
        layer: true,
        auth: type,
      });
    },
    changeAuthModalMode: type => {
      this.setState({
        auth: type,
      });
    },
    closeAuthModal: () => {
      this.setState({
        auth: null,
        layer: false,
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
