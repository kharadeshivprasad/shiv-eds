import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {

  const url = "https://publish-p152536-e1620746.adobeaemcloud.com/graphql/execute.json/CHG/GetEventList";

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ variables: {} })
})
.then(res => res.json())
.then(data => {
  const firstEvent = data.data.eventList.items[0];
  alert(`Title: ${firstEvent.title}\nDescription: ${firstEvent.description}\nCategory: ${firstEvent.category}`);
})
.catch(err => {
  console.error("Error:", err);
  alert("Failed to fetch event data.");
});
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
