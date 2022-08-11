import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function MainScreen({ navigation }: RootTabScreenProps<'MainScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>О приложении</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <Text>Это главный экран!</Text>
      <Button title='К котировкам!' onPress={() => navigation.navigate('TableScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
