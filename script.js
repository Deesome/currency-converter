const apiURL = `http://api.exchangeratesapi.io/v1/latest?access_key=7f8de6d52602457c550d4ead9c65e8b6`

async function apiCall(apiURL){
    try {
         const response = await fetch(apiURL)
         if(!response.ok){
            throw new Error(`API Response ${response.status} || API Response Message ${response.statusText}`)
         }
         const data = await response.json()
         return data
         
        } catch (error) {
        // console.log("API Connection Error",error)
        throw new Error("API Connection Error",error)
        
    }

}
// Function for getting key for FROM and TO to update UI

async function currencyKey(){

    const data = await apiCall(apiURL)
    const keyObject = data.rates

    for(let key in keyObject){
        const fromDropdown = document.querySelector("#from")
        const toDropdown = document.querySelector("#to")

        const fromOption = document.createElement("option")
        fromOption.value = key
        fromOption.innerText = `${key}`
        fromDropdown.appendChild(fromOption)


        const toOption = document.createElement("option")
        toOption.value = key
        toOption.innerText = `${key}`
        toDropdown.appendChild(toOption)
       
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    currencyKey()
})


// Currency Conversion

 async function currencyConverter(){
    const amount = Number(document.querySelector("#amount").value)
    const from = document.querySelector("#from").value
    const to = document.querySelector("#to").value 
    

    const data = await apiCall(apiURL)
    

    
    const result = parseFloat((amount * (data.rates[to] / data.rates[from])).toFixed(2))
    
    console.log(result)

 }

 const button = document.querySelector("#convert-btn")
 button.addEventListener("click",()=>{
    currencyConverter()
 })




