<script>
  export let data;
  import { goto } from "$app/navigation";
  import { invalidateAll } from "$app/navigation";
  import axios from "axios";
  import DeleteButton from "$lib/components/deleteButton.svelte";

  function deleteGruppe(id) {
    axios
      .delete("/api/gruppen/" + id)
      .then((response) => {
        console.log(response.data);
        invalidateAll(); // reload data
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function navigateToCreate() {
    goto("/create", { replaceState: false });
  }

  function navigateToPersonen() {
    goto("/personen", { replaceState: false });
  }

  function navigateToZitate(gruppenId) {
    goto("/" + gruppenId + "/zitate", { replaceState: false });
  }

  function navigateToGruppe(gruppenId) {
    goto("/" + gruppenId, { replaceState: false });
  }
</script>

<div class="m-3">
  <h1 class="display-4 mb-3">Deine Gruppen</h1>
  <div class="d-flex justify-content-between">
    <button class="btn btn-primary" on:click={navigateToCreate}
      >Gruppe erstellen</button
    >
    <button class="btn btn-primary" on:click={navigateToPersonen}
      >Personen verwalten</button
    >
  </div>
</div>
{#each data.gruppen as gruppe}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="card m-3"
    on:click={() => {
      navigateToZitate(gruppe._id);
    }}
  >
    <div class="card-body d-flex justify-content-between align-items-center">
      <div>
        <b>{gruppe.titel}</b>
      </div>
      <div>
        <button
          class="btn btn-secondary"
          on:click={(event) => {
            event.stopPropagation();
            navigateToGruppe(gruppe._id);
          }}
        >
          <i class="fa fa-cog" aria-hidden="true"></i>
        </button>

        <DeleteButton
          on:delete={() => {
            deleteGruppe(gruppe._id);
          }}
          text="X"
        />
      </div>
    </div>
  </div>
{/each}
