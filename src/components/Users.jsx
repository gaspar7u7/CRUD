import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import moment from "moment/moment";

const Users = ({ user, apiUsers }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isInput, setIsInput] = useState(false);

  // aqui voy a actualizar un usuario
  const submit = (data) => {
    apiUsers(
      `https://users-crud.academlo.tech/users/${user.id}/`,
      "put",
      data
    );
    setIsInput(false);
  };

  //aqui voy a eliminar un usuario

  const deleteUser = () =>
    apiUsers(`https://users-crud.academlo.tech/users/${user.id}/`, "delete");

  return !isInput ? (
    <li
      className="card-user"
      //   style={{ backgroundColor: user.color }}
      key={user.id_user}
    >
      <h3>
        {user.first_name} {user.last_name}
      </h3>
      <hr />
      <h4>Email</h4>
      <p>
        <i className="fa-solid fa-envelope"></i> {user.email}
      </p>
      <h4>Birthday</h4>
      <p>
        <i className="fa-solid fa-cake-candles"></i>{" "}
        {moment(user.birthday).format("MMM DD YYYY")}
      </p>
      <hr />
      <button
        className="btn btn-edit rigth"
        type="button"
        onClick={() => {
          setIsInput(true);

          reset({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            birthday: user.birthday,
            // color: user.color,
          });
        }}
      >
        <i className="fa-regular fa-pen-to-square"></i> Edit
      </button>
      <br />
    </li>
  ) : (
    <li
      className="card-user"
         style={{ backgroundColor: user.color }}
      key={user.id_user}
    >
      <form className="" onSubmit={handleSubmit(submit)}>
        <div className="input-form">
          {" "}
          <label htmlFor="first_name">First name:</label>
          <input
            required
            type="text"
            id="first_name"
            {...register("first_name")}
          />
        </div>

        <div className="input-form">
          <label htmlFor="last_name">Last name:</label>

          <input
            required
            type="text"
            id="last_name"
            {...register("last_name")}
          />
        </div>

        <div className="input-form">
          <label htmlFor="birthday">
            <i className="fa-solid fa-cake-candles"></i> Birthday:
          </label>

          <input type="date" id="birthday" {...register("birthday")} />
        </div>

        <div className="input-form">
          {" "}
          <label htmlFor="password">
            <i className="fa-solid fa-envelope"></i> Email:
          </label>
          <input type="email" id="email" {...register("email")} />
        </div>

        <div className="input-form">
          {" "}
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register("password")} />
        </div>

        {/* <label htmlFor="title">Color:</label>
        
        <input
          className="color-input"
          type="color"
          id="color"
          {...register("color")}
        />
         */}
        <div className="button-form">
          <button className="btn btn-create">
            <i className="fa-regular fa-pen-to-square"></i> Update
          </button>
          <button
            className="btn btn-cancel"
            type="button"
            onClick={() => setIsInput(false)}
          >
            <i className="fa-solid fa-ban"></i> Cancel
          </button>
          <button className="btn btn-delete" type="button" onClick={deleteUser}>
            <i className="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </form>
    </li>
  );
};

export default Users;
