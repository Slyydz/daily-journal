
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <h4>${entry.userId}</h4>
            <h3>${entry.concepts}</h3>
            <p>${entry.journalEntry}</p>
            <p>${entry.date}</p>
        </section>
    `
}