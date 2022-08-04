import { View, Text, ScrollView, Image, FlatList, ActivityIndicator, Animated, Easing } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import styles from './styles'
import PokemonSearchBar from '../../components/PokemonSearchBar'
import axios from 'axios'
import { typeText } from '../../assets/types/typeImages'
import { typeIcons } from '../../assets/types/typeIcons'
import StatsBar from '../../components/StatsBar/StatsBar'
import borderShadow from '../../borderShadow'
import { useToast } from 'react-native-toast-notifications'


const PokemonSearch = () => {

    /* const [searchString, setSearchString] = useRef("").current; */
    /* const searchString = useRef("").current */
    const [searchString, setSearchString] = useState("");
    const [searching, setSearching] = useState(false)
    const [searchPokemon, setSearchPokemon] = useState({})

    const toast = useToast();
    let pokemon = {}

    const [ev1, setEv1] = useState({})
    const [ev2, setEv2] = useState({})
    const [ev3, setEv3] = useState({})




    // get pokemon info
    async function fetchPokemon(string) {
        let lowerString = string.toLowerCase()
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerString}`)
            .then((resp) => {
                let pokemonTypeArray = []
                let abilityArray = []
                let typeData = resp.data.types
                let statsData = resp.data.stats
                let abilityData = resp.data.abilities

                typeData.forEach((item) => {
                    pokemonTypeArray.push({ type: item.type.name, url: item.type.url })
                })
                pokemon = {
                    species: resp.data.species.url,
                    name: resp.data.name
                }

                abilityData.forEach((item) => {
                    abilityArray.push({ name: item.ability.name, url: item.ability.url })
                })
                console.log(abilityData);

                setSearchPokemon({
                    id: resp.data.id,
                    name: resp.data.name,
                    abilities: abilityArray,
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
            }).then(() => {
                axios.get(pokemon.species)
                    .then((resp) => {
                        console.log(resp.data.evolution_chain.url);
                        axios.get(resp.data.evolution_chain.url)
                            .then((resp) => {
                                let evo1 = [resp.data.chain.species.name, 1]
                                let evo2 = [resp.data.chain.evolves_to[0].species.name, 2]
                                let evo3 = [resp.data.chain.evolves_to[0].evolves_to[0].species.name, 3]

                                evolutionChain(evo1)
                                evolutionChain(evo2)
                                evolutionChain(evo3)
                                /* console.log(pokemonEvolutions); */
                            })
                    }).then(() => {
                        setSearching(true)
                    }).catch(() => {
                        console.log("");
                    })

            }).catch(() => {
                if (searchString.length > 0) {
                    toast.show(`${searchString} not found`)
                } else {
                    toast.show("Enter pokemon name")
                }
            })
    }

    async function evolutionChain(item) {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${item[0]}`)
            .then((resp) => {
                /*  console.log(resp.data); */
                item[1] == 1 ? setEv1(resp.data) : null;
                item[1] == 2 ? setEv2(resp.data) : null;
                item[1] == 3 ? setEv3(resp.data) : null;

            })
    }


    /* Animation for poke ball image */
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


    const evImage = (ev) => {
        try {
            return (
                <View style={{ alignItems: "center", marginHorizontal: 15, }}>
                    <View>
                        <Text style={{ fontWeight: "600" }}>{ev.name.charAt(0).toUpperCase() + ev.name.slice(1)}</Text>
                        <Text style={{ fontStyle: "italic" }}>#{ev.id}</Text>
                    </View>

                    <Image
                        source={{ uri: ev.sprites.other["official-artwork"].front_default }}
                        style={{ height: 80, width: 80 }}
                    />

                    <View style={{ flexDirection: "row" }}>
                        {ev.types.map((type, i) => {
                            return (
                                <Image
                                    source={typeIcons[type.type.name]}
                                    style={{ height: 20, width: 20 }}
                                    key={i}
                                />
                            )
                        })}
                    </View>
                </View>

            )
        } catch {
            return (
                <View style={{ flex: 1, }} >
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>

            )
        }


    }

    return (
        <ScrollView style={{}}>
            <View style={{ width: "100%", marginVertical: 25 }}>
                <PokemonSearchBar
                    valueString={searchString}
                    valueStringChange={setSearchString}
                    searchFunction={() => {
                        fetchPokemon(searchString)
                    }}
                />
            </View>

            {searching == true ? (
                <>
                    <View style={[{ backgroundColor: "white", margin: 10, borderRadius: 8, paddingTop: 20, }, borderShadow.depth6]}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', }}>

                                {/* name and id */}
                                <View style={{ flex: 0.2, alignSelf: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 24, fontWeight: "600" }}>
                                        {searchPokemon.name.charAt(0).toUpperCase() + searchPokemon.name.slice(1)}
                                    </Text>
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
                        <View style={{ backgroundColor: "lightgray", height: 1, width: "90%", marginVertical: 20, alignSelf: "center" }} />

                        {/* abilities */}
                        <View style={{ /* borderWidth: 1, */ paddingHorizontal: 20, alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "600", marginRight: "auto" }}>Abilities</Text>

                        </View>


                    </View>

                    {/* evolution chain */}
                    <View style={[{
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                        backgroundColor: "white",
                        width: "95%",
                        borderRadius: 8,
                        alignSelf: "center",
                        paddingVertical: 20,
                        marginVertical: 10,
                    }, borderShadow.depth6]}>

                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10, }}>Evolutions</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                {/* click on evoutions to display them as "seach results" 
                                    (change search pokemon with selected evo?)
                                */}
                                {evImage(ev1)}
                                {evImage(ev2)}
                                {evImage(ev3)}
                            </View>


                        </View>

                    </View>
                </>
            ) : (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Animated.Image
                        source={require("../../assets/grayBall.jpg")}
                        style={[{ width: 200, height: 200, marginTop: 50 }, { transform: [{ rotate: spin }] }]}
                    />
                </View>
            )
            }

        </ScrollView >
    )
}

export default PokemonSearch