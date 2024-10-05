import { useState, useEffect, useRef } from "react"
import { useRoute, useNavigation } from "@react-navigation/native"
import { Alert, FlatList, TextInput } from "react-native"

import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Header } from "@/components/Header"
import { Button } from "@/components/Button"
import { Listempty } from "@/components/Listempty"
import { Highlight } from "@/components/Highlight"
import { ButtonIcon } from "@/components/ButtonIcon"
import { PlayerCard } from "@/components/PlayerCard"

import { AppError } from "@/utils/AppError"

import { playerAddByGroup } from "@/storage/player/playerAddByGroup"
import { PlayerStorageDTO } from "@/storage/player/PlayerStorageDTO"
import { groupRemoveByName } from "@/storage/group/groupRemoveByName"
import { playerRemoveByGroup } from "@/storage/player/playerRemoveByGroup"
import { playerGetByGroupAndTeam } from "@/storage/player/playerGetByGroupAndTeam"

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"
import { Loading } from "@/components/Loading"

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [team, setTeam] = useState("time a")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState("")

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length < 3) {
      return Alert.alert(
        "Novo jogador",
        "Informe o nome da pessoa, com pelo menos 3 caracteres, para adicionar."
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      fetchPlayersByTeam()
      setNewPlayerName("")
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo jogador", error.message)
        return
      }

      Alert.alert("Novo jogador", "Não foi possível adicionar o jogador")
      console.log(error)
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playersByTeam = await playerGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado"
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa")
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate("groups")
    } catch (error) {
      console.log(error)
      Alert.alert("Remover turma", "Não foi possível remover a turma")
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => {
          groupRemove()
        },
      },
    ])
    try {
    } catch (error) {}
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["time a", "time b"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handleRemovePlayer(item.name)
              }}
            />
          )}
          ListEmptyComponent={() => (
            <Listempty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
