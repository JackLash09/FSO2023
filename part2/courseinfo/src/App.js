import React, { useState } from 'react';

const Course = ({id, name }) => {
  return(
    <h3 key={id}>{name}</h3>
  )
}

const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h4>total of {sum} exercises</h4>


const Content = ({ id, name, exercises }) => {
  return (
    <p key={id}>
      {name} {exercises}
    </p>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  let sum = 0
  /*
  const sum = course.parts.reduce((total, currentValue) => total = total + currentValue.exercises, 0);
  */
 
  return (
    <>
      <h1>
        Web development curriculum
      </h1>
      {courses.map((course) => {
        sum = 0
        return(
          <div>
            <div>
              <Course id={course.id} name={course.name}/>
            </div>
            {
              course.parts.map((part) => (
                sum = sum + part.exercises,
                <Content id={part.id} name={part.name} exercises={part.exercises}/>
              ))
            }
            <div>
              <Total sum={sum}/>
            </div>
          </div>
        )
      }
      )}
    </>
  )
}

export default App