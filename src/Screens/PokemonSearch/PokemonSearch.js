import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import PokemonSearchBar from '../../components/PokemonSearchBar'
import axios from 'axios'
import { typeImages } from '../../assets/types/typeImages'


const PokemonSearch = () => {

    const [searchString, setSearchString] = useState("")

    const [searching, setSearching] = useState(false)

    const [searchPokemon, setSearchPokemon] = useState({
        name: "",
        types: [],
        sprite_front: null,
    })

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/infernape`)
            .then((resp) => {
                console.log(resp.data);
                console.log(resp.data.sprites.front_default);

                let pokemonTypeArray = []
                let typeData = resp.data.types

                typeData.forEach((item) => {
                    pokemonTypeArray.push({ type: item.type.name, url: item.type.url })
                })

                console.log(pokemonTypeArray);





                setSearchPokemon({
                    name: resp.data.name.charAt(0).toUpperCase() + resp.data.name.slice(1),
                    types: pokemonTypeArray,
                    sprite_front: resp.data.sprites.front_default,
                })
            })

    }, [])

    console.log("type array: ", searchPokemon.types);

    // First letter to upper case
    function upperCase(item) {
        let string = item.charAt(0).toUpperCase() + item.slice(1)
        return string
    }

    const renderItem = (item, index) => {
        /* console.log(item.item.type.name); */
        return (

            <View style={{ height: 70, width: 200, borderWidth: 1, }}>
                {/* <Text>{item.item.type.name}</Text> */}
                <Image
                    source={typeImages[item.item.type.name]}
                    style={{
                        flex: 1,
                        width: 100,
                        height: null,
                        resizeMode: 'contain'
                    }}
                />
            </View>
        )
    }

    return (
        <View style={{}}>
            <View style={{ /* borderWidth: 1, */ width: "100%", marginVertical: 25 }}>
                <PokemonSearchBar
                    valueString={searchString}
                    valueStringChange={setSearchString}
                    searchFunction={() => {
                        setSearching(!searching)
                    }}
                />
            </View>
            {searching == /* true */ false ? (
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <View style={{ flex: 1, borderWidth: 1, alignItems: "center" }}>
                            <Image
                                source={{ uri: searchPokemon.sprite_front }}
                                style={{ height: 150, width: 100 }}
                            />
                        </View>
                        <View style={{ flex: 1.5, borderWidth: 1, alignItems: "center" }}>
                            <Text style={{ fontSize: 18, marginVertical: 5, }}>{searchPokemon.name}</Text>
                            <View style={{ flexDirection: "row" }}>
                                {searchPokemon.types.map((item, i) => {

                                    let style = {
                                        width: 1,
                                        backgroundColor: "gray",
                                        height: 15,
                                        alignSelf: "center",
                                        marginHorizontal: 5
                                    }

                                    return (
                                        <View key={i} style={{ flexDirection: 'row' }}>
                                            <Text>{upperCase(item.type)}</Text>
                                            <View style={i < searchPokemon.types.length - 1 ? style : null} />
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={{ /* borderWidth: 1, */ alignItems: "center", justifyContent: "center" }}>
                    <Image
                        source={require("../../assets/grayBall.jpg")}
                        style={{ width: 200, height: 200, marginTop: 50 }}
                    />

                </View>
            )
            }

        </View >
    )
}

export default PokemonSearch