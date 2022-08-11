import { observer } from 'mobx-react';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import storage from '../store/data';

export default observer(() => {
  return (
    <View style={{ flexDirection: 'column', width: '100%' }}>
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>name</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>last</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>highestBid</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>percentChange</Text>
        </View>
      </View>
      {storage.isError ? (
        <View style={{ alignItems: 'center', backgroundColor: 'red' }}>
          <Text>Ошибка!</Text>
        </View>
      ) : (
        <>
          {storage.isPending && storage.data.length == 0 ? (
            <ActivityIndicator size='large' />
          ) : (
            storage.data.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCell}>
                  <Text>{item.name}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{item.last}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{item.highestBid}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{item.percentChange}</Text>
                </View>
              </View>
            ))
          )}
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    marginVertical: 1,
    marginHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    backgroundColor: '#eee',
  }
});