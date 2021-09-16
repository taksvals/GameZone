import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import ReviewForm from './reviewForm';

export default function Home({ navigation }) {
    const [openModal, setModalOpen] = useState(false);
    const [reviews, setReviews] = useState([
        {title: 'Zelda, Breath of Fresh Air', rating: 5, body: 'lorem ipsum', key: '1'},
        {title: 'Gotta Catch Them All (again)', rating: 4, body: 'lorem ipsum', key: '2'},
        {title: 'Not So "Final" Fantasy', rating: 3, body: 'lorem ipsum', key: '3'}
    ]);

    const addReview = (review) => {
        review.key = Math.random().toString();
        setReviews((currentReviews) => {
            return [review, ...currentReviews]
        });
        setModalOpen(false);
    }

    return (
        <View style={globalStyles.container}>
            <Modal visible={openModal} animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons 
                            name='close'
                            size={24}
                            style={{...styles.modalToggle, ...styles.modalClose}}
                            onPress={() => setModalOpen(false)}
                        />
                        <ReviewForm addReview={addReview} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <MaterialIcons 
                name='add'
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalOpen(true)}
            />
            <FlatList 
                data={reviews}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ReviewDetails', item)}>
                        <Card>
                            <Text style={globalStyles.titleText}>{item.title}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    modalContent: {
        flex: 1
    },
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    modalClose: {
        marginTop: 30,
        marginBottom: 0
    }
});