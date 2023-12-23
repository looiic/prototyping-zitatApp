<script>
  import axios from "axios";
  import { invalidateAll } from "$app/navigation";
  import { goto } from '$app/navigation';

  export let data;
  
  function deleteZitat(id) {
    axios
      .delete("/api/zitate/" + id)
      .then((response) => {
        alert("Zitat deleted");
        console.log(response.data);
        invalidateAll(); // reload data
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function navigateToCreate() {
    goto('./zitate/create', { replaceState: false });
  }
</script>

<h1>List of all Zitate</h1>
<button class="btn btn-primary" on:click={navigateToCreate}>Zitat erfassen</button>
<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Zitat</th>
      <th>Person</th>
      <th>Gruppe</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each data.zitate as zitat}
      <tr>
        <td>
          <a href={"./zitat/" + zitat._id}>
            {zitat._id}
          </a>
        </td>
        <td>
          "{zitat.zitat}"
        </td>
        <td>
          {zitat.person}
        </td>
        <td>
          {zitat.gruppe}
        </td>
        <td>
          <button class="btn btn-danger"
            on:click={() => {
              deleteZitat(zitat._id);
            }}>X</button
          >
        </td>
      </tr>
    {/each}
  </tbody>
</table>
