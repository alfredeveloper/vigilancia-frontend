export function bottomsheet() {
    document.querySelector("#bottomsheet").addEventListener("click", function() { 
        var small = document.querySelector(".small").classList;
        var big = document.querySelector(".big").classList;
        console.log('small', small)
        console.log('big', big)
        small.remove("small")
        small.add("big")
        big.remove("big")
        big.add("small")
    });
}