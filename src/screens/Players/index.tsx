import { useState } from "react"
import { FlatList } from "react-native"

import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Header } from "@/components/Header"
import { Listempty } from "@/components/Listempty"
import { Highlight } from "@/components/Highlight"
import { ButtonIcon } from "@/components/ButtonIcon"
import { PlayerCard } from "@/components/PlayerCard"

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"
import { Button } from "@/components/Button"

export function Players() {
  const [team, setTeam] = useState("time a")
  const [players, setPlayers] = useState([])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Nome da Turma"
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
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
