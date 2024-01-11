<script>
    import { createEventDispatcher } from "svelte";

    export let text = "Löschen";

    const dispatch = createEventDispatcher();

    let showModal = false;


    function confirmDelete() {
        showModal = false;
        dispatch("delete");
    }

    function cancelDelete(event) {
        showModal = false;
        event.stopPropagation();
    }

    function buttonClicked(event) {
        event.stopPropagation();
        showModal = true;
    }
</script>

<button class="btn btn-danger" on:click={buttonClicked}>{text}</button>

{#if showModal}
    <div
        class="modal"
        tabindex="-1"
        role="dialog"
        id="deleteModal"
        style="display: block;"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Löschen</h5>
                    <button type="button" class="close" on:click={cancelDelete}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Willst du diesen Eintrag wirklich löschen?
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                        on:click={cancelDelete}>Abbrechen</button
                    >
                    <button
                        type="button"
                        class="btn btn-danger"
                        on:click={confirmDelete}
                        data-dismiss="modal">Löschen</button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}
