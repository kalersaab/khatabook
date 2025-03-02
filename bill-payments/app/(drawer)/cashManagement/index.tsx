import FloatingActionButton from '@/components/float';
import { useGetCash } from '@/hooks/query';
import React from 'react';
import { View, Image, Text, Dimensions, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment'
import { useDeleteCash } from '@/hooks/mutation';

const { width } = Dimensions.get('window');

const Cash = () => {
  const [type, setType] = React.useState('debit');
  const cashapi:any = useGetCash();

    const cash = cashapi?.data?.data?.data?.map((item:any)=>item) ?? []
const deleteCash = useDeleteCash();
const handleDelete = (id:any) => {
  console.log('id', id)
  deleteCash.mutate(id, {
    onSuccess: () => {
      ToastAndroid.show('Deleted successfully', ToastAndroid.SHORT);
    },
  });
}
  const renderLeftActions = () => {
    return (
      <TouchableOpacity 
        style={styles.leftAction} 
        onPress={() => console.log('Edit pressed')}
      >
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
    );
  };

  const renderRightActions = (id: any) => {
    return (
      <TouchableOpacity 
        style={styles.rightAction} 
        onPress={() => handleDelete(id)}
      >
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    );
  };
  const Separator = () => <View style={styles.itemSeparator} />
  const renderItem = ({ item }:any) => (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={()=>renderRightActions(item?._id)}
      leftThreshold={width * 0.15}
      rightThreshold={width * 0.15}
      overshootLeft={false}
      overshootRight={false}
    >
      <View style={[styles.card,{backgroundColor: item.type === 'debit' ? 'rgb(170, 0, 0)' : 'rgb(0, 68, 0)'}]} key={item?._id}>
        <Text style={styles.headerText}>  {moment(item.createdAt).format('DD MMM YYYY hh:mm A')}</Text>
        <View style={styles.content}>
          <Text style={styles.text}>Amount: {item.amount}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Type: {item.type}</Text>
            <Text style={styles.text}>Description: {item.notes}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
  const EmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
      <Image source={require('@/assets/images/no_data.png')} style={styles.emptyImage}/>
      <Text style={styles.emptyText}>No transactions  Found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList 
        data={cash}
        keyExtractor={item =>item._id}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={()=><Separator />}
      />
      <FloatingActionButton onLongPress={()=>ToastAndroid.show('Add Button', ToastAndroid.SHORT)}/>
        <View style={{flexDirection:'row', width:width, padding:10, margin:10}}>
          <TouchableOpacity style={styles.btn} onPress={() => setType('debit')}>
            <Text style={{color: type === 'debit' ? 'white' : 'rgb(221, 221, 221)', textAlign:'center', fontSize:20}}>Debit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn,{backgroundColor:'green'}]} onPress={() => setType('credit')}>
            <Text style={{color: type === 'credit' ? 'white' : 'rgb(221, 221, 221)', textAlign:'center', fontSize:20}}>Credit</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Cash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(75,75,75)',
    alignItems: 'center',
  },
  btn:{backgroundColor:'red', width:width/3, padding:20,margin:5, justifyContent:'center', borderRadius:10},
  card: {
    borderRadius: 10,
    width: width * 0.95,
    padding: 5,
    margin: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  content: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  leftAction: {
    backgroundColor: 'rgb(38, 104, 33)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: width * 0.20
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    margin:5,
    width: width * 0.20
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  itemSeparator: {
    flex: 1,
    backgroundColor: 'red',
  },
  emptyContainer: {
    flex:1,
    justifyContent:'center',
    marginTop:width /2
  },
  emptyText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  emptyImage: {
    width: width* 0.9, 
    height: 350,
    resizeMode: 'contain',
  },
});
