import profiles from './data/profiles.json'
import Editor from './components/Editor'

const App = () => {
  return <Editor data={profiles}/>
}

export default App