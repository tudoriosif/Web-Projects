const calculator = document.querySelector('.grid__calculator')
const keys = calculator.querySelector('.keypad')
const display = calculator.querySelector('#result')


keys.addEventListener('click', event =>{
    if(!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent

    const type = key.dataset.type
    const previousKeyType = calculator.dataset.previousKeyType

    if(type === 'number'){
        if(displayValue === '0' || previousKeyType === 'operator'){
            display.textContent = keyValue
        }
        else{
            display.textContent = displayValue + keyValue 
        }
    }


    if(type === 'operator'){
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => {el.dataset.state = ''})

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key

        key.dataset.state = 'selected'
    }

    if(type == 'equal') {
        const firstNumber = parseFloat(calculator.dataset.firstNumber)
        const operator = calculator.dataset.operator
        const secondNumber = parseFloat(displayValue)
        console.log(firstNumber, operator, secondNumber)

        let result = ''

        if(operator === 'plus') result = firstNumber + secondNumber
        if(operator === 'minus') result = firstNumber - secondNumber
        if(operator === 'divide') result = firstNumber / secondNumber
        if(operator === 'times') result = firstNumber * secondNumber
        if(operator === 'module') result = firstNumber % secondNumber

        console.log(result.toFixed(4))
        display.textContent = result.toFixed(4)
    }

    if(type === 'clear'){
        display.textContent = 0
    }

    calculator.dataset.previousKeyType = type
})