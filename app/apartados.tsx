import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import Nav from '../components/Nav';
import { formatearFecha, sC } from '../hooks/round';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Foot from '../components/Foot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';



export default function Index() {
  const [totalDia, setTotalDia] = useState(0);
  const [apartadosList, setApartadosList] = useState([]);
  const mounted = async () => {
    let apart = await AsyncStorage.getItem('apartados');
    apart = JSON.parse(apart) || [];
    setApartadosList(apart)
  };
  useEffect(() => {
    mounted();
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <Nav name={'MIS APARTADOS'} />
      <View className="mt-0 pt-10 pb-0 bg-gray-200 rounded-b-[50px]">
        <Text className="text-rose-400 text-2xl mt-0 mb-5 text-center">
          AHORROS TOTALES
        </Text>
        <Text className=" text-rose-400 text-3xl font-bold mb-0 text-center">
          ${sC(250)}
        </Text>
        <Image
          style={styles.img}
          source={require('../assets/images/cochi.png')}
        ></Image>
      </View>

      <View className="flex flex-row items-center justify-between text-white bg-rose-300 px-4 py-3 mt-6">
        <Pressable className="">
          <Ionicons name="swap-horizontal" size={30} color="white" />
        </Pressable>
        <Pressable
          onPress={() => {
            router.navigate('/crearApartado');
          }}
        >
          <FontAwesome6 name="plus" size={30} color="white" />
        </Pressable>
        <Pressable className="">
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={30}
            color="white"
          />
        </Pressable>
      </View>

      <ScrollView>
        {apartadosList.map((el, i) => {
          return(
            <Pressable className="flex flex-row rounded-lg shadow-md mx-4 p-3 gap-3 mb-3 mt-3 bg-white" key={i}>
          <View className="basis-4/12 flex items-center justify-center">
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../assets/images/apartado.png')}
            ></Image>
          </View>
          <View className="basis-7/12">
            <Text className="font-blod text-lg">{el.name}</Text>
            <Text className="mt-3 text-gray-700">
              Objetivo:
              <Text className="font-semibold text-rose-400"> ${sC(Number(el.amount))}</Text>
            </Text>
            <View className="bg-slate-200 rounded-full w-full h-[5px] mt-2">
              <View
                style={{
                  width: `${(el.actual * 100) / el.amount}%`,
                  height: '5px',
                  backgroundColor: 'red',
                  borderRadius: 110,
                }}
              ></View>
            </View>
            <Text className="text-gray-400 me-4 text-right mt-3">
              {formatearFecha('2022-10-12')}
            </Text>
          </View>
        </Pressable>
          )
        })}
        <Pressable className="flex flex-row rounded-lg shadow mx-4 px-3 py-5 gap-3 mb-5 border-dashed border-2 border-gray-500 bg-white mt-3" onPress={()=> router.navigate('/crearApartado')}>
          <View className="basis-4/12 flex items-center justify-center">
            <Image
              style={{ width: 70, height: 70 }}
              source={require('../assets/images/aparta2.png')}
            ></Image>
          </View>
          <View className="basis-8/12">
            <Text className="font-blod text-lg text-rose-400 mt-2">
              Crear apartado
            </Text>
            <Text className="mt-1 text-gray-700">
              Crea tu proximo guardadito
            </Text>
          </View>
        </Pressable>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0 }}>
        <Foot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  rose: { color: '#fda4af' },
});
