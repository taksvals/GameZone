import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Card(props) {
    
    return (
        <View>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    }
});