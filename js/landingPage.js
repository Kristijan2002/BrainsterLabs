axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then(function (response) {
    const data = response.data;
    render(data);
  })
  .catch(function (error) {
    console.error(error);
  });

const render = (data) => {
  data.forEach((el) => {
    document.querySelector("#art").innerHTML += `<option>${el.name}</option>`;
    // filterArtOptions.innerHTML += `<option>${el.name}</option>`;
  });
};
