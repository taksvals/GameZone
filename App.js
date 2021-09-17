import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';

import store from './store';

import * as Font from 'expo-font';

import Navigator from './routes/drawer';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded){
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  } else {
	return (
		<AppLoading 
			startAsync={getFonts}
			onFinish={() => setFontsLoaded(true)}
			onError={() => console.log('Something went wrong.')}
    />
	);
  }
}

