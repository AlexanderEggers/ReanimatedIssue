import React, {useCallback} from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function App() {
  const scale = useSharedValue(1);
  const [finished, setFinished] = React.useState(false);

  const finishTransition = useCallback(
    (resolve: (value: void | PromiseLike<void>) => void) => {
      resolve();
    },
    [],
  );

  const handlePress = () => {
    new Promise(resolve => {
      scale.value = withSpring(2, {}, () => {
        runOnJS(finishTransition)(resolve);
      });
    }).then(() => {
      // do nothing
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button onPress={handlePress} title="Click me" disabled={finished} />
      {finished && <Text>Finished! 🎉</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 64,
    alignSelf: 'center',
  },
});
