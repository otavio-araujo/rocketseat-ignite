import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION } from "../storageConfig"
import { groupsGetAll } from "./groupsGetAll"

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll()

    const updatedGroups = JSON.stringify([...storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, updatedGroups)
  } catch (error) {
    throw error
  }
}
