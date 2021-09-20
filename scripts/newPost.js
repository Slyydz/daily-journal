export const newPost = () => {
    return `<div class="editTaco">
    <fieldset class="concept-field">
        <label for="conceptCovered">Concepts</label>
        <input type="text" name="conceptCover" id="conceptCovered">
    </fieldset>
    <fieldset class="entry-field">
        <label for="journalEntry">Journal Entry</label>
        <textarea rows="3" cols="35" name="journalEntry" form="usrform"></textarea>
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
    <input class="submitButton" type="button" id="submitButton" value="Submit Journal">
</section>`
}