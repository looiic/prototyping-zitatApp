<script>
  import axios from 'axios';
  import { goto } from '$app/navigation';
  export let data;
  
  let zitat = data.zitat;

  async function deleteZitat() {
    try {
      await axios.delete('/api/zitate/' + zitat._id);
      goto('./', { replaceState: false });
    } catch (error) {
      console.log(error);
    }
  }

</script>

<a href="./"><h3>Zurück</h3></a>

<div class="container mt-4">
  <div class="card">
    {#if zitat.bild}
      <img src={zitat.bild} class="card-img-top" alt="Zitat Bild" style="object-fit: cover; height: 200px;">
    {/if}
    <div class="card-body">
      <h5 class="card-title">Zitat: {zitat.zitat}</h5>
      <p class="card-text"><strong>Beschreibung:</strong> {zitat.beschreibung}</p>
      <p class="card-text"><strong>Person:</strong> {zitat.person.name}</p>
      <p class="card-text"><strong>Datum:</strong> {new Date(zitat.datum).toLocaleString()}</p>

      <a href="{zitat._id}/edit" class="btn btn-primary">Bearbeiten</a>
      <button class="btn btn-danger" on:click={deleteZitat}>Zitat löschen</button>
    </div>
  </div>
</div>