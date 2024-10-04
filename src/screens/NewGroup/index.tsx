import { Header } from "@/components/Header"
import { Container, Content, Icon } from "./styles"
import { Highlight } from "@/components/Highlight"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { useNavigation } from "@react-navigation/native"

export function NewGroup() {
  const navigation = useNavigation()

  const handleNew = () => {
    navigation.navigate("players", { group: "rocket" })
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

        <Input placeholder="Nome da turma" />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
