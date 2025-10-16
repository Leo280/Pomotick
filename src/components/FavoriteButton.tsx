import useAppSettings from '@/stores/AppSettingsStore';
import useTask from '@/stores/TaskStore';
import { Task } from '@/types/Task';
import { Octicons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { StyleSheet, TouchableOpacity } from 'react-native';

type FavoriteButtonProps = Pick<Task, 'id' | 'isFavorite'>
const audioSource = require("../../assets/sounds/sonic_ring.mp3")

const FavoriteButton = ({ id, isFavorite }: FavoriteButtonProps) => {
  const player = useAudioPlayer(audioSource)
  const { changeFavorite } = useTask()
  const { settings } = useAppSettings()

  const onPressFavButton = async (id: string) => {
    if (settings.sounds) {
      player.play()
      player.seekTo(0)
    }
    changeFavorite(id)
  }

  return (
    <TouchableOpacity onPress={() => onPressFavButton(id)} style={styles.button}>
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
