import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Text, View, Pressable, TextInput, ToastAndroid } from 'react-native';
import Nav from '../components/Nav';
import { router } from 'expo-router';
import { formatearFecha, sC } from '../hooks/round';
import Foot from '../components/Foot';

import { useState } from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [alAno, setAlAno] = useState(0);
  const [alMes, setAlMes] = useState(0);
  const [alaSemana, setAlaSemana] = useState(0);
  const [alDia, setAlDia] = useState(0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    calc();
  };
  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
    });
  };

  const crearApp = async () => {
    if (name && amount) {
      let apartados = await AsyncStorage.getItem('apartados');
      apartados = JSON.parse(apartados) || [];
      apartados.unshift({
        name: name,
        amount: Number(amount),
        actual: 0,
        limit: false,
        limitDate: date,
        createdAt: Date.now(),
      });
      await AsyncStorage.setItem('apartados', JSON.stringify(apartados));
      ToastAndroid.showWithGravity(
        'Aparatado creado exitosamente',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      router.push('/apartados');
    } else {
      console.error('Faltan campos por llenar!');
    }
  };

  const calc = () => {
    if (date && amount) {
      const momentFechaInicial = moment();
      const momentFechaFinal = moment(date);

      const diferenciaDias = momentFechaFinal.diff(momentFechaInicial, 'days');
      setAlDia(amount / diferenciaDias);

      const diferenciaSemanas = momentFechaFinal.diff(
        momentFechaInicial,
        'weeks'
      );
      if (diferenciaSemanas > 0) {
        setAlaSemana(amount / diferenciaSemanas);
      }

      const diferenciaMeses = momentFechaFinal.diff(
        momentFechaInicial,
        'months'
      );
      if (diferenciaMeses > 0) {
        setAlMes(amount / diferenciaMeses);
      }

      const diferenciaAnos = momentFechaFinal.diff(momentFechaInicial, 'years');
      if (diferenciaAnos > 0) {
        setAlAno(amount / diferenciaAnos);
      }
    }
  };

  const ShowResume = () => {
    if (alDia > 0) {
      return (
        <View className="mt-3">
          <Text className="text-black">
            Deberias ahorrar{' '}
            <Text className="text-rose-400">${sC(alDia)} </Text>al día
          </Text>
          <Text className="text-black">
            O ahorrar <Text className="text-rose-400">${sC(alaSemana)} </Text>a
            la semana
          </Text>
          <Text className="text-black">
            O ahorrar <Text className="text-rose-400">${sC(alMes)} </Text>al mes
          </Text>
          <Text className="text-black">
            O ahorrar <Text className="text-rose-400">${sC(alAno)} </Text>al año
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <Nav name={'MIS APARTADOS'} />
      <View className="px-3 pt-5">
        <Text className="text-rose-400 text-2xl font-bold">Crear Apartado</Text>
        <Text className="text-md text-gray-700 mb-8 ">
          Crea apartados para facilitar la organizacion de tus ahorros
        </Text>
        <Text className="mb-1">Nombre del apartado</Text>
        <TextInput
          className="bg-white border-2 border-rose-400 rounded-md p-2 placeholder:text-gray-700 text-[1rem]"
          placeholder="Ahorro para videojuegos"
          onChangeText={(newText) => setName(newText)}
          defaultValue={name}
        ></TextInput>
        <Text className="mb-1 mt-3">Meta de ahorro</Text>
        <TextInput
          className="bg-white border-2 border-rose-400 rounded-md p-2 placeholder:text-gray-700 text-[1rem]"
          placeholder="$2,500.00"
          onChangeText={(newText) => {
            setAmount(newText);
            calc();
          }}
          defaultValue={amount}
          keyboardType="numeric"
        ></TextInput>
        <Text className="mt-3 mb-1">Establecer fecha limite</Text>
        <Pressable
          className="bg-white text-gray-700 border-2 border-rose-400 rounded-md p-2 text-[1rem]"
          onPress={showMode}
        >
          <Text>{formatearFecha(date)}</Text>
        </Pressable>
        <ShowResume />
        <Pressable
          className="bg-rose-400 rounded-md mt-7 px-3 py-3 w-40 text-center mx-auto mb-4"
          onPress={crearApp}
        >
          <Text className="text-white text-lg inline text-center">
            Crear Apartado
          </Text>
        </Pressable>
      </View>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <Foot />
      </View>
    </View>
  );
}
