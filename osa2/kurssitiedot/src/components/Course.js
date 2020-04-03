import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  const { parts } = course
  const total = parts.reduce((s, p) => s + p['exercises'], 0)

  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

export default Course