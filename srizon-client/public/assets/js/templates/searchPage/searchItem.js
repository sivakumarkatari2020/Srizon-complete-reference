
try{
    let inpBox = document.getElementById('full-search-input');
    let btn = document.getElementById('full-search-btn');

    let searchStr = '';
    inpBox.addEventListener('input',(e)=>{
        if(e.data === null){
            searchStr = searchStr.trim().substring(0,searchStr.length-1);
        }else{
            searchStr += e.data;
        }

        if(searchStr.trim().length > 2){
            btn.style.pointerEvents = 'all';
            btn.style.backgroundColor = '#7f87ab';
        }else{
            btn.style.pointerEvents = 'none';
            btn.style.backgroundColor = '#c6c6c6';
        }
    })

    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location = `./search.html?squery=${searchStr}`;
    })
} catch (error) {
    console.log(error);
}