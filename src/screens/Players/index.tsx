import { useState } from "react"
import { Alert, FlatList } from "react-native"
import { useRoute } from "@react-navigation/native"

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
import { playerGetByGroupAndTeam } from "@/storage/player/playerGetByGroupAndTeam"

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState("time a")
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState("")

  const route = useRoute()
  const { group } = route.params as RouteParams

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
      const playersByTeam = await playerGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado"
      )
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
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

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
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

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  )
}
