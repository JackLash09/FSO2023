import React, { useState } from 'react';
import courses from './Data'

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