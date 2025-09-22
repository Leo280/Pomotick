import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Ícones do estilo Instagram

const FavoriteButton = () => {
  const [favorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} style={styles.button}>
      <AntDesign
        name={favorited ? 'heart' : 'hearto'}
        size={22}
        color={favorited ? '#888' : 'gray'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

export default FavoriteButton;
