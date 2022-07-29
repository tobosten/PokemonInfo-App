import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import PokemonSearchBar from '../../components/PokemonSearchBar'


const PokemonSearch = () => {

    const [searchString, setSearchString] = useState("")

    const [searching, setSearching] = useState(false)

    return (
        <View style={{}}>
            <View style={{ /* borderWidth: 1, */ width: "100%", marginVertical: 25 }}>
                <PokemonSearchBar
                    valueString={searchString}
                    valueStringChange={setSearchString}
                    searchFunction={() => {

                    }}
                />
            </View>
            <View style={{ /* borderWidth: 1, */ alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={require("../../assets/grayBall.jpg")}
                    style={{ width: 200, height: 200, marginTop: 50 }}
                />

            </View>
        </View>
    )
}

export default PokemonSearch