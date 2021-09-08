export const Post = (entry) => {
    const dateObj = new Date(entry.date);
    const formattedDate = dateObj.toLocaleDateString();
    
    return `
    <section id="entry--${entry.id}" class="journalEntry">
    <h3>${entry.concepts}</h3>
    <p>${entry.journalEntry}</p>
    <p>${formattedDate}</p>
    <p>Mood: ${entry.moodId} </p>
    <h4>User Id: ${entry.userId}</h4>
    
</section>
    `
  }