import { AppError } from "@/utils/AppError"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { groupsGetAll } from "./groupsGetAll"
import { GROUP_COLLECTION } from "../storageConfig"

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if (groupAlreadyExists) {
      throw new AppError("Ja existe um grupo cadastrado com esse nome!")
    }

    const updatedGroups = JSON.stringify([...storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, updatedGroups)
  } catch (error) {
    throw error
  }
}
