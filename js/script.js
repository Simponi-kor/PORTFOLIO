const screen_width = window.innerWidth,
    screen_height = window.innerHeight,
    tpying_li = document.querySelectorAll(".typing>li"),
    typing_hidden_li = document.querySelectorAll("#hidden_text>li"),
    typing_li_length = tpying_li.length;

    typing_text_arr_tmp = [];
    for (i = 0; i < typing_li_length; i++) {
        typing_text_arr_tmp[i] = typing_hidden_li[i].innerText;
    }
const typing_text_arr = typing_text_arr_tmp;
let typing_bool = true,
    typing_index = 0,
    typing_line_index = 0,
    typing_text = change_arr(typing_text_arr[typing_line_index].split("")),
    del = typing_text.length;
    
for (i = 0; i < typing_li_length; i++) {
    tpying_li[i].innerText = "";
}

let type = setInterval(typing, 200);
// console.log(screen_width+"  sc_he : "+screen_height);

// document.querySelector("#content1").style.innerHeight = screen_height;


document.querySelector(".menu").addEventListener("click", direct_menu);
// 메뉴 이벤트

window.addEventListener("scroll", debounce(user_scroll,300));
// 스크롤 이벤트

function direct_menu(ev) {
    // 메뉴 이동 

    contents = document.querySelectorAll(".content");
    let content_index = get_index(ev.target);
    if(ev.target.tagName != "UL") {
        content_scroll_top = contents[content_index].offsetTop-80;
        window.scrollTo({
            top:content_scroll_top,
            left:0,
            behavior:'smooth'
        });
    }
}

function go_top() {
    // 위로 이동하기 버튼

    var body = document.getElementsByTagName("body")[0];
        window.scroll({
            behavior: 'smooth',
            top:body.offsetTop
        });
}

function get_index(selector) {
    // 해당 요소가 몇번째 요소인지 구하는 함수

    for(var i = 0; i < selector.parentNode.childNodes.length; i++) {
        if (selector.parentNode.children[i] === selector) {
            return i;
        }
    }
}

function change_arr(arr) {
    // 배열의 공백(&nbsp;) 구현

    for (i=0; i<arr.length; i++) {
        if(arr[i] == " ") {
            arr[i] = "&nbsp;";
        }
    }
    return arr;
}

function user_scroll(){
    // 스크롤시 실행

    scrollPosition = window.scrollY || document.documentElement.scrollTop;
    hamberger_menu = document.querySelector(".go_top_btn");
    header = document.getElementsByTagName("header");
    console.log(scrollPosition);
    if(scrollPosition >= 100) {
        // 메뉴 다운 업
        header[0].style.top = "0px";
    }else {
        header[0].style.top = "-80px";
    }

    if(scrollPosition >= 300) {
        //  위로 올라가기 버튼
        hamberger_menu.style.display = "block";
        setTimeout(function() {
            hamberger_menu.style.opacity = "1";
        }, 100);
    }else {
        hamberger_menu.style.display = "none";
        hamberger_menu.style.opacity = "0";
    }
}
function copy_text(ev) {
    var temp_element = document.createElement('textarea'),
    copy_text = ev.target.innerText,
    text="";
    temp_element.value = copy_text;  
    document.body.appendChild(temp_element);

    temp_element.select();
    document.execCommand("copy");
    document.body.removeChild(temp_element);
    
    if(ev.target.id == "email") {
        text = "이메일이";
    }else {
        text = "휴대전화가"
    }
    alert("클립보드에 "+text+" 복사되었습니다.");
}
    
    

function debounce(fun, delay) {
    // 이벤트를 감쌀 디바운싱 함수

    let timer = null;
    // 타이머 선언
    return function() {
        // 타이머 변수에 접근 가능한 클로져 함수
        let context = this,
        args = arguments;
        // 클로져 함수 안에서 this 와 arguments 변수로 디바운싱 함수의 스코프와 변수를 접근한다.
        clearTimeout(timer);
        // 만약 이벤트가 호출되면 타이머를 초기화 하고 다시 시작한다.
        timer = setTimeout(function() {
            fun.apply(context, args);
        }, delay);
    }
}

function typing() { 
    // 타이핑 효과

    for(i=0; i<typing_li_length; i++) {
        tpying_li[i].classList.remove("on");
    }
    tpying_li[typing_line_index].classList.add("on");
    

    if(typing_index<typing_text.length) {   
        // 타이핑될 텍스트 길이만큼 반복 

        tpying_li[typing_line_index].innerHTML += typing_text[typing_index];
        typing_index++;
    }else { //한문장이끝나면
        if(typing_line_index < typing_li_length-1) {
            //다음문장으로  가기위해 인덱스를 1증가
            typing_line_index++;

            //다음문장을 타이핑하기위한 셋팅
            typing_index = 0;
            typing_bool = false;
            typing_text = change_arr(typing_text_arr[typing_line_index].split(""));

            //다음문장 타이핑전 0.5초 쉰다
            clearInterval(type);
            //타이핑종료

            setTimeout(function () {
                //0.5초후에 다시 타이핑 반복 시작
                type = setInterval(typing, 150);
                // retype = setInterval(retyping, 150);
            },500);
        }else if(typing_line_index==typing_li_length-1) {
            //마지막 문장까지 써지면 반복종료
            clearInterval(type);
            setTimeout(function () {
                //1초후에 다시 타이핑 반복 시작
               typing_index = 0;
               typing_index = 0;
               typing_bool = false;
               type = setInterval(repeat, 100);
               // retype = setInterval(retyping, 150);
            },1000);
            // console.log(typing_index);
            // console.log(typing_bool);
            // console.log(typing_line_index);
        }
    }
}

function repeat(){  
    // 지우는 효과

    for(i=0; i<typing_li_length; i++) {
        tpying_li[i].classList.remove("on");
    }
    tpying_li[typing_line_index].classList.add("on");

    if(typing_index<typing_text.length){
        // 한 글자씩 지워준다
        main_text = tpying_li[typing_line_index].innerText;
        tpying_li[typing_line_index].innerText = main_text.slice(0, -1);

        del=-1;
        typing_index++;
        // console.log(typing_index);
    }else{
        if(typing_line_index < typing_li_length) {
            //이전문장으로  가기위해 인덱스를 1증가
            if(typing_line_index==0) {
                //마지막 문장까지 써지면 반복종료
                
                clearInterval(type);
                tpying_li[typing_line_index].innerHTML="&nbsp;";
                setTimeout(function () {
                    //1초후에 다시 타이핑 반복 시작
                   typing_index = 0;
                   typing_line_index = 0;
                   typing_bool = false;
                   type = setInterval(typing, 150);
                },1000);
                return false;
            }else {
                tpying_li[typing_line_index].innerHTML="&nbsp;";
                typing_line_index--;
            }
            //이전문장을 타이핑하기위한 셋팅
            typing_index = 0;
            typing_bool = false;
            typing_text = change_arr(typing_text_arr[typing_line_index].split(""));

            //이전문장 타이핑전 0.5초 쉰다
            clearInterval(type);
            //타이핑종료
            setTimeout(function () {
                //1초후에 다시 타이핑 반복 시작
                type = setInterval(repeat, 100);
                // retype = setInterval(retyping, 150);
            },300);
        }else{
        }
    }
}
