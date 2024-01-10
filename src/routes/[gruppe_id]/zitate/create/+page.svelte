<script>
  import axios from "axios";
  import { goto } from '$app/navigation';

  export let data;

  let zitat = {
    zitat: "",
    person: "",
    gruppe: data.gruppe._id,
    beschreibung: "",
    datum: "",  // Use an appropriate default date if necessary
    bild: null 
  };

  function addZitat() {
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

<a href="./"><h3>Zurück</h3></a>

<div class="m-3">
    <h1 class="display-4 mb-3">Zitat erfassen</h1>
</div>

<form class="m-3">
  <div class="mb-3">
    <label for="" class="form-label">Zitat</label>
    <input class="form-control" type="text" bind:value={zitat.zitat} />
  </div>

  <div class="mb-3">
    <label for="" class="form-label">Person</label>
    <select class="form-select" bind:value={zitat.person}>
      <option value="" disabled>Person auswählen</option>
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
    <input class="form-control" type="file" id="bild" accept="image/*" on:change={handleImageUpload} />
  </div>
  
  <button class="btn btn-success w-100 mt-4" on:click={addZitat}>Speichern</button>

</form>
