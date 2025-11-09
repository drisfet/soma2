import { YStack, H1 } from 'tamagui';
import { ChatInterface } from '../../components/ChatInterface';

export default function HomeScreen() {
  return (
    <YStack flex={1} bg="$background">
      <YStack py="$4" px="$4" borderBottomWidth={1} borderColor="$borderColor">
        <H1 size="$8">Somatic Alignment</H1>
      </YStack>
      <ChatInterface />
    </YStack>
  );
}
