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

  function navigateToZitat(zitatId) {
    goto('./zitate/' + zitatId, {replaceState: false});
  }
</script>

<a href="/"><h3>Zurück</h3></a>

<div class="m-3">
    <h1 class="display-4 mb-3">Zitate</h1>
    <button class="btn btn-success w-100" on:click={navigateToCreate}>Neues Zitat erfassen</button>
</div>

<div class="mt-5">
  {#each data.zitate as zitat}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="card m-3"  on:click={()=>{navigateToZitat(zitat._id);}}>
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="text-center">
        <h3 class="display-6">"{zitat.zitat}"</h3>
      </div>
      <div class="text-end">
        <i>- {zitat.person}</i>
      </div>
    </div>
</div>
  {/each}
</div>

