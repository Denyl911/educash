import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Link } from 'expo-router';
import Nav from '../components/Nav';
import { sC } from '../hooks/round';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Movimiento from '../components/Movimiento';
import Foot from '../components/Foot';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function Home() {
  const [selectedType, setSelectedType] = useState();
  const [selectedApart, setSelectedApart] = useState();
  const [amount, setAmount] = useState('');
  const [modal, setModal] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalDia, setTotalDia] = useState(0);

  const [apartadosList, setApartadosList] = useState([]);
  const [ahorrosList, setAhorrosList] = useState([]);
  const mounted = async () => {
    const apart = JSON.parse(await AsyncStorage.getItem('apartados')) || [];
    
    setApartadosList(apart);
    
    if (apart.length == 0) {
      setWelcomeModal(true)
    }

    const ahorros = JSON.parse(await AsyncStorage.getItem('ahorros')) || [];
    
    setTotal(0)
    ahorros.forEach((el) => {
      if (el.type == 'Ingreso') {
        setTotal(total + el.amount);
      } else {
        setTotal(total - el.amount);
      }
    });
    setAhorrosList(ahorros);

    apartadosList.forEach((el) => {
      if (el.limitDate && el.amount) {
        const momentFechaInicial = moment();
        const momentFechaFinal = moment(el.limitDate);
  
        const diferenciaDias = momentFechaFinal.diff(momentFechaInicial, 'days');
        setTotalDia(totalDia + ((el.amount - el.actual) / diferenciaDias))
      }
    });
  };
  useEffect(() => {
    mounted();
  }, []);

  const crearAhorro = async () => {
    const ahorro = {
      amount: Number(amount),
      apartado: selectedApart,
      type: selectedType,
      date: Date.now(),
    };
    const ahorros = JSON.parse(await AsyncStorage.getItem('ahorros')) || [];
    ahorros.unshift(ahorro);
    await AsyncStorage.setItem('ahorros', JSON.stringify(ahorros));
    setAhorrosList(ahorros)
    setModal(false);
    

    let allApartados = [...apartadosList];

    const apt = allApartados.find((el) => el.name == ahorro.apartado);
    apt.actual += Number(amount);
    await AsyncStorage.setItem('apartados', JSON.stringify(allApartados));
    setApartadosList(allApartados)
    setTotal(total + amount)
    ToastAndroid.showWithGravity(
      'Ahorro registrado exitosamente',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={{ height: '100%' }}>
      <Nav name={'RESUMEN'} />
      <View className="mt-0 pt-10 pb-0 bg-gray-200 rounded-b-[50px]">
        <Text className="text-rose-400 text-2xl mt-0 mb-5 text-center">
          AHORROS TOTALES
        </Text>
        <Text className=" text-rose-400 text-3xl font-bold mb-0 text-center">
          ${sC(total)}
        </Text>
        <Image
          style={styles.img}
          source={require('../assets/images/cochi.png')}
        ></Image>
      </View>

      <View className="py-4 px-4 mt-6 mx-3 bg-gray-200 rounded-[15px] ">
        <Text className="text-orange-600 text-center text-md ">
          Hoy deberias ingresar: <Text className="font-bold">${sC(totalDia)} </Text>
          para continuar con tus planes de ahorro
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between text-white bg-rose-300 px-4 py-3 mt-6">
        <Pressable onPress={()=> AsyncStorage.clear()}>
          <Ionicons name="swap-horizontal" size={30} color="white" />
        </Pressable>
        <Pressable
         
          onPress={() => {
            setModal(true);
          }}
        >
          <FontAwesome6 name="plus" size={30} color="white" />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={30}
            color="white"
          />
        </Pressable>
      </View>

      <View className="h-[38%]">
        <Text className="mx-3 text-rose-400 font-bold text-lg mt-4">
          MOVIMIENTOS
        </Text>
        <ScrollView>

          {ahorrosList.map((el) => {
            return (
              <Movimiento
                title={el.apartado}
                amount={el.amount}
                date={el.date}
                type={el.type}
              />
            );
          })}
        </ScrollView>
      </View>

      <ShowModal />
      <WelcomeModal />
      <View style={{ position: 'absolute', bottom: 0 }}>
        <Foot />
      </View>
    </View>
  );

  function ShowModal() {
    if (modal) {
      return (
        <View className="flex items-center justify-center backdrop-blur-sm w-screen h-[100%] absolute top-0 bg-black bg-opacity-20 z-50">
          <View className="bg-white p-5 rounded-lg opacity-100 w-5/6">
            <View className="flex items-end">
              <Pressable
                onPress={() => {
                  setModal(false);
                  console.log('a');
                }}
              >
                <AntDesign name="close" size={20} color="black" />
              </Pressable>
            </View>
            <Text className="text-rose-400 text-xl text-center mb-6 font-bold">
              AHORRAR
            </Text>
            <View className="border-2 mx-4 border-rose-400 rounded-md bg-white mt-5">
              <Picker
                selectedValue={selectedApart}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedApart(itemValue)
                }
              >
                <Picker.Item label="Selecciona apartado" value="" />
                {apartadosList.map((el, i) => {
                  return (
                    <Picker.Item label={el.name} value={el.name} key={i} />
                  );
                })}
              </Picker>
            </View>
            <View className="border-2 mx-4 border-rose-400 rounded-md bg-white mt-5">
              <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedType(itemValue)
                }
              >
                <Picker.Item label="Tipo de movimiento" value="" />
                <Picker.Item label="Ingreso" value="Ingreso" />
                <Picker.Item label="Retiro" value="Retiro" />
              </Picker>
            </View>
            <TextInput
              className="border-2 mx-4 px-5 border-rose-400 py-3 rounded-md bg-white mt-5"
              placeholder="Cantidad"
              onChangeText={(newText) => setAmount(newText)}
              defaultValue={amount}
              keyboardType="numeric"
            />
            <Pressable
              className="bg-rose-400 rounded-md inline-block mt-6 px-3 py-2 w-40 text-center mx-auto mb-4"
              onPress={crearAhorro}
            >
              <Text className="text-white text-md inline text-center">
                Registar ahorro
              </Text>
            </Pressable>
          </View>
        </View>
      );
    }
  }

  function WelcomeModal() {
    if (welcomeModal) {
      return (
        <View className="flex items-center justify-center backdrop-blur-sm w-screen h-[100%] absolute top-0 bg-black bg-opacity-20 z-50">
          <View className="bg-white p-5 rounded-lg opacity-100 w-5/6">
            <View className="flex items-end">
              <Pressable
                onPress={() => {
                  setWelcomeModal(false);
                }}
              >
                <AntDesign name="close" size={20} color="black" />
              </Pressable>
            </View>
            <Text className="text-rose-400 text-3xl py-2 text-center mb-6 font-bold">
            MI PRIMER AHORRO
            </Text>
            <Text className="text-lg text-center mb-6 font-bold">
            Vamos a crear tu primer aparatado de ahorro
            </Text>
            <Link href="/crearApartado"
              className="bg-rose-400 rounded-md mt-6 px-3 py-3 w-48 text-center mx-auto mb-4"
            >
              <Text className="text-white text-xl text-center">
                Crear apartado
              </Text>
            </Link>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  rose: { color: '#fda4af' },
});
