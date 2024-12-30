"use client"

import { useEffect, useState } from "react"

interface TypeWriterProps {
  words: string[]
  delay?: number
  pauseBetweenWords?: number
}

export function TypeWriter({ 
  words, 
  delay = 50,
  pauseBetweenWords = 1000
}: TypeWriterProps) {
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [currentText, setCurrentText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isDone, setIsDone] = useState(false)

  // Start typing immediately
  useEffect(() => {
    setCurrentText(words[0].charAt(0))
  }, [words])

  useEffect(() => {
    if (wordIndex >= words.length) return
    if (isPaused) return

    const currentWord = words[wordIndex]
    
    if (isTyping) {
      const timeout = setTimeout(() => {
        if (currentText === currentWord) {
          setCompletedWords(prev => [...prev, currentWord + " "])
          setCurrentText("")
          setIsPaused(true)
          if (wordIndex === words.length - 1) {
            setIsDone(true)
          }
          setTimeout(() => {
            setIsPaused(false)
            setWordIndex(prev => prev + 1)
          }, pauseBetweenWords)
          return
        }
        setCurrentText(currentWord.substring(0, currentText.length + 1))
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentText, wordIndex, isTyping, isPaused, words, delay, pauseBetweenWords])

  return (
    <>
      {completedWords.map((word, index) => (
        <span key={index} className="inline-block whitespace-pre">
          {word}
          {index < words.length - 1 && index < wordIndex ? "• " : ""}
        </span>
      ))}
      {wordIndex < words.length && !isDone && (
        <span className="inline-block">
          {currentText}
          <span className="animate-pulse">|</span>
        </span>
      )}
    </>
  )
} 