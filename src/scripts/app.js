const userList = document.getElementById("main");

const getData = (url) => {
   return fetch("https://randomuser.me/api/").then((response) => {
    if(response.ok){
       return response.json();
    } else {
      Promise.reject()
    }
  })
  // return new Promise((resolve, reject) => {
  //   const userRequest = new XMLHttpRequest();
  //   userRequest.addEventListener("readystatechange", () => {
  //     if (userRequest.readyState === 4 && userRequest.status === 200) {
  //       resolve(JSON.parse(userRequest.responseText));
  //     } else if (userRequest.readyState === 4) {
  //       reject(`${userRequest.status}: Error, this request was unsuccessful`);
  //     }
  //   });
  //   userRequest.open("GET", url);
  //   userRequest.send();
  // });
};

let userArray = [];

for (let i = 0; i < 10; i++) {
    userArray.push(getData("https://randomuser.me/api/")
    .then((users) => {
    return users;
  }
    ))
}

const sup = Promise.all(userArray).then((values) => {
  values.forEach((value) => {
    const date = new Date(value.results[0].dob.date);

    userList.insertAdjacentHTML('beforeend', `
    <ul>
    <li>
       <p>${value.results[0].name.title} ${value.results[0].name.first} ${value.results[0].name.last}</p>
      </li>
      <li>${value.results[0].email}</li>
      <li>
      <p>${date.getDay()}/${date.getMonth()}/${date.getFullYear()}</p>
      </li>
      <li>
        <p>${value.results[0].location.street.number} ${
          value.results[0].location.street.name
      }</p>
      </li>
      <li>${value.results[0].cell}</li>
      <li>${value.results[0].login.password}</li>
    </ul>
    `)
  })
})