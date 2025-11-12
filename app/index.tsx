import { Image, Text, View } from "react-native";
import Colors from "../constant/Colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image 
        source={require('./../assets/images/landing.png')}
        style={{
          width: '100%',
          height: 300,
        }}
      />
      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: '100%',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: Colors.WHITE,
            fontWeight: 'outfit-bold',
          }}
        >
          Welcome to Mind AI
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center',
            marginTop: 20,
            fontFamily: 'outfit',
          }}
        >
          Transform your ideas into engaging educational content, effortlessly
          with our AI-powered platform 📚📺
        </Text>

      </View>
    </View>
  );
}
