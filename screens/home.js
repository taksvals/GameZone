import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { addReview, deleteReview } from '../reducers';

import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import ReviewForm from './reviewForm';

export default function Home({ navigation }) {
    const [openModal, setModalOpen] = useState(false);
    const reviews = useSelector(state => state.itemList);
    const dispatch = useDispatch();

    const onSaveReview = value => {
        dispatch(addReview(value));
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
                        <ReviewForm addReview={onSaveReview} />
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
                        style={styles.card}
                        onPress={() => navigation.navigate('ReviewDetails', item)}>
                        <Card>
                            <Text style={globalStyles.titleText}>{item.title}</Text>
                        </Card>
                        <MaterialIcons 
                            name='delete'
                            size={24}
                            style={styles.deleteReview}
                            onPress={() => dispatch(deleteReview(item.key))}
                        />
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
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    },
    deleteReview: {
        paddingHorizontal: 15,
        alignSelf: 'center'
    }
});