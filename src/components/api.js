const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-40',
  headers: {
    authorization: '8840b333-f706-4988-abeb-0f428c941145',
    'Content-Type': 'application/json'
  }
}

export const getUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/users/me', {
    method: 'GET',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};


export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards ', {
    method: 'GET',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const patchUserInfo = (newName, newDescription) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const postCard = (newCard) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards', {
    method: 'POST',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCard)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const putLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const deleteCardFromServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-40/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const patchAvatar = (avatar) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-40/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '8840b333-f706-4988-abeb-0f428c941145',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(avatar)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};