import { formatearFecha, formatearHora, sC } from '..//hooks/round';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Movimiento({ title, date, amount, type }) {
  function ShowImage() {
    if (type == 'Ingreso') {
      return <Image source={require('../assets/images/happy.png')}></Image>;
    } else {
      return <Image source={require('../assets/images/angry.png')}></Image>;
    }
  }
  return (
    <View className="flex flex-row mx-5 mt-3">
      <View className="basis-2/12">
        <ShowImage />
      </View>
      <View className="basis-7/12">
        <Text className="text-[1.2rem]">{title}</Text>
        <Text className="text-gray-400 text-sm">{formatearFecha(date)}</Text>
      </View>
      <View className="basis-3/12">
        <Text className="text-[1.2rem]">
          {type == 'Ingreso' ? '+' : '-'}${sC(amount)}
        </Text>
        <Text className="text-gray-400 text-sm">{formatearHora(date)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
  },
  rose: { color: '#fda4af' },
});
