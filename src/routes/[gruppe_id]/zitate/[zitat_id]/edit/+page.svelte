<script>
    import axios from "axios";
    import { goto } from '$app/navigation';
  
    export let data;
  
    let zitat = data.zitat

  
    function saveZitat() {
      zitat.person = zitat.person._id;
      axios
        .put('/api/zitate/' + zitat._id, zitat)
        .then((response) => {
          goto('./', { replaceState: true }) 
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }

    
  
    function handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          zitat.bild = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  </script>
  
  <div class="m-3">
      <h1 class="display-4 mb-3">Zitat bearbeiten</h1>
  </div>
  
  <form class="m-3">
    <div class="mb-3">
      <label for="" class="form-label">Zitat</label>
      <input class="form-control" type="text" bind:value={zitat.zitat} />
    </div>
  
    <div class="mb-3">
      <label for="" class="form-label">Person</label>
      <select class="form-select" bind:value={zitat.person._id}>
        {#each data.personen as person}
          <option value={person._id}>{person.name}</option>
        {/each}
      </select>
    </div>
  
    <div class="mb-3">
      <label for="beschreibung" class="form-label">Beschreibung</label>
      <textarea class="form-control" id="beschreibung" bind:value={zitat.beschreibung}></textarea>
    </div>
  
    <div class="mb-3">
      <label for="datum" class="form-label">Datum</label>
      <input class="form-control" type="datetime-local" id="datum" bind:value={zitat.datum} />
    </div>
  
    <div class="mb-3">
      <label for="bild" class="form-label">Bild</label>
      {#if zitat.bild}
      <img src={zitat.bild} class="card-img-top" alt="Zitat Bild" style="object-fit: cover; height: 200px;">
      {/if}
      <input class="form-control" type="file" id="bild" accept="image/*" on:change={handleImageUpload} />
    </div>
    
    <div class="row">
      <div class="col-6">
          <a href="./" class="btn btn-secondary w-100">Abbrechen</a>
      </div>
      <div class="col-6">
          <button class="btn btn-success w-100" on:click={saveZitat}>Speichern</button>
      </div>
  </div>
  
  </form>
  