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
  Button,
  HStack,
  IconButton,
  Progress,
} from '@chakra-ui/react'
import { deleteTask, getTasks, Task, updateTask } from '~services/task.request';
import { useEffect, useState } from 'react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Home: NextPage = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const handleLoadTasks = async () => {
    try {
      const { data: tasks } = await getTasks();

      const tasksDone = tasks.filter((task) => {
        return task.done === true
      });

      const progress = tasks.length <= 0 ? 0 : Math.round(tasksDone.length / tasks.length * 100)

      setProgress(progress);
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
    handleLoadTasks();
  }, []);

  const handleUpdateTask = async (id: string, data: { title?: string; description?: string; done?: boolean }) => {
    try {
      await updateTask(id, data)
      handleLoadTasks();
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

  const handleDeleteTask = async (id: string) => {
    try {
      confirm("Tem certeza que quer deletar a tarefa? Essa ação será irreversível")
      await deleteTask(id)

      toast({
        title: "Sucesso",
        description: "Sucesso ao deletar tarefa",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

      handleLoadTasks()
    } catch (err: any) {
      toast({
        title: "Erro ao deletar tarefa",
        description: err?.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
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
                  <HStack key={task.id} justifyContent='space-between' alignItems='flex-start' spacing={6}>
                    <Stack spacing={2}>
                      <Checkbox
                        isChecked={task.done}
                        onChange={() => handleUpdateTask(task.id, { done: !task.done })}
                      >
                        {task.title}
                      </Checkbox>
                      <Text fontSize='sm'>{task.description}</Text>
                    </Stack>
                    <HStack>
                      <IconButton onClick={() => handleDeleteTask(task.id)} aria-label='Delete task button' icon={<DeleteIcon />} />
                      <Link href={`/tasks/${task.id}`} passHref>
                        <IconButton aria-label='Edit task button' icon={<EditIcon />} />
                      </Link>
                    </HStack>
                  </HStack>
                ))
              ) : (
                <Text>Nenhuma tarefa encontrada</Text>
              )}
            </Stack>

            <Link href={`/tasks/create`} passHref>
              <Button size='sm' leftIcon={<AddIcon />}>Criar tarefa</Button>
            </Link>

            <Stack spacing={2}>
              <Progress value={progress} />
              <Text align='center'>{progress}% das tarefas concluídas</Text>
            </Stack>
          </Stack>
        </Container>
      </main>
    </>
  )
}

export default Home
