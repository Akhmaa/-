import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useState } from 'react';
import { useEffect } from 'react';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('')


  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data)
      }).catch((err => {
        console.warn(err);
        alert('Ошибка при получении пользователей')
      })).finally(setIsloading(false));
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  };

  const onClickInvate = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter(_id => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {success ? <Success count={invites.length} /> : (<Users
        onClickSendInvites={onClickSendInvites}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        items={users}
        isLoading={isLoading}
        invites={invites}
        onClickInvate={onClickInvate}
      />)}

    </div>
  );
}

export default App;
