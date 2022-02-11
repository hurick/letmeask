import { useState, useEffect } from 'react'

import { getDatabase, ref, onValue, off } from 'firebase/database'
import { useAuth } from './useAuth'

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<string, { authorId: string }>
}>

export type QuestionListTypes = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export const useRoom = (params: { id: string }) => {
  const { user } = useAuth()

  const [roomTitle, setRoomTitle] = useState<string>('')
  const [questionsList, setQuestionsList] = useState<QuestionListTypes[]>([])

  useEffect(() => {
    const roomRef = ref(getDatabase(), `rooms/${params.id}`)

    onValue(roomRef, room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom?.questions
      const parsedQuestions = Object.entries(firebaseQuestions ?? []).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
        likeCount: Object.values(value.likes ?? {}).length,
        likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
      }))

      setRoomTitle(databaseRoom.title)
      setQuestionsList(parsedQuestions)
    })

    return () => off(roomRef)
  }, [params.id, user?.id])

  return { roomTitle, questionsList }
}
