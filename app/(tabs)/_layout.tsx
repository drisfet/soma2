import { Link, Tabs } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Atom, AudioWaveform } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10?.get() as string,
        tabBarStyle: {
          backgroundColor: theme.background?.get() as string,
          borderTopColor: theme.borderColor?.get() as string,
        },
        headerStyle: {
          backgroundColor: theme.background?.get() as string,
          borderBottomColor: theme.borderColor?.get() as string,
        },
        headerTintColor: theme.color?.get() as string,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <Atom color={color as any} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Button mr="$4" size="$2.5">
                Hello!
              </Button>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <AudioWaveform color={color as any} />,
        }}
      />
    </Tabs>
  )
}
