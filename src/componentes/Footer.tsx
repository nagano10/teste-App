// Footer.js

import React from 'react';
import { View, Image } from 'react-native';
import FooterImage from '../assets/Cubo.png'

const Footer = () => {
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={FooterImage}
                style={{
                    width: 30,
                    height: 35,
                    marginBottom: 10, resizeMode: 'cover'
                }}
            />
        </View>
    );
};

export default Footer;
