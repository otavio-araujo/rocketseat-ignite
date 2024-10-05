import { Alert, FlatList } from "react-native"
import { useCallback, useState } from "react"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

import { groupsGetAll } from "@/storage/group/groupsGetAll"

import { Button } from "@/components/Button"
import { Header } from "@/components/Header"
import { Loading } from "@/components/Loading"
import { GroupCard } from "@/components/GroupCard"
import { Highlight } from "@/components/Highlight"
import { Listempty } from "@/components/Listempty"

import { Container } from "./styles"

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate("new")
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group })
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Turmas", "Não foi possível carregar as turmas")
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      try {
        fetchGroups()
      } catch (error) {
        console.log(error)
      }
    }, [])
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <Listempty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
