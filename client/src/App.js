import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  LandingPage  from './components/LandingPage';
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';
import PokemonDetail from './components/PokemonDetail';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}></Route>
        <Route exact path='/home' component={Home}></Route>
        <Route exact path='/pokemons' component={CreatePokemon}></Route>
        <Route exact path='/pokemons/:id' component={PokemonDetail}></Route>
        <Route exact path='/about' component={About}></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
