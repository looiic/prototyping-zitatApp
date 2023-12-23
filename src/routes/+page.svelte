<script>
  export let data;
  import { goto } from '$app/navigation';
  import { invalidateAll } from "$app/navigation";
  import axios from "axios";


  function deleteGruppe(id) {
    axios
      .delete("/api/gruppen/" + id)
      .then((response) => {
        alert("Gruppe deleted");
        console.log(response.data);
        invalidateAll(); // reload data
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function navigateToCreate() {
    goto('/gruppen/create', { replaceState: false });
  }

</script>

<h1>List of all Gruppen</h1>
<button class="btn btn-primary" on:click={navigateToCreate}>Gruppe erstellen</button>
<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
    </tr>
  </thead>
  <tbody>
    {#each data.gruppen as gruppe}
      <tr>
        <td>
          <a href={"/" + gruppe._id + "/zitate"}>
            {gruppe._id}
          </a>
        </td>
        <td>
          {gruppe.titel}
        </td>
        <td>
          <button class="btn btn-danger"
            on:click={() => {
              deleteGruppe(gruppe._id);
            }}>X</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
