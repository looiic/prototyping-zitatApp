<script>
    import axios from "axios";
    import { goto } from '$app/navigation';
    import { invalidateAll } from "$app/navigation";
  
    export let data;

    let gruppe = data.gruppe;

    let neuePersonen = [];

    function addPerson() {
      neuePersonen = [...neuePersonen, '' ];
    }

    function removeNeuePerson(index) {
      neuePersonen.splice(index, 1);
      invalidateAll();
    }

    function saveChanges() {
      gruppe.personen = [...gruppe.personen, ...neuePersonen];
      axios
        .put('/api/gruppen/' + gruppe._id, gruppe)
        .then((response) => {
          goto('./', { replaceState: true }) 
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }


</script>

<a href="/"><h3>Zurück</h3></a>

<div class="m-3">
    <h1 class="display-4 mb-3">Gruppe bearbeiten</h1>
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
          <select class="form-select" bind:value={person} disabled>
            {#each data.allePersonen as allePerson}
              <option value={allePerson._id}>{allePerson.name}</option>
            {/each}
          </select>
        </div>
      {/each}

      {#each neuePersonen as person, index}
        <div class="input-group mb-2">
          <select class="form-select" bind:value={person}>
            <option value="" disabled>Person auswählen</option>
            {#each data.allePersonen as allePerson}
              <option value={allePerson._id}>{allePerson.name}</option>
            {/each}
          </select>
          <button type="button" class="btn btn-danger" on:click={() => removeNeuePerson(index)}>Entfernen</button>
        </div>
      {/each}

      <button type="button" class="btn btn-primary" on:click={addPerson}>Weitere Person</button>
    </div>
    <button on:click={saveChanges} type="button" class="btn btn-success w-100 mt-5">
      Änderungen speichern
    </button>
  </form>