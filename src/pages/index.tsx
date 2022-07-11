import type { NextPage } from 'next'
import Head from 'next/head'

import { Checkbox, CheckboxGroup, Container, StackDivider, Heading, Stack, Box, Text } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Todo app</title>
        <meta name="description" content="Todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Stack minHeight='calc(100vh)' justifyContent='center' spacing={6}>
            <Heading>Tarefas</Heading>
            <CheckboxGroup colorScheme='blue' defaultValue={['naruto', 'kakashi']}>
              <Stack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
              >
                <Stack spacing={4}>
                  <Checkbox value='naruto'>Naruto</Checkbox>
                  <Text>Descrição da tarefa</Text>
                </Stack>
                <Stack spacing={4}>
                  <Checkbox value='sasuke'>Sasuke</Checkbox>
                  <Text>Descrição da tarefa</Text>
                </Stack>
                <Stack spacing={4}>
                  <Checkbox value='kakashi'>Kakashi</Checkbox>
                  <Text>Descrição da tarefa</Text>
                </Stack>
              </Stack>
            </CheckboxGroup>
          </Stack>
        </Container>
      </main>
    </div>
  )
}

export default Home
