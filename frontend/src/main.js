import { mount } from 'svelte'                // import mount function from svelte
import './app.css'
import App from './App.svelte'                // import main App component

const app = mount(App, {                 // mount the App component             
  target: document.getElementById('app'),         // target element in HTML
})

export default app                      // export the app instance
