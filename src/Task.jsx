import React, { useState } from "react";
import swal from "sweetalert";

const Task = () => {
  const users = [
    {
      id: 1,
      name: "Alice",
      surname: "Johnson",
      email: "lorem@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Bob",
      surname: "Smith",
      email: "lorem@gmail.com",
      role: "Admin",
    },
    {
      id: 3,
      name: "Carol",
      surname: "Williams",
      email: "lorem@gmail.com",
      role: "Admin",
    },
  ];

  const clients = [
    {
      id: 1,
      companyName: "lorem",
      name: "Harvey",
      surname: "Specter",
      cellPhone: 99450123456,
    },
    {
      id: 2,
      companyName: "ipsum",
      name: "Mike",
      surname: "Ross",
      cellPhone: 99451123456,
    },
    {
      id: 3,
      companyName: "itaque",
      name: "Loius",
      surname: "Litt",
      cellPhone: 99455123456,
    },
  ];

  const [clientsTable, setClientsTable] = useState(clients);
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    surname: "",
    phoneNumber: "",
  });
  const [edit, setEdit] = useState(null);
  const [closeModal, setModal] = useState("modal");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName) {
      swal({
        title: "",
        text: "Zəhmət olmasa Şirkət adını daxil edin",
        icon: "error",
        timer: 2000,
      });
    } else if (!formData.name) {
      swal({
        title: "",
        text: "Zəhmət olmasa adınızı daxil edin",
        icon: "error",
        timer: 2000,
      });
    } else if (!formData.surname) {
      swal({
        title: "",
        text: "Zəhmət olmasa soyadınızı daxil edin",
        icon: "error",
        timer: 2000,
      });
    } else if (!formData.phoneNumber) {
      swal({
        title: "",
        text: "Zəhmət olmasa nömrənizi daxil edin",
        icon: "error",
        timer: 2000,
      });
    } else if (edit !== null) {
      handleUpdate();
    } else handleAdd();
  };

  const handleAdd = () => {
    const newClient = {
      id: clientsTable.length + 1,
      companyName: formData.companyName,
      name: formData.name,
      surname: formData.surname,
      cellPhone: formData.phoneNumber,
    };

    setClientsTable([...clientsTable, newClient]);
    resetForm();
  };

  const handleUpdate = () => {
    const updatedClients = clientsTable.map((client, index) =>
      index === edit
        ? {
            ...client,
            companyName: formData.companyName,
            name: formData.name,
            surname: formData.surname,
            cellPhone: formData.phoneNumber,
          }
        : client
    );
    setClientsTable(updatedClients);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ companyName: "", name: "", surname: "", phoneNumber: "" });
    setEdit(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (index) => {
    const client = clientsTable[index];
    setFormData({
      companyName: client.companyName,
      name: client.name,
      surname: client.surname,
      phoneNumber: client.cellPhone,
    });
    setEdit(index);
  };

  const handleDelete = (targetIndex) => {
    setClientsTable(
      clientsTable.filter((client, index) => index !== targetIndex)
    );
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center my-4 text-dark">Mobil Group CRM Table</h2>
      <div className="users-section mb-5">
        <h2 className="mb-3 text-center text-dark">İstifadəçilər</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>İstifadəçi ID</th>
              <th>İstifadəçi adı</th>
              <th>İstifadəçi soyadı</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <span className="cell-header">İstifadəçi ID</span>
                  {user.id}
                </td>
                <td>
                  <span className="cell-header">İstifadəçi adı</span>
                  {user.name}
                </td>
                <td>
                  <span className="cell-header">İstifadəçi soyadı</span>
                  {user.surname}
                </td>
                <td>
                  <span className="cell-header">Email</span>
                  {user.email}
                </td>
                <td>
                  <span className="cell-header">Role</span>
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="clients-section">
        <h2 className="mb-3 text-center text-dark">Müştərilər</h2>
        <form onSubmit={handleSubmit}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Müştəri ID</th>
                <th>Şirkət adı</th>
                <th>Əlaqə şəxsinin adı</th>
                <th>Əlaqə şəxsinin soyadı</th>
                <th>Telefon</th>
                <th>Düzənlə</th>
              </tr>
            </thead>
            <tbody>
              {clientsTable.map((client, index) => (
                <tr key={client.id}>
                  <td>
                    <span className="cell-header">Müştəri ID</span>
                    {client.id}
                  </td>
                  <td>
                    <span className="cell-header">Şirkət adı</span>
                    {client.companyName}
                  </td>
                  <td>
                    <span className="cell-header">Əlaqə şəxsinin adı</span>
                    {client.name}
                  </td>
                  <td>
                    {" "}
                    <span className="cell-header">Əlaqə şəxsinin soyadı</span>
                    {client.surname}
                  </td>
                  <td>
                    <span className="cell-header">Telefon</span>+
                    {client.cellPhone}
                  </td>
                  <td>
                    <span className="cell-header">Düzənlə</span>
                    <div className="edit">
                      <i
                        className="fa-regular fa-pen-to-square text-primary fs-5"
                        onClick={() => handleEdit(index)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      ></i>
                      <i
                        className="fa-regular fa-trash-can text-danger fs-5 ms-4"
                        onClick={() => handleDelete(index)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {edit !== null ? "Müştərini Düzənlə" : "Yeni Müştəri"}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={resetForm}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <label>
                        Şirkət adı <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label>
                        Əlaqə şəxsinin adı{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label>
                        Əlaqə şəxsinin soyadı{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label>
                        Telefon <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss={`${!formData ? closeModal : ""}`}
                    onClick={handleSubmit}
                  >
                    Yadda Saxla
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="add-client-button d-flex align-items-center justify-content-end">
          <button
            className="btn btn-outline-dark mb-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Müştəri əlavə et
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
