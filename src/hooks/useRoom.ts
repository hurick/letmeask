import { useState, useEffect } from 'react'

import { getDatabase, ref, onValue } from 'firebase/database'

type QuestionListTypes = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}>

export const useRoom = (params: { id: string }) => {
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
        isAnswered: value.isAnswered
      }))

      setRoomTitle(databaseRoom.title)
      setQuestionsList(parsedQuestions)
    })
  }, [params.id])

  return { roomTitle, questionsList }
}
