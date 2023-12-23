<script>
    import axios from "axios";
    import { goto } from '$app/navigation';
  
    let gruppe = {
      titel: "",
    };
  
    function addGruppe() {
      axios
        .post("/api/gruppen", gruppe)
        .then((response) => {
          goto('/gruppen', { replaceState: true });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  </script>
  
  <h1>Gruppe hinzufügen</h1>
  
  <form>
    <div class="mb-3">
      <label for="" class="form-label">Gruppenname</label>
      <input class="form-control" type="text" bind:value={gruppe.titel} />
    </div>
    <button on:click={addGruppe} type="button" class="btn btn-primary">
      Hinzufügen
    </button>
  </form>
  