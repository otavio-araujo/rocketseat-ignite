import AsyncStorage from "@react-native-async-storage/async-storage"

import { AppError } from "@/utils/AppError"

import { PLAYER_COLLECTION } from "../storageConfig"
import { PlayerStorageDTO } from "./PlayerStorageDTO"

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(newPlayer)
    )
  } catch (error) {
    throw error
  }
}
