import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import Colors from '../../constant/Colors';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function SignUp() {
  const [fullName, setFullName] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const CreateAccount = () => {
    if (!email || !password) {
      console.log('Email and password must be provided');
      return;
    }
    setLoading(true);
    console.log({ email });
    console.log({ password });
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user: User = resp.user;
        console.log(user);
        await SaveUser(user);
        setLoading(false);
      })
      .catch((e: Error) => {
        console.log(e.message);
        setLoading(false);
      });
  };

  const SaveUser = async (user: User) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    };
    if (email) {
      await setDoc(doc(db, 'users', email), data);
    }

    setUserDetail(data);

    router.replace('/auth/signIn');
  };

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 20,
        padding: 25,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require('./../../assets/images/logo.png')}
        style={{
          width: 180,
          height: 180,
          borderRadius: 50,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          marginTop: 20,
        }}
      >
        Create New Account
      </Text>
      <TextInput
        onChangeText={(value: string) => setFullName(value)}
        placeholder="Full Name"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value: string) => setEmail(value)}
        placeholder="Email"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(value: string) => setPassword(value)}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity
        onPress={CreateAccount}
        disabled={loading}
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          width: '100%',
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center',
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <View
        style={{ display: 'flex', flexDirection: 'row', gap: 5, marginTop: 20 }}
      >
        <Text style={{ fontFamily: 'outfit' }}>Already have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>
            Sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});