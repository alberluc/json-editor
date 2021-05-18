import profiles from './data/profiles.json'
import JsonEditor from './components/Editor'

const App = () => {
  return <JsonEditor data={profiles}/>
}

export default App