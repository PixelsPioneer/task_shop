document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.escuelajs.co/api/v1/products';
    const container = document.querySelector('.container-inner');
    const loader = document.querySelector('.loader'); 

    async function fetchData() {
        loader.style.display = 'block'; 
    
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
            container.innerHTML = '<p>Error loading data</p>';
            return [];
        } finally {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); 
        }
    }

    async function displayProducts() {
        try {
            const products = await fetchData();
            container.innerHTML = '';
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');

                const image = document.createElement('img');
                image.src = product.url || 'https://placehold.co/200x200';
                image.alt = product.title || 'No Title';
                card.appendChild(image);

                const title = document.createElement('h3');
                title.textContent = product.title || 'No Title';
                card.appendChild(title);

                const descriptionContainer = document.createElement('div');
                descriptionContainer.classList.add('description-container');

                const description = document.createElement('p');
                description.textContent = product.description.length > 20 ? `${product.description.slice(0, 20)}...` : product.description;
                descriptionContainer.appendChild(description);

                const readMoreButton = document.createElement('button');
                readMoreButton.textContent = 'Read More';
                readMoreButton.classList.add('read-more-button');
                readMoreButton.addEventListener('click', function () {
                description.textContent = product.description;
                readMoreButton.style.display = 'none';
                });
                descriptionContainer.appendChild(readMoreButton);

                card.appendChild(descriptionContainer);

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');
                

                const nameButton = document.createElement('button');
                nameButton.textContent = `${product.category.name}`;
                nameButton.classList.add('name-button');
                buttonContainer.appendChild(nameButton);

                const likeButton = document.createElement('button');
                likeButton.textContent = 'Like';
                likeButton.classList.add('like-button');
                buttonContainer.appendChild(likeButton);

                card.appendChild(buttonContainer);

                const priceContainer = document.createElement('div');
                priceContainer.classList.add('price-container');

                const priceInnerContainer = document.createElement('div');
                priceInnerContainer.classList.add('price-inner-container');

                const priceLabel = document.createElement('p');
                priceLabel.textContent = 'Price';
                priceInnerContainer.appendChild(priceLabel);

                const price = document.createElement('h3');
                price.textContent = `$ ${product.price}`;
                priceInnerContainer.appendChild(price);

                priceContainer.appendChild(priceInnerContainer);

                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add To Cart';
                addToCartButton.classList.add('add-to-cart-button');

                priceContainer.appendChild(addToCartButton);

                card.appendChild(priceContainer);

                likeButton.addEventListener('click', function () {
                    likeButton.classList.toggle('liked');
                });

                container.appendChild(card);
            });
        } catch (error) {
            console.error('Error displaying products:', error);
        }
    }

    displayProducts();
});
