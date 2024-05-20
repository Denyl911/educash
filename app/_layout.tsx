import { Stack } from 'expo-router';
import '../assets/css/global.css';
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
      <Stack.Screen name="apartados" />
      <Stack.Screen name="crearApartado" />
    </Stack>
  );
}
