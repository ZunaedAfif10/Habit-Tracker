
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function Home() {
  const [habit, setHabit] = useState('')

  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem('habits') || '[]')
  })

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = () => {
    if (!habit.trim()) return

    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: habit,
        completed: false
      }
    ])

    setHabit('')
  }

  const toggleHabit = (id) => {
    setHabits(
      habits.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  const deleteHabit = (id) => {
    setHabits(habits.filter((item) => item.id !== id))
  }

  const completed = habits.filter(
    (item) => item.completed
  ).length

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      <Card className="w-3xl mx-auto py-10 px-5 mt-10">

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            🌱 My Habit Tracker
          </CardTitle>
          <p className="text-center text-gray-500">
            Build good habits every day!
          </p>
        </CardHeader>

        <CardContent>

          <div className="flex gap-2">
            <Input
              placeholder="Enter a habit..."
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
            />

            <Button onClick={addHabit}>
              Add
            </Button>
          </div>

          <div className="mt-5 space-y-3">

            {habits.length === 0 && (
              <p className="text-center text-gray-400">
                No habits yet. Add your first habit!
              </p>
            )}

            {habits.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleHabit(item.id)}
                  />

                  <span className={
                    item.completed
                      ? 'line-through text-gray-400'
                      : ''
                  }>
                    {item.name}
                  </span>

                </label>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteHabit(item.id)}
                >
                  Delete
                </Button>

              </div>
            ))}

          </div>

          <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">

            <h3 className="font-bold text-green-700">
              Daily Progress
            </h3>

            <p className="mt-2 text-gray-600">
              Completed: {completed} / {habits.length}
            </p>

            <p className="text-2xl font-bold text-green-600">
              {habits.length
                ? Math.round((completed / habits.length) * 100)
                : 0}%
            </p>

          </div>

          <Button
            className="w-full mt-5"
            variant="outline"
            onClick={() => navigate('/about')}
          >
            About Project
          </Button>

        </CardContent>
      </Card>

    </div>
  )
}

function About() {
  const navigate = useNavigate()

  return (
    <Card className="max-w-md mx-auto mt-10 p-5">

      <CardTitle>About Habit Tracker</CardTitle>

      <p className="mt-4 text-gray-600">
        This is a simple Habit Tracker built using
        React, Vite, Tailwind CSS and shadcn/ui.
      </p>

      <Button
        className="mt-5"
        onClick={() => navigate('/')}
      >
        Go Home
      </Button>

    </Card>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
