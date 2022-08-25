import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const CoinItem = ({ coin }) => { //aqui extraemos los valores de coin visibles en nuestra app, en este caso (image, name, symbol, current_price, coin.price_change_percentage_24h,etc ).
  return (
    <View style={styles.containerItem}>
      <Text style={styles.textSymbol}> {coin.symbol} </Text> 
      <View style={styles.coinName}>
        <Image style={styles.image} source={{ uri: coin.image }} /> 
        <View style={styles.containername}>
          <Text style={styles.text}>{coin.name}</Text> 
          <Text style={styles.textExtra}>Change 24hs</Text>
          <Text style={styles.textExtra}>High 24hs </Text>
          <Text style={styles.textExtra}>Low 24hs </Text>
        </View>
          
      </View>
      <View>
        <Text style={styles.textPrice}>${coin.current_price} </Text>
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          % {coin.price_change_percentage_24h}
        </Text>
        <Text style={styles.priceHigh}> ${coin.high_24h} </Text>
        <Text style={styles.priceLow}>${coin.low_24h} </Text>
      </View>
    </View>
  );
};


//DAMOS ESTILO A LOS VIEW / IMAGE Y TEXT.
const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between", //PARA DAR ESPACIO ENTRE TEXTO E IMAGEN
  },
  coinName: {
    flexDirection: "row", //PARA COLOCAR UN ELEMENTO AL LADO DE OTRO
  },
  text: {
    color: "#fff",
    textAlign: "left",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 20,
    alignItems: "stretch",
  },
  textSymbol: {
    color: "#778899",
    textTransform: "uppercase",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "green",
  },
  priceDown: {
    color: "red",
  },

  textPrice:{
    color: "#fff",
    textAlign: "right",
  },
  textExtra:{
    color: "#fff",
    textAlign: "left",
  },
  priceHigh: {
    color: "#ff4500",
    textAlign: "right",
  },
  priceLow: {
    color: "yellow",
    textAlign: "right",
  },
});

export default CoinItem;
