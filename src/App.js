import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const petDefault = {
  id: null,
  name: '',
  type: '',
  features: [],
  age: ''
};

const API_PETS_URL = 'http://localhost:3000/pets'

function App() {
  const [ pets, setPets ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ newPet, setNewPet ] = useState(petDefault);

  // axios.get 
  // axios.post(url, newPet)
  // axios.put
  // axios.delete

  /*useEffect(() => {
    axios
      .get('http://localhost:3000/pets')
      .then(res => {
        setPets(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [])*/

  const loadPets = async () => {
    try {
      const res = await axios.get(API_PETS_URL)
      const pets = await res.data
      setPets(pets)
      setIsLoading(false)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(loadPets, [])

  const onChange = (e) => {
    const { name, value } = e.target;

    setNewPet({
      ...newPet,
      [name]: value
    })
  }

  const onChangeList = (e) => {
    const { name, value } = e.target
    const valueList = value.split(', ')

    setNewPet({
      ...newPet,
      [name]: valueList
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(API_PETS_URL, {...newPet, id: pets.length + 1})
      .then(res => {
        loadPets()
        setNewPet(petDefault)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h2>Enter your dream pet</h2>
      <form>
        <label forhtml="name">name</label>
        <input name="name" id="name" onChange={onChange} /><br />
        <label forhtml="type">type</label>
        <input name="type" id="type" onChange={onChange} /><br />
        <label forhtml="features">features</label>
        <input 
          name="features"
          onChange={onChangeList}
          id="features"
          placeholder="enter comma separated features" 
        /><br />
        <label forhtml="age">age</label>
        <input onChange={onChange} name="age" id="age" /><br />
      </form>
      <button onClick={onSubmit}>create pet</button>
      <div className="PetsList">
        <h2>Pets</h2>
        {pets.map((pet) => (
          <div className="Pet">
            <div className="Pet--cat">
              <span><b>name</b>: </span>
              <span>{pet.name}</span>
            </div>
            <div className="Pet--cat">
              <span><b>type</b>: </span>
              <span>{pet.type}</span>
            </div>
            <div className="Pet--cat">
              <span><b>features</b>: </span>
              <span>{pet.features.join(', ')}</span>
            </div>
            <div className="Pet--cat">
              <span><b>age</b>: </span>
              <span>{pet.age}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
