import createPostElementCard from "./createPostElementCard.js";

// Appends current users post history to the view.
export default function createPostHistory(userPostHistory) {
    
    const postHistoryView = document.querySelector('.post-history-list');

    userPostHistory.forEach(post => {
        const postCardElemet = createPostElementCard(post);
        postHistoryView.append(postCardElemet);
    });
}