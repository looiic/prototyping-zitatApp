<script>
    export let data;
    import axios from "axios";
    import { goto } from '$app/navigation';
    import { invalidateAll } from "$app/navigation";
  
    let gruppe = {
      titel: "",
      personen: [
        ''
      ],
    };

    function addPerson() {
      gruppe.personen = [...gruppe.personen, '' ];
    }

    function removePerson(index) {
      gruppe.personen.splice(index, 1);
      invalidateAll();
      
    }
  
    function addGruppe() {
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

<a href="/"><h3>Zurück</h3></a>
  
  <div class="m-3">
    <h1 class="display-4 mb-3">Gruppe erstellen</h1>
  </div>
  
  <form class="m-3">
    <div class="mb-3">
      <label for="gruppenname" class="form-label">Gruppenname</label>
      <input id="gruppenname" class="form-control" type="text" bind:value={gruppe.titel} />
    </div>
    <div class="mb-3">
      <p class="form-label">Personen</p>
      {#each gruppe.personen as person, index}
        <div class="input-group mb-2">
          <select class="form-select" bind:value={person}>
            <option value="" disabled>Person auswählen</option>
            {#each data.personen as person}
              <option value={person._id}>{person.name}</option>
            {/each}
          </select>
          <button type="button" class="btn btn-danger" on:click={() => removePerson(index)}>Entfernen</button>
        </div>
      {/each}

      <button type="button" class="btn btn-primary" on:click={addPerson}>Weitere Person</button>
    </div>
    <button on:click={addGruppe} type="button" class="btn btn-success w-100 mt-5">
      Gruppe speichern
    </button>
  </form>
  