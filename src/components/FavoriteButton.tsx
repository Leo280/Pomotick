import useTask from '@/stores/TaskStore';
import { Task } from '@/types/Task';
import { Octicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

type FavoriteButtonProps = Pick<Task, 'id' | 'isFavorite'>

const FavoriteButton = ({ id, isFavorite }: FavoriteButtonProps) => {
  const { changeFavorite } = useTask()

  return (
    <TouchableOpacity onPress={() => changeFavorite(id)} style={styles.button}>
      <Octicons
        name={isFavorite ? 'heart-fill' : 'heart'}
        size={22}
        color={isFavorite ? '#888' : 'gray'}
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
