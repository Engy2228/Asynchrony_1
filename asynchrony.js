const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
// функция createUserElement() создает HTML элемент в котором будет храниться user.name в виде текста
const createUserElement = (text) => {
  const $userName = document.createElement('li')
  const $userNameAnchor = document.createElement('a')
  $userNameAnchor.href = '#'
  $userNameAnchor.textContent = text
  $userName.append($userNameAnchor)

  return $userName
}
// нужно получить дата контейнер

const dataContainer = document.querySelector('#data-container')

function getAllUsers() {
  toggleLoader() // указываем функцию загрузки, написанную ниже в коде. Чтобы она не отображалась постоянно , в конце функции getAllUsers() мы указываем finally(), который используется для задач “очистки” и управления состоянием приложения после асинхронных операций.

  const result = fetch(USERS_URL, {
    method: 'GET', //fetch возвращает Promise который мы далее обрабатываем через .then, .catch
  })
  console.log('result', result)
  result
    .then((respons) => {
      if (!respons.ok) {
        throw new Error('Request error')
      }
      return respons.json() // запросы через fetch нужно декодировать через json()
    })
    .then((users) => {
      // then получает список пользователей и мы можем пробежаться по нему через foreach()
      console.log('users', users)
      users.forEach((user) => {
        //создаем HTMLэлемент объекта user (name)
        const userHTML = createUserElement(user.name)
        dataContainer.append(userHTML)
      })
    })
    .catch((error) => {
      // error берет значение new Error('Request error')
      console.log('error', error)
    })
    .finally(() => {
      toggleLoader() // прячет наш loader при помощи атрибута hidden
    })
}
getAllUsers() // сначала мы написали fetch, затем написали к нему .then и .catch, и потом все это перенесли в функцию getAllUsers()

// далее мы создаем функцию по переключению loader

function toggleLoader() {
  // сначала нужно получить сам loader по id
  const $loader = document.querySelector('#loader')
  // далее нужно проверить существует ли наш hidden
  const isHidden = $loader.hasAttribute('hidden')
  console.log(isHidden) // чтобы проверить, нужно вызвать функцию. Существует.
  // теперь напишем условие показа
  if (isHidden) {
    $loader.removeAttribute('hidden')
  } else {
    $loader.setAttribute('hidden', '')
  }
} //функцию загрузки мы указываем перед fetch()

console.log(getAllUsers(createUserElement(user.name)))
