const btns = document.getElementById('dogSelect');
const imgs = document.getElementById('imgs');
const imgBtn = document.getElementById('imgBtn');

fetch('https://dog.ceo/api/breeds/list/all')
    .then(response =>{
        if(!response.ok){
            throw new Error('A solicitação não foi bem-sucedida');
        }
        return response.json();
    })
    .then(data =>{
        const racas = data.message;
        Object.keys(racas).forEach(raca =>{
            const dogBtn = document.createElement('option');
            dogBtn.value = raca;
            dogBtn.textContent = raca;
            btns.appendChild(dogBtn);

            
        })

        imgBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const dogSelect = btns.value;
            addImg(dogSelect);
        });
    })
    .catch(error => {
        console.error('Erro na solicitação de API', error);
    });

    async function addImg(raca){
        imgs.innerHTML = '';
        const loader = document.createElement('div');
        loader.id = 'loader';
        imgs.appendChild(loader);
        const img = await gerarImg(raca);
        imgs.innerHTML = '';  
        imgs.appendChild(img);  
    }

    function gerarImg(raca){
        return new Promise((resolve) => {
            fetch(`https://dog.ceo/api/breed/${raca}/images/random`)
            .then(response =>{
            if(!response.ok){
                throw new Error('A solicitação não foi bem-sucedida');
            }
            return response.json();
            })
            .then(data=>{
            const img = document.createElement('img');
            img.src = data.message;
            resolve(img);
            })
            .catch(error => {
                console.error('Erro na solicitação de API', error);
            });
        
        });
    }