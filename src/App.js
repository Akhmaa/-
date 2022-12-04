import React from 'react';
import { useState, useEffect } from 'react';
import Collection from './Collection'
import './index.scss';


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [collection, setCollection] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1)

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : ''

    fetch(`https://634292c6ba4478d4783de561.mockapi.io/travel-photo?page=${page}&limit=4&${category}`)
      .then(res => res.json())
      .then(json => {
        setCollection(json);
      })
      .catch(err => {
        console.warn(err)
        alert('Ошика при получении данных');
      }).finally(
        setIsLoading(false)
      )
  }, [categoryId, page]);



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId == i ? 'active' : ''}
              key={obj.name}>
              {obj.name}
            </li>))}
        </ul>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">

        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (collection
          .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj, i) => (
            <Collection key={i} name={obj.name} images={obj.photos} />))
        )}

      </div>
      <ul className="pagination">
        {[...Array(2)].map((_, i) => <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''} key={i}>{i + 1}</li>)}
      </ul>
    </div>
  );
}

export default App;
