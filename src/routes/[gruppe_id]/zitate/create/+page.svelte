<script>
  import axios from "axios";
  import { goto } from '$app/navigation';

  export let data;

  let zitat = {
    zitat: "",
    person: "",
    gruppe: data.gruppe._id,
  };

  function addZitat() {
    console.log(zitat);
    axios
      .post("/api/zitate", zitat)
      .then((response) => {
        goto('../zitate', { replaceState: true }) 
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
</script>

<h1>Add an zitat</h1>

<form>
  <div class="mb-3">
    <label for="" class="form-label">Zitat</label>
    <input class="form-control" type="text" bind:value={zitat.zitat} />
  </div>
  <div class="mb-3">
    <label for="" class="form-label">Person</label>
    <select class="form-select" bind:value={zitat.person}>
      {#each data.gruppe.personen as person}
        <option value={person}>{person}</option>
      {/each}
    </select>
  </div>
  
  <button on:click={addZitat} type="button" class="btn btn-primary">
    Add Zitat
  </button>
</form>
