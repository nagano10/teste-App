import React from 'react';
import { Modal, Text, VStack } from 'native-base';
import { ScrollView } from 'react-native';

const CustomModal = ({ isVisible, onClose, children }) => {
    return (
        <Modal isOpen={isVisible} onClose={onClose} size="lg">
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>
                    Informações do Cliente
                </Modal.Header>
                <Modal.Body style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {children}
                    </ScrollView>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}

export default CustomModal;
