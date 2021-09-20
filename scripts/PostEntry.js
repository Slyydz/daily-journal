export const PostEdit = (postId) => {
    return `
    <div class="editTaco">
                    <fieldset class="concept-field">
                        <label for="conceptCovered">Concepts</label>
                        <input type="text" name="conceptCover" id="conceptCovered" value="${postId.concepts}">
                    </fieldset>
                    <fieldset class="entry-field">
                        <label for="journalEntry">Journal Entry</label>
                        <textarea rows="3" cols="35" name="journalEntry" form="usrform">${postId.journalEntry}</textarea>
                    </fieldset>
                    <fieldset class="mood-field">
                        <label for="selectMood">Todays Mood</label>
                        <select name="selectMood" id="selectMood">
                            <option value="Sad">Sad</option>
                            <option value="Ok">Ok</option>
                            <option value="Happy">Happy</option>
                        </select>
                    </fieldset>
                </div>
                <section class="buttons">
                    <input class="updateButton" type="button" id="updateButton--${postId.id}" value="Update Journal ${postId.id}">
                    <input class="cancelButton" type="button" id="cancelButton" value="Cancel">
                </section>
    `
}