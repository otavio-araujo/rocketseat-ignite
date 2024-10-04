import { useState } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { groupCreate } from "@/storage/group/groupCreate"

import { AppError } from "@/utils/AppError"

import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Header } from "@/components/Header"
import { Highlight } from "@/components/Highlight"

import { Container, Content, Icon } from "./styles"

export function NewGroup() {
  const [group, setGroup] = useState("teste")

  const navigation = useNavigation()

  async function handleNew() {
    if (group.trim().length === 0 || group.trim().length < 3) {
      return Alert.alert(
        "Nova Turma",
        "Por favor, informe um nome para a turma com pelo menos 3 caracteres."
      )
    }

    try {
      await groupCreate(group)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Turma", error.message)
        return
      }

      Alert.alert("Novo Turma", "Não foi possível criar um novo turma")
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
