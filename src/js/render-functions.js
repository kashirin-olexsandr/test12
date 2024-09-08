//4 функція для відображення зображень та данних
export function renderData(dataImgArr, userListEl) {
     
    // дефрагментація
    const markup = dataImgArr.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `<li class="gallery-list-item">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img class="img" src="${webformatURL}" 
                        alt="${tags}" 
                        title="${tags}" />
                    </a>
                    <ul class="data-list">
                        <li class="data-item">
                            <p class="data-item-name">Likes</p>
                            <p class="data-numbers">${likes}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-item-name">Views</p>
                            <p class="data-numbers">${views}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-item-name">Comments</p>
                            <p class="data-numbers">${comments}</p>
                        </li>
                        <li class="data-item">
                            <p class="data-item-name">Downloads</p>
                            <p class="data-numbers">${downloads}</p>
                        </li>
                    </ul> 
          </li>`;
    }).join("");
    
    userListEl.insertAdjacentHTML("beforeend", markup);
}