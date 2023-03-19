const searchInput = document.querySelector('.search-input');
const btn = document.querySelector('.btn');
const list = document.querySelector('.list');


btn.addEventListener('click', () => {
    const value = searchInput.value;
    const parts = [];
    if (value === '' || value.length < 3) {
        return list.innerHTML = 'Введите минимум 3 символа';
    }
    let url = `https://api.github.com/search/repositories?q=${value}&per_page=10`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const items = data.items;
            if (items.length == 0) {
                return list.innerHTML = 'Ничего не найдено'
            }
            for (item of items) {
                parts.push(`
                <li><a href="${item.svn_url}">${item.name}</a></li>
                `)
            }
            const result = parts.join('');
            const out = `<ul class="comment-items"> ${result} </ul>`;
            return list.innerHTML = out;
        })
});
