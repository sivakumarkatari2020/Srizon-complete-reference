import getCategoryList from "../../apis/client/getCategoryListAPI.js";

try{

    const result = await getCategoryList();

    const arr = new Array();
    const parentArr = new Array();

    for(let i=0;i<result.length;i++){
        if(result[i].parent_categ === null){
            parentArr.push(result[i]);
            let subArr = new Array(result[i]);

            for(let j=0;j<result.length;j++){
                if(result[j].parent_categ === result[i].id){
                    subArr.push(result[j]);
                }
            }

            arr.push(subArr);
        }
    }

    const dropDownMenu = document.getElementById("dropDownMenu");
    const dropDownMenu1 = document.getElementById("dropDownMenu1");
    const mainMenu = document.getElementById("menu-main-menu");

    let htmlTemplate = '<li class="menu-item"><a href="index.html" class="srizon-menu-item-title" title="Home">HOME</a></li>';
    let htmlTemplate2 = '<li class="menu-item"><a href="index.html" class="srizon-menu-item-title" title="Home">Home</a></li>';

    parentArr.map( ele => {

        let category_id = ele.id;
        let category_name = ele.category.replace(' ','-');

        htmlTemplate2 += `<li class="menu-item">
                            <a href="./products.html?category_id=${category_id}&category_name=${category_name}" class="srizon-menu-item-title" title="${category_name}">${category_name.toUpperCase().replace('-',' ')}</a>
                        </li>`
    })

    mainMenu.innerHTML = htmlTemplate2;

    arr.map( eles => {
        if(eles.length > 1){

            let category_name = eles[0].category.replace(' ','-');

            let innerTemplate = '';

            eles.map( sub => {
                let category_id = sub.id;
                let category_name = sub.category.replace(' ','-');

                innerTemplate += `<li class="menu-item">
                            <a title="${category_name}" href="./products.html?category_id=${category_id}&category_name=${category_name}" class="srizon-item-title">${category_name.toUpperCase().replace('-',' ')}</a>
                        </li>`
            })

            htmlTemplate += `<!-- menu items with subchild -->
                            <li class="menu-item menu-item-has-children">

                                <a title="${category_name}" href="javascript:void(0);" class="srizon-menu-item-title">${category_name.toUpperCase().replace('-',' ')}</a>

                                <span class="toggle-submenu"></span>

                                <ul role="menu" class="submenu">
                                    ${innerTemplate}
                                </ul>
                            </li>
                `

        } else if(eles.length === 1) {

            let category_id = eles[0].id;
            let category_name = eles[0].category.replace(' ','-');

            htmlTemplate += `<li class="menu-item">
                                <a title="${category_name}" href="./products.html?category_id=${category_id}&category_name=${category_name}" class="srizon-menu-item-title">${category_name.toUpperCase().replace('-',' ')}</a>
                            </li>`

        }
    })

    dropDownMenu.innerHTML = htmlTemplate;
    dropDownMenu1.innerHTML = htmlTemplate;

} catch (err) {
    console.log(err);
}