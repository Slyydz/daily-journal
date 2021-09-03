/*
 *   Journal data for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// // This is the original data.
// const journal = [
//     {
//         id: 1,
//         date: "08/15/2021",
//         concept: "HTML & CSS",
//         entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
//         mood: "Ok"
//     },
//     {
//         id: 2,
//         date: "08/18/2021",
//         concept: "Project Completion",
//         entry: "Today we finished our group html and css projects and presented them to the class.",
//         mood: "Happy"
//     },
//     {
//         id: 3,
//         date: "08/19/2021",
//         concept: "Intro to Javascript",
//         entry: "Today was the first day of the class being introduced to JavaScript and how to implement it into the website.",
//         mood: "Ok"
//     }
// ]

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
// export const getJournalEntries = () => {
//     const sortedByDate = journal.sort(
//         (currentEntry, nextEntry) =>
//             Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
//     )
//     return sortedByDate
// }