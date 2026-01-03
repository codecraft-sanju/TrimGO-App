import React, { useRef, useState, useEffect } from 'react';
import { 
  StyleSheet, 
  StatusBar, 
  BackHandler, 
  Platform, 
  ActivityIndicator, 
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const WEBSITE_URL = 'https://www.trimgo.co.in';
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Hardware Back Button Handling
  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false; 
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [canGoBack]);

  // Loading Screen (Black Theme)
  const LoadingIndicatorView = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#ffffff" size="large" />
        <Text style={{marginTop: 10, color: '#ffffff'}}>Loading TrimGo...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar Black */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <WebView
        ref={webViewRef}
        source={{ uri: WEBSITE_URL }}
        style={{ flex: 1, backgroundColor: '#000000' }}
        forceDarkOn={true} 
        javaScriptEnabled={true}
        domStorageEnabled={true}
        pullToRefreshEnabled={true} 
        startInLoadingState={true}
        renderLoading={LoadingIndicatorView}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    zIndex: 999,
  }
});