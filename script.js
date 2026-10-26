function toggleMode(){
    document.body.classList.toggle("dark");

    const icon  = document.querySelector("#mode i");

    if(document.body.classList.contains("dark")){
        icon.classList.replace("fa-moon", "fa-sun");
    }else{
        icon.classList.replace("fa-sun", "fa-moon");
    }
}