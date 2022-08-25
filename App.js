import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import CoinItem from "./components/CoinItem";

const App = () => {

  //usando useState creamos estados en nuestros componentes. Un Estado es reactivo, cuando un estado se modifica, el componente y sus hijos se modifican
  //constante [valor del estado, Funcion que se ocupa de actualizar el estado] = se iguala a useState (podermos darle un valor o no)
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);



//Fetch API es una interfaz para obtener información de una URL. Lo bueno es que la mayoría de los navegadores modernos incluyen la función de manera global =>
// <= por lo que podemos usarla sin necesidad de instalar librerías adicionales en nuestros proyectos
//creamos la constante llamada loadData que me devuelve los datos del API, como es asincrona usamos la funcion async
  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    //en esta linea usamos el setCoin creado en la constante useState definido en linea 16, el cual se inicio en blanco, almacenando los datos de la constante "data" y cargandolos en el useState en blanco que dejamos en linea 16
    const data = await res.json();
    setCoins(data);
  };
  //llamo la funcion loadData desde el useEffect("le estamos indicando a React que el componente tiene que hacer algo después de renderizarse"). Esto me muestra en pantalla todos los datos del array cargado en la API.
  useEffect(() => {
    loadData();
  }, []);




  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="#141414" />

      <View style={styles.header}>
        <Text style={styles.title}>Cripto App</Text>
        <TextInput
          style={styles.searchImput} //es el input que se usa para buscar alguna coin especifica 
          placeholder="Search a Coin"
          placeholderTextColor="grey"
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <FlatList                   
        style={styles.list}//FlatList recibe un arreglo y te permite recorrerlo de forma mas facil
        data={coins.filter( //recibe como dato el arreglo "coins"
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search) 
        )}
        renderItem={({ item }) => { //devuelve uno a uno cada elemento del arreglo "coins", es decir porciones de codigo para cada uno de los objetos que se esten recorriendo. 
          return <CoinItem coin={item} />; //devolvemos el coinItem, el cual fue creado en otro archivo para darle estilos, luego llamamos a coin y al valor de esta coin(item)
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => { //Refresca los precios de las coins, como es asincrono se usa async.
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />


    </View>
  );
};


//ESTILOS VIEW Y FLAT LIST
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  searchImput: {
    color: "#fff",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});
export default App;
