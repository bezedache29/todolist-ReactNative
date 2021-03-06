import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppRouter from './src/router/AppRouter';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import { StoreProvider } from 'easy-peasy'
import GlobalStore from './src/store/store.js'

export default function App() {

  const [font] = useFonts({
    KdamThmorPro: require('./src/assets/fonts/KdamThmorPro-Regular.ttf'),
    Fascinate: require('./src/assets/fonts/Fascinate-Regular.ttf')
  });

  if (!font) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <StoreProvider store={GlobalStore}>
      <View style={styles.container}>
        <AppRouter />
        <StatusBar style="auto" />
      </View>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
