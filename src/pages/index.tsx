import type { NextPage } from 'next'
import Head from 'next/head'

import {
  Checkbox,
  Container,
  StackDivider,
  Heading,
  Stack,
  Text,
  useToast,
  Button
} from '@chakra-ui/react'
import { getTasks, Task, updateTask } from '~services/task.request';
import { useEffect, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Home: NextPage = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleGetTasks = async () => {
    try {
      const { data: tasks } = await getTasks();
      setTasks(tasks);
    } catch (err: any) {
      toast({
        title: "Erro ao carregar tarefas",
        description: err?.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    handleGetTasks();
  }, []);

  const handleTask = (id: string, data: { title?: string; description?: string; done?: boolean }) => {
    const request = async () => {
      try {
        await updateTask(id, data)
        handleGetTasks();
      } catch (err: any) {
        toast({
          title: "Erro ao atualizar a tarefa",
          description: err?.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }

    request()
  }

  return (
    <>
      <Head>
        <title>Todo app</title>
        <meta name="description" content="Todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Stack minHeight='calc(100vh)' justifyContent='center' spacing={6}>
            <Heading>Tarefas</Heading>
            <Stack
              divider={<StackDivider borderColor='gray.200' />}
              spacing={4}
              align='stretch'
            >
              {tasks && tasks.length > 0
              ? (
                tasks.map((task) => (
                  <Stack key={task.id} justifyContent='space-between' alignItems='flex-start' spacing={6}>
                    <Stack spacing={2}>
                      <Checkbox
                        isChecked={task.done}
                        onChange={() => handleTask(task.id, { done: !task.done })}
                      >
                        {task.title}
                      </Checkbox>
                      <Text fontSize='sm'>{task.description}</Text>
                    </Stack>

                    <Link href={`/tasks/${task.id}`} passHref>
                      <Button size='sm' leftIcon={<EditIcon />}>Editar tarefa</Button>
                    </Link>
                  </Stack>
                ))
              ) : (
                <Text>Nenhuma tarefa encontrada</Text>
              )}
            </Stack>
          </Stack>
        </Container>
      </main>
    </>
  )
}

export default Home
