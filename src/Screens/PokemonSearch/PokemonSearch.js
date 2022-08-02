import { View, Text, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import PokemonSearchBar from '../../components/PokemonSearchBar'
import axios from 'axios'
import { typeText } from '../../assets/types/typeImages'
import { typeIcons } from '../../assets/types/typeIcons'
import StatsBar from '../../components/StatsBar/StatsBar'
import borderShadow from '../../borderShadow'


const PokemonSearch = () => {

    const [searchString, setSearchString] = useState("")

    const [searching, setSearching] = useState(false)

    const [searchPokemon, setSearchPokemon] = useState({
        name: "",
        types: [],
        sprite_front: null,
        stats: {}
    })


    // get pokemon info
    function fetchPokemon(string) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${string}`)
            .then((resp) => {
                console.log(resp.data);
                console.log(resp.data.sprites.front_default);

                let pokemonTypeArray = []
                let typeData = resp.data.types
                let statsData = resp.data.stats

                typeData.forEach((item) => {
                    pokemonTypeArray.push({ type: item.type.name, url: item.type.url })
                })

                console.log(pokemonTypeArray);

                setSearchPokemon({
                    name: resp.data.name.charAt(0).toUpperCase() + resp.data.name.slice(1),
                    types: pokemonTypeArray,
                    sprite_front: resp.data.sprites.front_default,
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
    }



    return (
        <View style={{}}>
            <View style={{ width: "100%", marginVertical: 25 }}>
                <PokemonSearchBar
                    valueString={searchString}
                    valueStringChange={setSearchString}
                    searchFunction={() => {

                        fetchPokemon(searchString)
                        setSearching(true)
                    }}
                />
            </View>

            {searching == true ? (
                <View style={[{ backgroundColor: "white", margin: 10, borderRadius: 8, paddingTop: 20,}, borderShadow.depth6]}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <View style={{ }}>
                            <View style={{ flex: 0.2, alignSelf: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 24 }}>{searchPokemon.name}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                                <Image
                                    source={{ uri: searchPokemon.sprite_front }}
                                    style={{ height: 160, width: 190 }}
                                />

                                {/* types */}
                                <View style={{ flexDirection: "row", marginTop: 15}}>
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