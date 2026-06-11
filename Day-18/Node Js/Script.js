let price=[1020,500,6000,87000,200,5000]

console.log("Sample Js code");

const filterPrice=price.filter((x)=>{
    return x>500 &&x<5000;
})

console.log(filterPrice);


