import React, { useCallback } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import store from '../store/data';
import Table from '../components/Table';

let needInitialRefresh = true;

export default function TableScreen({ navigation }: RootTabScreenProps<'TableScreen'>) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    store.fetchData().then(() => setRefreshing(false));
    needInitialRefresh = false;
  }, []);

  if (needInitialRefresh) {
    onRefresh();
    setInterval(() => {
      if (navigation.isFocused()) {
        store.fetchData();
      }
    }, 5000);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Котировки</Text>
      <View style={styles.buttonContainer}>
        <Button title='На главный экран!' onPress={() => navigation.navigate('MainScreen')} />
      </View>
      <ScrollView>
        <Table />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
