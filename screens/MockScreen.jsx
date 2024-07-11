import { Pressable, SafeAreaView, ScrollView, Text} from "react-native";

function MockScreen({navigation}) {
  return (
    <SafeAreaView style={{ margin: 10, flex:1, justifyContent:'center' }}>
      <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold', marginVertical:10}}>All Routes are Listed Here</Text>
      <ScrollView style={{flex:1}}>
        <Pressable onPress={()=>navigation.navigate("Login")} style={{ margin: 10, backgroundColor: "gray", padding: 15 }}>
          <Text>Login Screen</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("Register")} style={{ margin: 10, backgroundColor: "gray", padding: 15 }}>
          <Text>Register Screen</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate("Home")} style={{ margin: 10, backgroundColor: "gray", padding: 15 }}>
          <Text>Home Screen</Text>
        </Pressable>
        <Pressable style={{ margin: 10, backgroundColor: "gray", padding: 15 }}>
          <Text>User Requests</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MockScreen;
