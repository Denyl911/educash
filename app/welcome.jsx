import { useState } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function Index() {
  const circle1 = require('../assets/images/circleC.png');
  const circle2 = require('../assets/images/circleG.png');
  const [slides, setslides] = useState([
    {
      img: require('../assets/images/cochinito-1.png'),
      title: '¡Bienvenido a "KidCash"',
      text: 'Registra tus ingresos y gastos diarios de forma divertida y aprende a administrar tu dinero como un experto.',
    },
    {
      img: require('../assets/images/bills.png'),
      title: '¡Te ayudaremos a alcanzar tus objetivos!',
      text: 'Establece metas de ahorro para tus sueños y asigna categorías a tus gastos.',
    },
    {
      img: require('../assets/images/coins.png'),
      title: 'Gana recompensas virtuales por tus logros financieros',
      text: '¡Colecciona medallas y puntos mientras te diviertes!',
    },
  ]);
  const [actual, setActual] = useState(0);
  const [btnText, setBtnText] = useState('Siguiente');

  const nextSlide = (n) => {
    if (Number.isInteger(n)) {
      setActual(n);
    } else {
      if (actual < 2) {
        setActual(actual + 1);
      } else {
        router.navigate('/register');
      }
    }
    if (actual == 2) {
      setBtnText('Comenzar');
    } else {
      setBtnText('Siguiente');
    }
  };
  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <View>
        <Image
          className="w-96 h-96 mt-20 mx-auto"
          source={slides[actual].img}
        ></Image>
        <View className="container px-8 mt-10">
          <Text className="text-rose-400 text-3xl">{slides[actual].title}</Text>
          <Text className="text-rose-400 mb-24">{slides[actual].text}</Text>
        </View>
        <View className="flex justify-center mx-auto flex-row relative bottom-0">
          <Pressable onPress={() => nextSlide(0)}>
            <Image
              className="w-3 h-3 mx-1"
              source={actual == 0 ? circle1 : circle2}
            ></Image>
          </Pressable>
          <Pressable onPress={() => nextSlide(1)}>
            <Image
              className="w-3 h-3 mx-1"
              source={actual == 1 ? circle1 : circle2}
            ></Image>
          </Pressable>
          <Pressable onPress={() => nextSlide(2)}>
            <Image
              className="w-3 h-3 mx-1"
              source={actual == 2 ? circle1 : circle2}
            ></Image>
          </Pressable>
        </View>
        <View className="flex items-end mt-10 mx-5">
          <Pressable
            className="bg-rose-400 w-32 text-center p-3 rounded-lg"
            onPress={nextSlide}
          >
            <Text className="text-white">{btnText} <AntDesign name="arrowright" size={16} color="white" /></Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
