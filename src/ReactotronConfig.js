import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

// then add it to the plugin list
Reactotron
  .configure({ name: 'React JS Demo' })
  .use(reactotronRedux()) //  <- here i am!
  .connect() //Don't forget about me!