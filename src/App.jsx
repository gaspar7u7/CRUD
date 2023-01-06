import { useEffect, useState } from "react";
import axios from "axios";
import Users from "./components/Users";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./style.css";

function App() {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [isVisible, setIsVisible] = useState(false);

  const clear = () => {
    reset({
      first_name: "",
      last_name: "",
      email: "",
      birthday: "",
      password: "",
    });
  };

  useEffect(() => {
    apiUsers("https://users-crud.academlo.tech/users/");
  }, []);

  const apiUsers = (url, method = "get", data = null) => {
    switch (method) {
      case "get": {
        axios.get(url).then((res) => {
          setUsers(res.data);
        });
        break;
      }
      case "post": {
        axios.post(url, data).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You added a new user",
            showConfirmButton: false,
            timer: 1500,
          });
          apiUsers("https://users-crud.academlo.tech/users/");
        });
        break;
      }
      case "put": {
        axios
          .put(url, data)
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "You modified a user",
              showConfirmButton: false,
              timer: 1500,
            });
            apiUsers("https://users-crud.academlo.tech/users/");
          })
          .catch((error) => console.log(error.response));
        break;
      }
      case "delete": {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });

        swalWithBootstrapButtons
          .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .delete(url)
                .then(() => {
                  apiUsers("https://users-crud.academlo.tech/users/");
                })
                .then(() => {
                  swalWithBootstrapButtons.fire(
                    "Deleted!",
                    "The user has been deleted.",
                    "success"
                  );
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              clear();

              apiUsers("https://users-crud.academlo.tech/users/");
              swalWithBootstrapButtons.fire(
                "Cancelled",
                "Your imaginary user is safe :)",
                "error"
              );
            }
          });

        break;
      }
    }
  };

  const submit = (data) => {
    apiUsers("https://users-crud.academlo.tech/users/", "post", data);
    clear();
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible ? (
        <div className="background-create-user">
          <div className="card-form">
            <form
              className="card-form-create-user"
              onSubmit={handleSubmit(submit)}
            >
              <h1>Create Users</h1>

              <label htmlFor="first_name">Fist name:</label>
              <input
                className="input input-text"
                required
                type="text"
                id="first_name"
                {...register("first_name")}
              />

              <label htmlFor="last_name">Last name:</label>

              <input
                required
                type="text"
                id="last_name"
                {...register("last_name")}
              />

              <label htmlFor="birthday">
                <i className="fa-solid fa-cake-candles"></i> Birthday:
              </label>

              <input type="date" id="birthday" {...register("birthday")} />

              <label htmlFor="email">Email:</label>

              <input type="email" id="email" {...register("email")} />

              <label htmlFor="password">Password:</label>

              <input type="password" id="password" {...register("password")} />

              <div className="buttons-create-user-container">
                <button className="btn btn-create">Create User</button>
                <button
                  className="btn btn-cancel"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  <i className="fa-solid fa-ban"></i> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="fresh"
            onClick={() => apiUsers("https://users-crud.academlo.tech/users/")}
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
          <button
            type="button"
            className="add-user-fixed"
            onClick={() => setIsVisible(!isVisible)}
          >
            <i className="fa-solid fa-plus"></i>{" "}
          </button>
        </div>
      )}
      <div className="general-container">
        <h1>Users</h1>

        <ul className="card-user-ul">
          {users.map((user) => (
            <Users user={user} apiUsers={apiUsers} key={user.id} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
