export const Post = (entry) => {
    const dateObj = new Date(entry.date);
    const formattedDate = dateObj.toDateString();
    return `
    <section id="entry--${entry.id}" class="journalEntry">
    <h4>User Id: ${entry.userId}</h4>
    <h3>${entry.concepts}</h3>
    <p>${entry.journalEntry}</p>
    <p>${formattedDate}</p>
</section>
    `
  }