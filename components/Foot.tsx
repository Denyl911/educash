import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Foot() {
  return (
    <View className="bg-gray-200 rounded-t-[20px] w-screen flex flex-row items-center justify-between text-rose-400 text-md px-8 py-3 mt-6">
      <Link className="text-center flex flex-col" href="/aprende">
        <Ionicons style={styles.rose} name="library" size={38} />
        {/* <Text className="text-rose-400 text-lg">Aprendee</Text> */}
      </Link>
      <Link
        className="bg-rose-400 p-3 rounded-full text-center flex flex-col"
        href="/home"
      >
        <FontAwesome style={styles.white} name="home" size={38} />
        {/* <Text className="text-white text-center text-lg">Inicio</Text> */}
      </Link>
      <Link className="text-center flex flex-col" href="/apartados">
        <Ionicons style={styles.rose} name="albums" size={38} />
        {/* <Text className="text-rose-400 text-lg">Apartados</Text> */}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    margin: 'auto',
  },
  rose: { color: '#fda4af', textAlign: 'center' },
  white: {
    color: '#ffffff',
    textAlign: 'center',
  },
  icon: {
    color: '#ffffff',
    textAlign: 'center',
    display: 'block',
    backgroundColor: '#fda4af',
    borderRadius: '100%',
    width: 50,
    height: 50,
  },
});
