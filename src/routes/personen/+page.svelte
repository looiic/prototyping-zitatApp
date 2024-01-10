<script>
  import axios from "axios";
  import { invalidateAll } from "$app/navigation";
  export let data;

  let newPerson = {
    name: "",
  };

  let errorMessage = "";

  function addPerson() {
    axios
      .post("/api/personen", newPerson)
      .then((response) => {
        console.log(response.data);
        invalidateAll();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deletePerson(id) {
    axios
      .delete("/api/personen/" + id)
      .then((response) => {
        alert("Person deleted");
        console.log(response.data);
        invalidateAll(); // reload data
      })
      .catch((error) => {
        console.log(error);
        errorMessage = error.response.data.error;
        showErrorModal();
      });
  }

  async function showErrorModal() {
    new bootstrap.Modal(document.getElementById("errorModal")).show();
  }

</script>

<a href="/"><h3>Zurück</h3></a>

<div class="m-3">
  <h1 class="display-4 mb-3">Personen</h1>
</div>
{#if data.personen.length === 0}
  <div class="alert alert-info m-3" role="alert">Keine Personen vorhanden.</div>
{/if}

{#each data.personen as person}
  <div class="card m-3">
    <div class="card-body d-flex justify-content-between align-items-center">
      <b>{person.name}</b>
      <button
        class="btn btn-danger"
        on:click={() => {
          deletePerson(person._id);
        }}>X</button
      >
    </div>
  </div>
{/each}

<button
  type="button"
  class="btn btn-primary ms-3 mt-4"
  data-toggle="modal"
  data-target="#personModal"
>
  Person hinzufügen
</button>

<!-- Modal neue Person -->
<div
  class="modal fade"
  id="personModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Name</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          bind:value={newPerson.name}
        />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"
          >Abbrechen</button
        >
        <button
          type="button"
          class="btn btn-primary"
          on:click={addPerson}
          data-dismiss="modal">Hinzufügen</button
        >
      </div>
    </div>
  </div>
</div>

<!-- Modal Fehlermeldung -->
<div
  class="modal fade"
  id="errorModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="errorModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="errorModalLabel">Fehler</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>{errorMessage}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"
          >Schliessen</button
        >
      </div>
    </div>
  </div>
</div>
