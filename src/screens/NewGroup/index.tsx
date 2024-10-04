import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

import { groupCreate } from "@/storage/group/groupCreate"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Header } from "@/components/Header"
import { Highlight } from "@/components/Highlight"

import { Container, Content, Icon } from "./styles"

export function NewGroup() {
  const [group, setGroup] = useState("teste")

  const navigation = useNavigation()

  async function handleNew() {
    try {
      await groupCreate(group)
    } catch (error) {
      console.log(error)
    }
    navigation.navigate("players", { group })
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie uma turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
