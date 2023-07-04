const Course = ({course}) => <h1>{course}</h1>

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Content = ({id, name, exercises }) => {
  return(
  <p key={id}>
    {name} {exercises}
  </p>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <div>
      <Course course={course.name} />
      {course.parts.map((part) => {
        return(
          <Content id={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
      <Content parts={course.parts} /> 
    </div>
  )
}

export default App