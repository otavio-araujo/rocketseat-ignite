import { useState } from "react"
import { FlatList } from "react-native"

import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Header } from "@/components/Header"
import { Highlight } from "@/components/Highlight"
import { ButtonIcon } from "@/components/ButtonIcon"

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles"

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

      {/* <Filter title="Time A" isActive />
      <Filter title="Time B" /> */}
    </Container>
  )
}
