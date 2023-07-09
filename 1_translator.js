const select_option=document.querySelectorAll("select");
const select1=document.getElementById("select1");
const select2=document.getElementById("select2");
const swap_icon=document.getElementById("swap");
const btn=document.getElementById("but");
const from_text=document.querySelector(".from");
const to_text=document.querySelector(".to");
const copy1=document.querySelector(".copy_text1");
const copy2=document.querySelector(".copy_text2");
const vol1=document.querySelector(".volume1");
const vol2=document.querySelector(".volume2");

select_option.forEach((tag, id)=> {
    for(const country_code in countries){
        let selected;
        if(id==0 && country_code=="en-GB"){
           selected="selected";
        }
        else if(id==1 && country_code=="hi-IN"){
            selected="selected";
        }
        let option=`<option value="${country_code} " ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

function swap_country(){
    let temp=select1.value;
    select1.value=select2.value;
    select2.value=temp;

    // select1 = select1.value;
    // select2 = select2.value;

    let temp2=from_text.value;
    from_text.value=to_text.value;
    to_text.value=temp2;

    // from_text= to_text.value;
    // to_text = from_text.value;
}
// console.log("helo");
// console.log(countries);
function translation(){
    let text=from_text.value,
    translate_from=select_option[0].value,
    translate_to=select_option[1].value;
    let textapi=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translate_from}|${translate_to}`;
    fetch(textapi).then((res)=>{
        return res.json();
    }).then((data)=>{
        to_text.value=data.responseData.translatedText;
    });
    
    
    // console.log(text,translate_from,translate_to);
    
}

swap_icon.addEventListener('click',swap_country);
btn.addEventListener('click',translation);
copy1.addEventListener('click',function(){
    navigator.clipboard.writeText(from_text.value);
});
copy2.addEventListener('click',()=>{
    navigator.clipboard.writeText(to_text.value);
});
vol1.addEventListener('click',function(){
    let ut=new SpeechSynthesisUtterance(from_text.value);
    ut.lang=select1.value;
    speechSynthesis.speak(ut);
});
vol2.addEventListener('click',function(){
    let ute=new SpeechSynthesisUtterance(to_text.value);
    ute.lang=select2.value;
    speechSynthesis.speak(ute);
});

// select_option[0].value=countries["en-GB"];
// select_option[1].value=countries["hi-IN"];

