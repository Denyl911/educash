import { Text, View, Pressable, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const logout = () => {
  console.log('Out');
};

export default function Nav({ name }) {
  const [sideOpen, setSideOpen] = useState(false);

  const showSide = () => {};
  if (sideOpen) {
    return (
      <View className="z-50 bg-transparent">
        <StatusBar
          backgroundColor="#fda4af"
          hidden={false}
          translucent={true}
        />
        <View className="w-[80%] h-screen fixed left-0 bg-slate-200 mt-10">
          <View className="flex flex-row items-center justify-between w-5/6">
            <Text className="text-lg py-8 px-5">Menu</Text>
            <Pressable
              onPress={() => {
                setSideOpen(false);
              }}
            >
              <AntDesign name="close" size={20} color="black" />
            </Pressable>
          </View>
          <Link className="p-5 text-rose-400 text-lg" href="/home">
            Inicio
          </Link>
          <Link className="p-5 text-rose-400 text-lg" href="/apartados">
            Mis Apartados
          </Link>
          <Link className="p-5 text-rose-400 text-lg" href="/crearApartado">
            Crear Apartado
          </Link>
          <Link className="p-5 text-rose-400 text-lg" href="/aprende">
            Aprende
          </Link>
          <Pressable className="absolute bottom-20" onPress={logout}>
            <Text className="p-5 text-rose-400 text-lg">Cerrar Sesion</Text>
          </Pressable>
        </View>
        <Pressable
          className="bg-slate-900 opacity-10 h-screen w-[20%] absolute right-0"
          onPress={() => setSideOpen(false)}
        ></Pressable>
      </View>
    );
  } else {
    return (
      <View className="px-4 py-3 mb-0 bg-gray-200">
        <StatusBar
          backgroundColor="#fda4af"
          hidden={false}
          translucent={true}
          className="mt-10"
        />
        <View className="flex flex-row items-center justify-between font-bold m-0 mt-10 w-full">
          <Pressable onPress={() => setSideOpen(true)}>
            <Ionicons
              className="inline-block"
              name="menu-outline"
              size={24}
              color="red"
            />
          </Pressable>
          <Text className="text-rose-400 text-lg">{name}</Text>
          <Pressable>
            <Ionicons name="notifications-outline" size={24} color="red" />
          </Pressable>
        </View>
      </View>
    );
  }
}
