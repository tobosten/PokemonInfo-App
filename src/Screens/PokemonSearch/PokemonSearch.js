import { View, Text, ScrollView, Image, FlatList, ActivityIndicator, Animated, Easing } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import styles from './styles'
import PokemonSearchBar from '../../components/PokemonSearchBar'
import axios from 'axios'
import { typeText } from '../../assets/types/typeImages'
import { typeIcons } from '../../assets/types/typeIcons'
import StatsBar from '../../components/StatsBar/StatsBar'
import borderShadow from '../../borderShadow'


const PokemonSearch = () => {

    /* const [searchString, setSearchString] = useRef("").current; */
    const [searchString, setSearchString] = useState("");

    const [searching, setSearching] = useState(false)

    const [searchPokemon, setSearchPokemon] = useState({
        name: "",
        types: [],
        sprite_front: null,
        stats: {}
    })


    // get pokemon info
    async function fetchPokemon(string) {
        let lowerString = string.toLowerCase()
        try {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerString}`)
                .then((resp) => {
                    let pokemonTypeArray = []
                    let typeData = resp.data.types
                    let statsData = resp.data.stats

                    typeData.forEach((item) => {
                        pokemonTypeArray.push({ type: item.type.name, url: item.type.url })
                    })

                    setSearchPokemon({
                        id: resp.data.id,
                        name: resp.data.name.charAt(0).toUpperCase() + resp.data.name.slice(1),
                        types: pokemonTypeArray,
                        sprite_front: resp.data.sprites.other["official-artwork"].front_default,
                        stats: {
                            hp: statsData[0].base_stat,
                            attack: statsData[1].base_stat,
                            defense: statsData[2].base_stat,
                            special_attack: statsData[3].base_stat,
                            special_defense: statsData[4].base_stat,
                            speed: statsData[5].base_stat,
                        }
                    })
                })
        } catch {
            /* fix card flash */
            setSearching(false)
        }
    }


    const spinValue = useRef(new Animated.Value(0)).current;
    Animated.loop(
        Animated.timing(
            spinValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        }
        )
    ).start()
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    })


    return (
        <View style={{}}>
            <View style={{ width: "100%", marginVertical: 25 }}>
                <PokemonSearchBar
                    valueString={searchString}
                    valueStringChange={setSearchString}
                    searchFunction={() => {
                        console.log(searchString);
                        /* let pokemonName = searchString */

                        if (searchString.length > 0) {
                            fetchPokemon(searchString)
                            setSearching(true)
                        } else {
                            console.log("Hello");
                        }

                    }}
                />
            </View>

            {searching == true ? (
                <View style={[{ backgroundColor: "white", margin: 10, borderRadius: 8, paddingTop: 20, }, borderShadow.depth6]}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <View style={{ flex: 1, justifyContent: 'center', }}>

                            {/* name and id */}
                            <View style={{ flex: 0.2, alignSelf: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 24, fontWeight: "600" }}>{searchPokemon.name}</Text>
                                <Text style={{ fontStyle: "italic" }}>#{searchPokemon.id}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                                <Image
                                    source={{ uri: searchPokemon.sprite_front }}
                                    style={{ height: 160, width: 160 }}
                                />

                                {/* types */}
                                <View style={{ flexDirection: "row", marginTop: 15 }}>
                                    {searchPokemon.types.map((item, i) => {
                                        return (
                                            <Image
                                                key={i}
                                                source={typeIcons[item.type]}
                                                style={{ height: 40, width: 40, marginHorizontal: 5 }}

                                            />
                                        )
                                    })}
                                </View>
                            </View>
                        </View>

                        {/* stats */}
                        <View style={{ flex: 1, }}>
                            <StatsBar
                                hp={searchPokemon.stats.hp}
                                attack={searchPokemon.stats.attack}
                                defense={searchPokemon.stats.defense}
                                special_attack={searchPokemon.stats.special_attack}
                                special_defense={searchPokemon.stats.special_defense}
                                speed={searchPokemon.stats.speed}
                            />
                        </View>
                    </View>

                </View>
            ) : (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Animated.Image
                        source={require("../../assets/grayBall.jpg")}
                        style={[{ width: 200, height: 200, marginTop: 50 }, { transform: [{ rotate: spin }] }]}
                    />


                </View>
            )
            }

        </View >
    )
}

export default PokemonSearch