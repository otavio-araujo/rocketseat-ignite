import { Container, Name, RemoveIcon } from "./styles"
import { ButtonIcon } from "../ButtonIcon"

type Props = {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <RemoveIcon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  )
}
