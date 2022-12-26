export const wiki_url = (number, value) =>
  `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=${number}&format=json&origin=*&srsearch=${value}`;

// srlimit number =page limitation
