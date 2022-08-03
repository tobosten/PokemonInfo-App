import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './styles';
import borderShadow from '../../borderShadow';

const HomeScreen = ({ navigation }) => {


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
                    <Text style={styles.redirectButtonsText}>Find a pokemon</Text>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.redirectButtons, borderShadow.depth6]}>
                    <Text style={styles.redirectButtonsText}>Advantages</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen