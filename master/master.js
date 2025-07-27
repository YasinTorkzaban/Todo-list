    let alert = document.querySelector('.alert')
    let list = document.querySelector('.list')
    let input1 = document.querySelector('.input1')
    let add_button = document.querySelector('#add')
    let back = document.querySelector('.back')
    let alert_button = document.querySelector('.alert>button')
    input1.focus()
    let isEditing = false
    let data = []

    // get local storage////////////////////

    let x = JSON.parse(localStorage.getItem('todoNames'))
    console.log(x);
    if (x != null) {
        data = x
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li')
            li.innerHTML = `
            <span class='line'></span>
            <h2>${data[i]}</h2>
            <input type="checkbox" onchange="check(this)">
            <span onclick="edit(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></span>
            <span onclick='lidel(this)'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></span>
            `
            list.appendChild(li)
            input1.value = null
            input1.focus()
        }

    }


    // get local storage////////////////////

    // mouse down add button//////////

    function mousedown_add_button(s) {
        add_button.classList.add('outline')
    }
    function mouseup_add_button(s) {
        add_button.classList.remove('outline')
    }

    // mouse down add button//////////

    //////////click add////////////

    add_button.addEventListener('click', (e) => {

        let temp = input1.value
        if (temp == '') {
            alert.children[0].innerText = 'Please write something!'
            alert.classList.add('show')
            back.classList.add('backalert')
            alert_button.addEventListener('click', (e) => {
                alert.classList.remove('show')
                back.classList.remove('backalert')
                input1.focus()
            })
        } else if (isEditing) {
            alert.children[0].innerText = 'You cannot add while editing!'
            alert.classList.add('show')
            back.classList.add('backalert')
            alert_button.addEventListener('click', (e) => {
                alert.classList.remove('show')
                back.classList.remove('backalert')
                input1.focus()
            })
        } else {
            add_title(temp)
        }

    })

    ///////////add////////////////

    function add_title(temp) {
        let li = document.createElement('li')
        li.innerHTML = `
        <span class='line'></span>
        <h2>${temp}</h2>
        <input type="checkbox" onchange="check(this)">
        <span onclick="edit(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></span>
        <span onclick='lidel(this)'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></span>
        `
        list.appendChild(li)
        input1.value = null
        input1.focus()
        data.push(temp)
        localStorage.setItem('todoNames', JSON.stringify(data))

    }

    ////////////check//////////////

    function check(s) {
        if (s.checked) {
            s.parentElement.children[0].style.width = '60%'
        } else {
            s.parentElement.children[0].style.width = '0'
        }
    }

    ////////////li delete//////////

    let acc_del_button = document.querySelector('.alert2>div:nth-of-type(2)>button')
    let dec_del_button = document.querySelector('.alert2>div:nth-of-type(1)>button')
    let alert2 = document.querySelector('.alert2')

    function lidel(s) {
        alert2.classList.add('show')
        back.classList.add('backalert')


        acc_del_button.onclick = (e) => {

            let text = s.previousElementSibling.previousElementSibling.previousElementSibling.innerText


            alert2.classList.remove('show')
            back.classList.remove('backalert')
            s.parentElement.style.opacity = 0

            setTimeout(() => {
                s.parentElement.remove()
            }, 400);

            add_to_gar(text)
            let index = Array.from(s.parentElement.parentElement.children).indexOf(s.parentElement)


            // set to local Storage////////////////
            data.splice((index - 2), 1)
            localStorage.setItem('todoNames', JSON.stringify(data))
        }


        dec_del_button.onclick = (e) => {
            alert2.classList.remove('show')
            back.classList.remove('backalert')
        }
    }

    // li delete////////

    // add to garbage////////
    let gar = document.querySelector('.garbage')
    let gar_li_num = 0

    function add_to_gar(temp) {
        let trash_li = document.createElement('li')
        trash_li.innerHTML = `
        <h2>${temp}</h2>
        <span onclick="recover(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#1f1f1f">
            <path
            d="M440-320h80v-166l64 62 56-56-160-160-160 160 56 56 64-62v166ZM280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
            </svg></span>
            <span onclick="del_gar(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                fill="#1f1f1f">
                <path
                d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                </svg></span>
                `
        gar.appendChild(trash_li)
        gar_li_num++

        input1.value = null
        input1.focus()

        if (trash_flag) {
            arrowdown(document.querySelector('.arrowdown'))
        }
    }

    // add to garbage////////

    // bg_alert_botton//////////////


    function bg_alert_botton(s) {
        s.classList.add('backbutton')
    }

    function bg_alert_button2(s) {
        s.classList.remove('backbutton')
    }

    function bg_alert2_button(s) {
        s.parentElement.classList.add('bg_acc_del')
        s.classList.add('bg_acc_del')
    }

    function bg_alert2_button2(s) {
        s.parentElement.classList.remove('bg_acc_del')
        s.classList.remove('bg_acc_del')
        input1.focus()
    }

    // bg_alert_button////////////

    // start height ul////////////

    let trash_flag = false

    function arrowup(s) {
        s.classList.remove('show')
        s.parentElement.parentElement.style.height = '70px'
        trash_flag = false
    }

    let trash_h = 0
    
    function arrowdown(s) {
        trash_h = 0
        let lis = document.querySelectorAll('.garbage>li')
        s.previousElementSibling.classList.add('show')

        lis.forEach((val, i) => {
            let li_h = (val.clientHeight) + 10
            trash_h += (li_h + 5)

        });
        trash_h += 70
        s.parentElement.parentElement.style.height = trash_h + 'px'
        trash_flag = true
    }

    // end ul height//////////

    // del gar/////////

    
    function del_gar(s) {
        s.parentElement.style.opacity = 0
        let minus_h = s.parentElement.clientHeight
        setTimeout(() => {
            s.parentElement.remove()
        }, 400);
        
        let old_h = gar.clientHeight
        if(gar_li_num == 1){
            old_h -= (minus_h + 15)
        }else{
            old_h -= (minus_h + 10)
        }
        gar.style.height = old_h + 'px'
         gar_li_num--
    }

    // del gar/////////

    // recover///////////

    function recover(s) {
        let old_text = s.previousElementSibling.innerText
        add_title(old_text)
        del_gar(s)

    }

    // recover///////////

    // edit/////////

    let num = 0
    let acc_edit = document.querySelector('.list>li>span:nth-of-type(1)')
    let isCurrentlyEditing = false
    //////////////////
    function edit(s) {
        //////
        if (isCurrentlyEditing) {

            if (!s.classList.contains('editing')) {
                alert.children[0].innerText = 'Something else is currently editing!'
                alert.classList.add('show')
                back.classList.add('backalert')
                alert_button.onclick = (e) => {
                    alert.classList.remove('show')
                    back.classList.remove('backalert')
                    input1.focus()
                }
                return
            }


            s.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`
            s.parentElement.children[1].innerText = input1.value
            let index = Array.from(s.parentElement.parentElement.children).indexOf(s.parentElement)
            console.log(index);

            data[index - 2] = input1.value
            localStorage.setItem('todoNames', JSON.stringify(data))
            input1.value = null
            input1.focus()
            isEditing = false
            isCurrentlyEditing = false
            s.classList.remove('editing')



        }
        //////
        else {
            s.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`
            let before_edit = s.parentElement.children[1].innerText
            input1.focus()
            input1.value = before_edit
            isEditing = true
            isCurrentlyEditing = true
            s.classList.add('editing')

        }
        num++
    }


    // edit/////////