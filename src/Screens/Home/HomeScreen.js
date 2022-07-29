import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './styles';
import borderShadow from '../../borderShadow';

const HomeScreen = ({ navigation }) => {

    useEffect(() => {
        /* axios.get(`https://pokeapi.co/api/v2/pokemon/infernape`)
          .then((resp) => {
            console.log(resp.data);
            console.log(resp.data.sprites.front_default);
    
            let pn = resp.data.name
    
    
            setImageFront(resp.data.sprites.front_default)
            setName(pn.charAt(0).toUpperCase() + pn.slice(1))
          }) */
    }, [])

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={styles.topImageContainer}>
                <View style={{ /* borderWidth: 1, */ }}>
                    <Image
                        source={require("../../assets/pokemonBall.gif")}
                        style={{ height: 200, width: 200, }}
                    />
                </View>
            </View>

            <View style={{ flex: 1, /* borderWidth: 1, */ alignItems: "center" }}>

                <TouchableOpacity style={[styles.redirectButtons, borderShadow.depth6]}
                onPress={() => {
                    navigation.navigate("Search")
                }}>
                    <Text style={styles.redirectButtonsText}>Pokemon search</Text>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.redirectButtons, borderShadow.depth6]}>
                    <Text style={styles.redirectButtonsText}>Advantages</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen