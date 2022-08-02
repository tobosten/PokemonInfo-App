import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import borderShadow from '../../borderShadow'

const StatsBar = ({ hp, attack, defense, special_attack, special_defense, speed }) => {

    /* 
        highest base stats: 
            hp: 255
            atk: 181
            def: 230
            sp attack: 180
            sp def: 230
            speed: 200
    
        lowest base stats: (0)
            hp: 1
            atk: 5
            def: 5
            sp attack: 10
            sp def: 20
            speed: 5  
        */

    let hp_percentage = (hp / 255) * 100
    let attack_percentage = (attack / 181) * 100
    let defense_percentage = (defense / 230) * 100
    let special_attack_percentage = (special_attack / 180) * 100
    let special_defense_percentage = (special_defense / 230) * 100
    let speed_percentage = (speed / 200) * 100


    return (
        <View style={styles.mainContainer}>

            {/* Health */}
            <View style={styles.statContainer}>
                <Text style={{ width: "80%", paddingLeft: 5, }}>HP</Text>
                <View style={[styles.statBarContainer, borderShadow.depth6, { backgroundColor: "#c8f5c6" }]}>
                    <View style={{ backgroundColor: "#2bad26", height: 20, width: `${hp_percentage}%`, borderRadius: 10 }}>
                        <Text style={styles.statText}>{hp}</Text>
                    </View>
                </View>
            </View>

            {/* Attack */}
            <View style={styles.statContainer}>
                <Text style={{ width: "80%", paddingLeft: 5 }}>Attack</Text>
                <View style={[styles.statBarContainer, borderShadow.depth6, { backgroundColor: "#facdcd" }]}>
                    <View style={{ backgroundColor: "#f20505", height: 20, width: `${attack_percentage}%`, borderRadius: 10 }} >
                        <Text style={styles.statText}>{attack}</Text>
                    </View>

                </View>
            </View>

            {/* Defense */}
            <View style={styles.statContainer}>
                <Text style={{ width: "80%", paddingLeft: 5 }}>Defense</Text>
                <View style={[styles.statBarContainer, borderShadow.depth6, { backgroundColor: "#dde7ed" }]}>
                    <View style={{ backgroundColor: "#94b0b3", height: 20, width: `${defense_percentage}%`, borderRadius: 10 }} >
                        <Text style={styles.statText}>{defense}</Text>
                    </View>
                </View>
            </View>

            {/* Special Attack */}
            <View style={styles.statContainer}>
                <Text style={{ width: "80%", paddingLeft: 5 }}>SP Attack</Text>
                <View style={[styles.statBarContainer, borderShadow.depth6, { backgroundColor: "#dac5fa" }]}>
                    <View style={{ backgroundColor: "#7a34eb", height: 20, width: `${special_attack_percentage}%`, borderRadius: 10 }} >
                        <Text style={styles.statText}>{special_attack}</Text>

                    </View>
                </View>
            </View>

            {/* Special Defense */}
            <View style={styles.statContainer}>
                <Text style={{ width: "80%", paddingLeft: 5 }}>SP Defense</Text>
                <View style={[styles.statBarContainer, borderShadow.depth6, { backgroundColor: "#cccbf5" }]}>
                    <View style={{ backgroundColor: "#3734eb", height: 20, width: `${special_defense_percentage}%`, borderRadius: 10 }} >
                        <Text style={styles.statText}>{special_defense}</Text>
                    </View>
                </View>
            </View>

            {/* Speed */}
            <View style={styles.statContainer}>
                <Text style={{ width: "80%", paddingLeft: 5 }}>Speed</Text>
                <View style={[styles.statBarContainer, borderShadow.depth6, { backgroundColor: "#fae7ca" }]}>
                    <View style={{ backgroundColor: "#eba234", height: 20, width: `${speed_percentage}%`, borderRadius: 10 }} >
                        <Text style={styles.statText}>{speed}</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default StatsBar

