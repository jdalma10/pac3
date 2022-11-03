var a = 3;


export default {

        changeColor(){
            const body = document.querySelector("body");

            if(window.localStorage.getItem("mode")!=null){
                if(window.localStorage.getItem("mode")=="dark"){
                    body.classList.remove("light");
                    body.classList.add("dark");
                }else{
                    body.classList.remove("dark");
                    body.classList.add("light");
                }
            }else{
                body.classList.add("light");
            }
            
            document.getElementById("changeMode").addEventListener('click',function(e){
            
                e.preventDefault();
            
                if(body.classList.contains('light')){
                    body.classList.remove("light");
                    body.classList.add("dark");
                    window.localStorage.setItem("mode","dark");
            }else{
                    body.classList.remove("dark");
                    body.classList.add("light");
                    window.localStorage.setItem("mode","light");
            }
            
            })

            document.getElementById("changeMode").addEventListener('click',function(e){
            
                e.preventDefault();
            
                if(body.classList.contains('light')){
                    body.classList.remove("light");
                    body.classList.add("dark");
                    window.localStorage.setItem("mode","dark");
            }else{
                    body.classList.remove("dark");
                    body.classList.add("light");
                    window.localStorage.setItem("mode","light");
            }
            
            })
            
        }
        
    };