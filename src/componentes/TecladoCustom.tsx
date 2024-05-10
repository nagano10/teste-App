import React from "react";
import { Platform, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const TecladoCustom = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={Platform.OS === 'ios' ? -50 : -50} // Ajuste vertical para Android e IOS
      style={{ backgroundColor: 'black' }} 
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default TecladoCustom;
