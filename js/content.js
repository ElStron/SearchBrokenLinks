const linkStyle = `
width: 230px;
position: fixed;
height: max-content;
background: #000;
bottom: 0;
right: 0;
z-index: 9000000000000;
color: #fff;
padding: 10px;
display: flex;
align-items: center;
justify-content: center;`;

const links = document.querySelectorAll('a');
const urlsToCheck = [];

links.forEach((link) => {
  const url = link.getAttribute('href');
  const isExternal = url.startsWith('http://') || url.startsWith('https://');
  
  if (isExternal) {
    urlsToCheck.push(url);
  }
});

chrome.runtime.sendMessage({ action: "checkLinks", urls: urlsToCheck }, (response) => {
    const brokenLinks = response.results
    let links = ''

    if (brokenLinks.length === 0) {
      document.body.insertAdjacentHTML('afterbegin',`<p style=" ${linkStyle}">No broken links found</p>`)
      return
    }
    brokenLinks.forEach((link) => {
      links += `<a href="${link}">${link}</a><br/>`
    })
    const div = document.createElement('div')
    div.style = linkStyle
    div.innerHTML = links
    document.body.insertAdjacentHTML('afterbegin', div)
});
