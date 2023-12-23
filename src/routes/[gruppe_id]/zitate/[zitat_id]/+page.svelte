<script>
  import axios from 'axios';
  export let data;
  
  let zitat = data.zitat;

</script>

<div class="container mt-4">
  <div class="card">
    {#if zitat.bild}
      <img src={zitat.bild} class="card-img-top" alt="Zitat Bild" style="object-fit: cover; height: 200px;">
    {/if}
    <div class="card-body">
      <h5 class="card-title">Zitat: {zitat.zitat}</h5>
      <p class="card-text"><strong>Beschreibung:</strong> {zitat.beschreibung}</p>
      <p class="card-text"><strong>Person:</strong> {zitat.person}</p>
      <p class="card-text"><strong>Datum:</strong> {new Date(zitat.datum).toLocaleString()}</p>

      <a href="/edit/{zitat._id}" class="btn btn-primary">Edit</a>
    </div>
  </div>
</div>