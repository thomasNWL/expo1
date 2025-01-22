import { Image, Button, StyleSheet, Pressable, ScrollView, Platform, StatusBar } from 'react-native';
// import "../../../global.css"
// import EditScreenInfo from '@/components/tests/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link, Redirect, useNavigation, useRouter } from 'expo-router';
import useStore from '@/store/index'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
// import SearchList from '@/components/SearchList';
// import Categories from '@/components/Categories';
// import Recipes from '@/components/Recipes';

export default function TabOneScreen() {
  const navigation = useNavigation();
  console.log('nav!', navigation);
  const router = useRouter();
  console.log('router!', router);
  const store = useStore();
  console.log('store!', store);

  const bears = useStore((state: any) => state.bears)
  const increasePopulation = useStore((state: any) => state.increasePopulation)
  const removeAllBears = useStore((state: any) => state.removeAllBears)
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal:16 }}>
      {/* search */}
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} hidden={false} ></StatusBar>
      {/* <SearchList placeholder={'Enter your fav recipe'}></SearchList> */}
      {/* select */}
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold',marginTop: 15}}>Categories</Text>
        {/* <Categories></Categories> */}
      </View>
      {/* food */}
      <View style={{flex:1,marginBottom:Platform.OS === 'ios' ? 10 : 30}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold',marginTop: 10}}>Recipes</Text>
        {/* <Recipes></Recipes> */}
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '80%',
  },
  img: {
    width: 100,
    height: 100
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});
