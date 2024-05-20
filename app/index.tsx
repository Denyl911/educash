import { Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Index() {
  // setTimeout(() => {
  //   if (true) {
  //     return router.navigate('/home');
  //   }
  //   router.navigate('/welcome');
  // }, 5000);
  return (
    <View className="flex justify-center items-center min-h-screen flex-col">
      <Text className="text-rose-400 text-7xl font-bold">EDUCASH</Text>
      <Pressable onPress={() => router.navigate('/welcome')}>
        <Text className="text-rose-400 italic mb-24">
          Sembrando habitos de ahorro
        </Text>
      </Pressable>
      <MaterialCommunityIcons name="loading" size={24} color="red" />
      <Text className="text-rose-400">Cargando ...</Text>
    </View>
  );
}
