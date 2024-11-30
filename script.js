const API_URL = 'http://localhost:3000/items';


async function loadItems() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Eliminar</button>
                </td>
            `;
            itemList.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar los ítems:', error);
    }
}


async function addItem(event) {
    event.preventDefault();
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;

    const newItem = {
        name,
        price: parseFloat(price)
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });

        if (response.ok) {
            loadItems(); 
            document.getElementById('itemForm').reset();
        }
    } catch (error) {
        console.error('Error al agregar el ítem:', error);
    }
}


async function deleteItem(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadItems();
        }
    } catch (error) {
        console.error('Error al eliminar el ítem:', error);
    }
}


document.getElementById('itemForm').addEventListener('submit', addItem);


loadItems();
