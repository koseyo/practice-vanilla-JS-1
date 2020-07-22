const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');


// error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}


// success message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// check email
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, '無効なメールアドレスです')
    }
}


// required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} を記入してください`);
        } else {
            showSuccess(input);
        }
    });
}


// password match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, '確認のためのパスワードが違います')
    } else if(input2.value === '') {
        showError(input2, 'もう一度パスワードを記入してください')
    }
}


// fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `最低${min}文字で記入してください`);
    } else if(input.value.length > max) {
        showError(input, `最大${max}文字までです`);
    } else {
        showSuccess(input);
    }
}


// event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, confirm]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, confirm);
});