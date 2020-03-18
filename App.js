import React, {Component} from 'react';
import Main from './Components/MainComponent';
import {Provider} from "react-redux";
import {ConfigureStore} from "./redux/configureStore";
import {PersistGate} from "redux-persist/es/integration/react";
import {Loading} from "./Components/LoadingComponent";

const {persistStor,store} =ConfigureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistStor} loading={<Loading/>} >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;