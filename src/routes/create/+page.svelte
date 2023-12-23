<script>
    import axios from "axios";
    import { goto } from '$app/navigation';
  
    let gruppe = {
      titel: "",
      personen: [
        ''
      ],
    };

    function addPerson() {
      console.log(gruppe);
      gruppe.personen = [...gruppe.personen, '' ];
    }

    function removePerson(index) {
      gruppe.personen.splice(index, 1);
    }
  
    function addGruppe() {
      console.log(gruppe);
      axios
        .post("/api/gruppen", gruppe)
        .then((response) => {
          goto('..', { replaceState: true });
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
    <div class="mb-3">
      <label class="form-label">Personen</label>
      <button type="button" class="btn btn-primary" on:click={addPerson}>Add Person</button>
      {#each gruppe.personen as person, index}
        <div class="input-group mb-2">
          <input type="text" class="form-control" placeholder="Person Name" bind:value={person}>
          <button type="button" class="btn btn-danger" on:click={() => removePerson(index)}>Remove</button>
        </div>
      {/each}
    </div>
    <button on:click={addGruppe} type="button" class="btn btn-primary">
      Hinzufügen
    </button>
  </form>
  