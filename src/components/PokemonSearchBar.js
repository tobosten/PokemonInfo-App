import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import barStyle from './barStyles'
import borderShadow from '../borderShadow'


const PokemonSearchBar = ({valueString, valueStringChange, searchFunction}) => {

    

    return (
        <View style={[barStyle.container, borderShadow.depth6]}>
            <View style={barStyle.inputContainer}>
                <TextInput
                    value={valueString}
                    onChangeText={valueStringChange}
                    style={barStyle.textInput}
                />
            </View>
            <View style={{width: 1, backgroundColor: "lightgray", height: "70%", alignSelf: "center"}} />
            <View style={barStyle.buttonContainer}>
                <TouchableOpacity onPress={searchFunction}>
                    <Image
                        source={require("../assets/search/searchImage.png")}
                        style={{ height: 35, width: 35 }}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default PokemonSearchBar;